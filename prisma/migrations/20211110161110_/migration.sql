-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_id_fkey`;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `transactionId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
