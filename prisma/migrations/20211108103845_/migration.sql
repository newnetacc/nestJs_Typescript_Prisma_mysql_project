-- DropForeignKey
ALTER TABLE `invoice` DROP FOREIGN KEY `invoice_Invoiceid_fkey`;

-- AlterTable
ALTER TABLE `invoice` MODIFY `Invoiceid` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `invoice` ADD CONSTRAINT `invoice_Invoiceid_fkey` FOREIGN KEY (`Invoiceid`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
