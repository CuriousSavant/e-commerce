/*
  Warnings:

  - The `status` column on the `Categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "STATUS_PRODUCT" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "STATUS_ORDER" AS ENUM ('PENDING', 'COMPLETED', 'CANCELED');

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "status",
ADD COLUMN     "status" "STATUS_PRODUCT" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "addressId" INTEGER,
DROP COLUMN "status",
ADD COLUMN     "status" "STATUS_ORDER" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "product" DROP COLUMN "status",
ADD COLUMN     "status" "STATUS_PRODUCT" NOT NULL DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "STATUSORDER";

-- DropEnum
DROP TYPE "STATUSPRODUCT";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
