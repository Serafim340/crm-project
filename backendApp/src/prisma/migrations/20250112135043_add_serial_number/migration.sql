/*
  Warnings:

  - A unique constraint covering the columns `[serialNumber]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "serialNumber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Location_serialNumber_key" ON "Location"("serialNumber");
