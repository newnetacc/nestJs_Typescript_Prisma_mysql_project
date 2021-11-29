/*
  Warnings:

  - Added the required column `Invoiceid` to the `invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `invoice` DROP FOREIGN KEY `invoice_id_fkey`;

-- AlterTable
ALTER TABLE `invoice` ADD COLUMN `Invoiceid` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `invoice` ADD CONSTRAINT `invoice_Invoiceid_fkey` FOREIGN KEY (`Invoiceid`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
