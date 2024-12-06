/*
  Warnings:

  - You are about to drop the column `sulg` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Product_sulg_key` ON `product`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `sulg`,
    ADD COLUMN `slug` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Product_slug_key` ON `Product`(`slug`);
