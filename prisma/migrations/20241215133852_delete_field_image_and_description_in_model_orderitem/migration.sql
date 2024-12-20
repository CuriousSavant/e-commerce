/*
  Warnings:

  - You are about to drop the column `description` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `order_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order_items` DROP COLUMN `description`,
    DROP COLUMN `image`;
