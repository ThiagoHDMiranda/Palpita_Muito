import { prisma } from "@/lib/prisma";
import { MatchResultType } from "@/types/match";

export async function getAllMatchResultsRepository(): Promise<
  MatchResultType[]
> {
  return await prisma.matchResult.findMany();
}

export async function findMatchResult(
  matchId: number,
): Promise<MatchResultType | null> {
  return await prisma.matchResult.findUnique({
    where: { matchId },
  });
}

export async function updateMatchResult(
  matchId: number,
  homeGoals: number,
  awayGoals: number,
  extraTime: boolean,
  homeETGoals: number | null,
  awayETGoals: number | null,
  homePenalties: number | null,
  awayPenalties: number | null,
): Promise<MatchResultType> {
  return await prisma.matchResult.update({
    where: { matchId },
    data: {
      homeGoals,
      awayGoals,
      extraTime,
      homeETGoals,
      awayETGoals,
      homePenalties,
      awayPenalties,
    },
  });
}

export async function newMatchResult(
  matchId: number,
  homeGoals: number,
  awayGoals: number,
  extraTime: boolean,
  homeETGoals: number | null,
  awayETGoals: number | null,
  homePenalties: number | null,
  awayPenalties: number | null,
): Promise<MatchResultType> {
  return await prisma.matchResult.create({
    data: {
      matchId,
      homeGoals,
      awayGoals,
      extraTime,
      homeETGoals,
      awayETGoals,
      homePenalties,
      awayPenalties,
    },
  });
}
