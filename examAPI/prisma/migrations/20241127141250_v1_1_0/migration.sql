/*
  Warnings:

  - Added the required column `PaperTitle` to the `Monitoring` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arrangement` to the `Monitoring` table without a default value. This is not possible if the table is not empty.
  - Added the required column `centerName` to the `Monitoring` table without a default value. This is not possible if the table is not empty.
  - Added the required column `centerNumber` to the `Monitoring` table without a default value. This is not possible if the table is not empty.
  - Added the required column `container` to the `Monitoring` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseCode` to the `Monitoring` table without a default value. This is not possible if the table is not empty.
  - Added the required column `directionSign` to the `Monitoring` table without a default value. This is not possible if the table is not empty.
  - Added the required column `environment` to the `Monitoring` table without a default value. This is not possible if the table is not empty.
  - Added the required column `light` to the `Monitoring` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationOfContainer` to the `Monitoring` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noHelpFulMateria` to the `Monitoring` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noiseLevel` to the `Monitoring` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notice` to the `Monitoring` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Monitoring` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionPapers` to the `Monitoring` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomOfContainer` to the `Monitoring` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatingOrder` to the `Monitoring` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spacing` to the `Monitoring` table without a default value. This is not possible if the table is not empty.
  - Added the required column `temperature` to the `Monitoring` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Monitoring" ADD COLUMN     "PaperTitle" TEXT NOT NULL,
ADD COLUMN     "arrangement" TEXT NOT NULL,
ADD COLUMN     "centerName" TEXT NOT NULL,
ADD COLUMN     "centerNumber" TEXT NOT NULL,
ADD COLUMN     "container" TEXT NOT NULL,
ADD COLUMN     "courseCode" TEXT NOT NULL,
ADD COLUMN     "directionSign" TEXT NOT NULL,
ADD COLUMN     "environment" TEXT NOT NULL,
ADD COLUMN     "light" TEXT NOT NULL,
ADD COLUMN     "locationOfContainer" TEXT NOT NULL,
ADD COLUMN     "noHelpFulMateria" TEXT NOT NULL,
ADD COLUMN     "noiseLevel" TEXT NOT NULL,
ADD COLUMN     "notice" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "questionPapers" TEXT NOT NULL,
ADD COLUMN     "roomOfContainer" TEXT NOT NULL,
ADD COLUMN     "seatingOrder" TEXT NOT NULL,
ADD COLUMN     "spacing" TEXT NOT NULL,
ADD COLUMN     "temperature" TEXT NOT NULL;
