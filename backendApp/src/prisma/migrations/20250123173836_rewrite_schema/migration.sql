/*
  Warnings:

  - You are about to drop the `LocationProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `locationId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LocationProduct" DROP CONSTRAINT "LocationProduct_locationId_fkey";

-- DropForeignKey
ALTER TABLE "LocationProduct" DROP CONSTRAINT "LocationProduct_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "locationId" TEXT NOT NULL;

-- DropTable
DROP TABLE "LocationProduct";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
