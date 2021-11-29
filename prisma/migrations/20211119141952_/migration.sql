/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `invoice` MODIFY `hash` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `invoice_hash_key` ON `invoice`(`hash`);
