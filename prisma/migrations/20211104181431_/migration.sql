/*
  Warnings:

  - You are about to alter the column `balance` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Decimal(13,4)` to `Int`.
  - The required column `uuid` was added to the `transactions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `invoice` DROP FOREIGN KEY `invoice_ibfk_1`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_ibfk_1`;

-- AlterTable
ALTER TABLE `invoice` MODIFY `decoded` JSON NULL;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `uuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `balance` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `invoice` ADD CONSTRAINT `invoice_id_fkey` FOREIGN KEY (`id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_id_fkey` FOREIGN KEY (`id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `user.email_unique` TO `user_email_key`;
