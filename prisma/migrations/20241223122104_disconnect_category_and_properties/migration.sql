/*
  Warnings:

  - You are about to drop the column `categoryId` on the `properties` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `properties` DROP FOREIGN KEY `Properties_categoryId_fkey`;

-- AlterTable
ALTER TABLE `properties` DROP COLUMN `categoryId`;
