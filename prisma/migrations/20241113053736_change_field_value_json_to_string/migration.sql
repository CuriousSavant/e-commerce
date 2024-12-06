/*
  Warnings:

  - Made the column `value` on table `properties` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `properties` MODIFY `value` VARCHAR(191) NOT NULL;
