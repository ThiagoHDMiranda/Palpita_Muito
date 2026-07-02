import { prisma } from "@/lib/prisma";
import { GuessDBType } from "@/types/match";

export async function getGuessesByUserRepository(
  userId: string,
): Promise<GuessDBType[]> {
  return await prisma.guess.findMany({ where: { userId } });
}

export async function getGuessesByMatchIdRepository(
  matchId: number,
): Promise<GuessDBType[]> {
  return await prisma.guess.findMany({ where: { matchId } });
}

export async function getAllGuessesRepository(): Promise<GuessDBType[]> {
  return await prisma.guess.findMany();
}

export async function findGuess(
  userId: string,
  matchId: number,
): Promise<GuessDBType | null> {
  return await prisma.guess.findUnique({
    where: { userId_matchId: { userId, matchId } },
  });
}

export async function updateGuess(
  userId: string,
  matchId: number,
  homeGoals: number,
  awayGoals: number,
  points: number,
): Promise<GuessDBType> {
  return await prisma.guess.update({
    where: { userId_matchId: { userId, matchId } },
    data: { homeGoals, awayGoals, points },
  });
}

export async function newGuess(
  userId: string,
  matchId: number,
  homeGoals: number,
  awayGoals: number,
  points: number,
): Promise<GuessDBType> {
  return await prisma.guess.create({
    data: { userId, matchId, homeGoals, awayGoals, points },
  });
}
