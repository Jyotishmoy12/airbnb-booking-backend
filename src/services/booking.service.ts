import { CreateBookingDTO } from "../dto/booking.dto";
import {
  confirmBooking,
  createBooking,
  createIdempotencyKey,
  finalizeIdempotencyKey,
  getIdempotencyKeyWithLock,
} from "../repositories/booking.repository";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";
import prismaClient from "../prisma/client";
import { redlock } from "../config/redis.config";
import { serverConfig } from "../config";

export async function createBookingService(CreateBookingDTO: CreateBookingDTO) {
  const ttl = serverConfig.LOCK_TTL;
  const bookingResource = `hotel:${CreateBookingDTO.hotelId}`;

  try {
    await redlock.acquire([bookingResource], ttl);
    const booking = await createBooking({
      userId: CreateBookingDTO.userId,
      hotelId: CreateBookingDTO.hotelId,
      totalGuests: CreateBookingDTO.totalGuests,
      bookingAmount: CreateBookingDTO.bookingAmount,
    });
    const idempotencyKey = generateIdempotencyKey();
    await createIdempotencyKey(idempotencyKey, booking.id);

    return {
      bookingId: booking.id,
      idempotencyKey: idempotencyKey,
    };
  } catch (error) {
    throw new InternalServerError(
      "Could not acquire lock, please try again later because someone else is booking on this hotel"
    );
  }
}

export async function confirmBookingService(idempotencyKey: string) {
  // Logic to finalize the booking using the idempotency key
  // This could involve confirming the booking, sending notifications, etc.
  return await prismaClient.$transaction(async (tx) => {
    const idempotencyKeyData = await getIdempotencyKeyWithLock(
      tx,
      idempotencyKey
    );
    if (!idempotencyKeyData || !idempotencyKeyData.bookingId) {
      throw new NotFoundError("Idempotency Key not found");
    }

    if (idempotencyKeyData.finalized) {
      throw new BadRequestError(
        "Booking already finalized with this idempotency key"
      );
    }

    const booking = await confirmBooking(tx, idempotencyKeyData.bookingId);
    await finalizeIdempotencyKey(tx, idempotencyKey);

    return booking;
  });
}
