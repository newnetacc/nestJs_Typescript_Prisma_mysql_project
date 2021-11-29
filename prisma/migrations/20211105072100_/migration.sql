/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `transactions_uuid_key` ON `transactions`(`uuid`);
