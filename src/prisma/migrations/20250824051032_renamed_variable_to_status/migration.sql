/*
  Warnings:

  - You are about to drop the column `bookingStatus` on the `booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `booking` DROP COLUMN `bookingStatus`,
    ADD COLUMN `status` ENUM('PENDING', 'CONFIRMED', 'CANCELLED') NOT NULL DEFAULT 'PENDING';
