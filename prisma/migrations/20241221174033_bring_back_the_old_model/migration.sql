/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `stock` INTEGER NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `product_slug_key` ON `product`(`slug`);
