/*
  Warnings:

  - The values [PENDING,PAID,EXPIRED,FAILED] on the enum `transactions_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `transactions` MODIFY `status` ENUM('pending', 'paid', 'expired', 'failed') NOT NULL;
