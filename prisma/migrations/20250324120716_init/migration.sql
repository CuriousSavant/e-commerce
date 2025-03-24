/*
  Warnings:

  - You are about to drop the `Feature` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_productId_fkey";

-- DropTable
DROP TABLE "Feature";
