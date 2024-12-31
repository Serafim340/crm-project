/*
  Warnings:

  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Location` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Location` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "Location_location_key";

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
DROP COLUMN "description",
DROP COLUMN "location",
DROP COLUMN "number",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");
