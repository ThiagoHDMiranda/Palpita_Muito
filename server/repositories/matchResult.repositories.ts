import { prisma } from "@/lib/prisma";
import { MatchResultType } from "../actions/matchResult.action";

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
): Promise<MatchResultType> {
  return await prisma.matchResult.update({
    where: { matchId },
    data: { homeGoals, awayGoals },
  });
}

export async function newMatchResult(
  matchId: number,
  homeGoals: number,
  awayGoals: number,
): Promise<MatchResultType> {
  return await prisma.matchResult.create({
    data: { matchId, homeGoals, awayGoals },
  });
}
