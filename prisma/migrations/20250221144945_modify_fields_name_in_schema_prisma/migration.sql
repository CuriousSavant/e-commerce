/*
  Warnings:

  - You are about to drop the column `orderDate` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "orderDate",
DROP COLUMN "totalAmount",
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
