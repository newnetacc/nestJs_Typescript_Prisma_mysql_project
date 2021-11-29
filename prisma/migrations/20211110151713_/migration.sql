/*
  Warnings:

  - You are about to drop the column `Invoiceid` on the `invoice` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `invoice` DROP FOREIGN KEY `invoice_Invoiceid_fkey`;

-- AlterTable
ALTER TABLE `invoice` DROP COLUMN `Invoiceid`,
    ADD COLUMN `invoiceId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `invoice` ADD CONSTRAINT `invoice_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
