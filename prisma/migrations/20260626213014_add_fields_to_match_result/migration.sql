-- AlterTable
ALTER TABLE "MatchResult" ADD COLUMN     "awayPenalties" INTEGER,
ADD COLUMN     "extraTime" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "homePenalties" INTEGER;
