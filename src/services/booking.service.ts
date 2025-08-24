import { CreateBookingDTO } from "../dto/booking.dto";
import {
  confirmBooking,
  createBooking,
  createIdempotencyKey,
  finalizeIdempotencyKey,
  getIdempotencyKey,
} from "../repositories/booking.repository";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";
export async function createBookingService(CreateBookingDTO: CreateBookingDTO) {
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
}

export async function confirmBookingService(idempotencyKey: string) {
  // Logic to finalize the booking using the idempotency key
  // This could involve confirming the booking, sending notifications, etc.
  const idempotencyKeyData = await getIdempotencyKey(idempotencyKey);
  if (!idempotencyKeyData) {
    throw new NotFoundError("Idempotency Key not found");
  }

  if (idempotencyKeyData.finalized) {
    throw new BadRequestError(
      "Booking already finalized with this idempotency key"
    );
  }

  const booking = await confirmBooking(idempotencyKeyData.bookingId);
  await finalizeIdempotencyKey(idempotencyKey);

  return booking;
}
