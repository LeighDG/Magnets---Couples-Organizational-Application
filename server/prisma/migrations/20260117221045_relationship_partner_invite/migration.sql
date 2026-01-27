/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RelationshipStatus" AS ENUM ('PENDING', 'ACTIVE', 'PAUSED');

-- CreateEnum
CREATE TYPE "PartnerInviteStatus" AS ENUM ('PENDING', 'ACCEPTED', 'EXPIRED', 'REVOKED');

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Relationship" (
    "id" UUID NOT NULL,
    "status" "RelationshipStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Relationship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelationshipMember" (
    "relationshipId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RelationshipMember_pkey" PRIMARY KEY ("relationshipId","userId")
);

-- CreateTable
CREATE TABLE "PartnerInvite" (
    "id" UUID NOT NULL,
    "relationshipId" UUID NOT NULL,
    "inviterUserId" UUID NOT NULL,
    "inviteeEmail" TEXT,
    "tokenHash" TEXT NOT NULL,
    "status" "PartnerInviteStatus" NOT NULL DEFAULT 'PENDING',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "acceptedByUserId" UUID,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "PartnerInvite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RelationshipMember_userId_idx" ON "RelationshipMember"("userId");

-- CreateIndex
CREATE INDEX "RelationshipMember_relationshipId_idx" ON "RelationshipMember"("relationshipId");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerInvite_tokenHash_key" ON "PartnerInvite"("tokenHash");

-- CreateIndex
CREATE INDEX "PartnerInvite_relationshipId_idx" ON "PartnerInvite"("relationshipId");

-- CreateIndex
CREATE INDEX "PartnerInvite_inviterUserId_idx" ON "PartnerInvite"("inviterUserId");

-- CreateIndex
CREATE INDEX "PartnerInvite_status_expiresAt_idx" ON "PartnerInvite"("status", "expiresAt");

-- CreateIndex
CREATE INDEX "PartnerInvite_inviteeEmail_idx" ON "PartnerInvite"("inviteeEmail");

-- AddForeignKey
ALTER TABLE "RelationshipMember" ADD CONSTRAINT "RelationshipMember_relationshipId_fkey" FOREIGN KEY ("relationshipId") REFERENCES "Relationship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationshipMember" ADD CONSTRAINT "RelationshipMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerInvite" ADD CONSTRAINT "PartnerInvite_relationshipId_fkey" FOREIGN KEY ("relationshipId") REFERENCES "Relationship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerInvite" ADD CONSTRAINT "PartnerInvite_inviterUserId_fkey" FOREIGN KEY ("inviterUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerInvite" ADD CONSTRAINT "PartnerInvite_acceptedByUserId_fkey" FOREIGN KEY ("acceptedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
