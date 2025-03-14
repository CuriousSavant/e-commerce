/*
  Warnings:

  - The `status` column on the `Categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `totalPrice` on the `order_items` table. All the data in the column will be lost.
  - The `status` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "STATUSPRODUCT" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "STATUSORDER" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "status",
ADD COLUMN     "status" "STATUSPRODUCT" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "totalPrice",
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "status",
ADD COLUMN     "status" "STATUSORDER" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "product" DROP COLUMN "status",
ADD COLUMN     "status" "STATUSPRODUCT" NOT NULL DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "StatusOrder";

-- DropEnum
DROP TYPE "StatusProduct";
