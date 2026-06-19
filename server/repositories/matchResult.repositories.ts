import { prisma } from "@/lib/prisma";

export async function getAllMatchResultsRepository() {
  return await prisma.matchResult.findMany();
}

export async function findMatchResult(matchId: number) {
  return await prisma.matchResult.findUnique({
    where: { matchId },
  });
}

export async function updateMatchResult(
  matchId: number,
  homeGoals: number,
  awayGoals: number,
) {
  return await prisma.matchResult.update({
    where: { matchId },
    data: { homeGoals, awayGoals },
  });
}

export async function newMatchResult(
  matchId: number,
  homeGoals: number,
  awayGoals: number,
) {
  return await prisma.matchResult.create({
    data: { matchId, homeGoals, awayGoals },
  });
}
