-- AlterTable
ALTER TABLE `properties` ADD COLUMN `productId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Properties` ADD CONSTRAINT `Properties_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
