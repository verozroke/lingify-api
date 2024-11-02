/*
  Warnings:

  - You are about to drop the column `languages` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Material` table. All the data in the column will be lost.
  - Added the required column `language` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nativeLanguage` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_avatarId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_bannerId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_countryId_fkey";

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "languages",
ADD COLUMN     "language" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "nativeLanguage" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "videoUrl";

-- AlterTable
ALTER TABLE "Material" DROP COLUMN "url",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatarId" DROP NOT NULL,
ALTER COLUMN "bannerId" DROP NOT NULL,
ALTER COLUMN "countryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
