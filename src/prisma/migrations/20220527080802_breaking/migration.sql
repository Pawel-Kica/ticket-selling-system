/*
  Warnings:

  - You are about to drop the `_RouteToStation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `carriageType` to the `Price` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainType` to the `Price` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Price` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('passport', 'identityCard');

-- DropForeignKey
ALTER TABLE "Carriage" DROP CONSTRAINT "Carriage_conductor1Id_fkey";

-- DropForeignKey
ALTER TABLE "Carriage" DROP CONSTRAINT "Carriage_conductor2Id_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_carriageId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_endStationId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_startStationId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_trainId_fkey";

-- DropForeignKey
ALTER TABLE "Train" DROP CONSTRAINT "Train_bossId_fkey";

-- DropForeignKey
ALTER TABLE "Train" DROP CONSTRAINT "Train_driverHelperId_fkey";

-- DropForeignKey
ALTER TABLE "Train" DROP CONSTRAINT "Train_driverId_fkey";

-- DropForeignKey
ALTER TABLE "Train" DROP CONSTRAINT "Train_routeId_fkey";

-- DropForeignKey
ALTER TABLE "_RouteToStation" DROP CONSTRAINT "_RouteToStation_A_fkey";

-- DropForeignKey
ALTER TABLE "_RouteToStation" DROP CONSTRAINT "_RouteToStation_B_fkey";

-- AlterTable
ALTER TABLE "Price" ADD COLUMN     "carriageType" "CarriageType" NOT NULL,
ADD COLUMN     "trainType" "TrainType" NOT NULL,
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "seat" DROP DEFAULT,
ALTER COLUMN "state" SET DEFAULT E'bought';
DROP SEQUENCE "Ticket_seat_seq";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "documentNumber" TEXT NOT NULL,
ADD COLUMN     "documentType" "DocumentType" NOT NULL;

-- DropTable
DROP TABLE "_RouteToStation";

-- CreateTable
CREATE TABLE "RoutePoint" (
    "id" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "stationId" TEXT NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "RoutePoint_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Train" ADD CONSTRAINT "Train_bossId_fkey" FOREIGN KEY ("bossId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Train" ADD CONSTRAINT "Train_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Train" ADD CONSTRAINT "Train_driverHelperId_fkey" FOREIGN KEY ("driverHelperId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Train" ADD CONSTRAINT "Train_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carriage" ADD CONSTRAINT "Carriage_conductor1Id_fkey" FOREIGN KEY ("conductor1Id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carriage" ADD CONSTRAINT "Carriage_conductor2Id_fkey" FOREIGN KEY ("conductor2Id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_carriageId_fkey" FOREIGN KEY ("carriageId") REFERENCES "Carriage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_startStationId_fkey" FOREIGN KEY ("startStationId") REFERENCES "Station"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_endStationId_fkey" FOREIGN KEY ("endStationId") REFERENCES "Station"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_startStationId_fkey" FOREIGN KEY ("startStationId") REFERENCES "Station"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_endStationId_fkey" FOREIGN KEY ("endStationId") REFERENCES "Station"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutePoint" ADD CONSTRAINT "RoutePoint_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutePoint" ADD CONSTRAINT "RoutePoint_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE CASCADE ON UPDATE CASCADE;
