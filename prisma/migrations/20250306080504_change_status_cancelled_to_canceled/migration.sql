/*
  Warnings:

  - The values [CANCELLED] on the enum `STATUSORDER` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "STATUSORDER_new" AS ENUM ('PENDING', 'COMPLETED', 'CANCELED');
ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "STATUSORDER_new" USING ("status"::text::"STATUSORDER_new");
ALTER TYPE "STATUSORDER" RENAME TO "STATUSORDER_old";
ALTER TYPE "STATUSORDER_new" RENAME TO "STATUSORDER";
DROP TYPE "STATUSORDER_old";
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
