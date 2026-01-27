/*
  Warnings:

  - A unique constraint covering the columns `[sharedCode]` on the table `PartnerInvite` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PartnerInvite" ADD COLUMN     "sharedCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "PartnerInvite_sharedCode_key" ON "PartnerInvite"("sharedCode");

-- CreateIndex
CREATE INDEX "PartnerInvite_sharedCode_idx" ON "PartnerInvite"("sharedCode");
