-- CreateEnum
CREATE TYPE "StatusProduct" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "status" "StatusProduct" NOT NULL DEFAULT 'ACTIVE';
