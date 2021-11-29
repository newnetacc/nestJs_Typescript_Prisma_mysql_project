/*
  Warnings:

  - You are about to drop the column `invoiceId` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `invoice` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `invoice` DROP FOREIGN KEY `invoice_invoiceId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_transactionId_fkey`;

-- AlterTable
ALTER TABLE `invoice` DROP COLUMN `invoiceId`,
    ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `transactionId`,
    ADD COLUMN `invoice` LONGTEXT NOT NULL,
    ADD COLUMN `userId` INTEGER NULL,
    MODIFY `data` JSON NULL,
    MODIFY `status` ENUM('PENDING', 'PAID', 'EXPIRED', 'FAILED') NOT NULL;

-- AddForeignKey
ALTER TABLE `invoice` ADD CONSTRAINT `invoice_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
