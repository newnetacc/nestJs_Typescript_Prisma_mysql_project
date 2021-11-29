-- AlterTable
ALTER TABLE `transactions` MODIFY `status` ENUM('pending', 'paid', 'expired', 'failed', 'unpaid') NOT NULL;
