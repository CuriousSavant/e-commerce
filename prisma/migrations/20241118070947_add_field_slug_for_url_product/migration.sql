/*
  Warnings:

  - A unique constraint covering the columns `[sulg]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `sulg` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Product_sulg_key` ON `Product`(`sulg`);
