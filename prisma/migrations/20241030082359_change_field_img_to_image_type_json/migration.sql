/*
  Warnings:

  - You are about to drop the column `img` on the `product` table. All the data in the column will be lost.
  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `img`,
    ADD COLUMN `image` JSON NOT NULL;
