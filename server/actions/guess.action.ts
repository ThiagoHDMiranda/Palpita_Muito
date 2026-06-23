"use server";

import GROUP_MATCHES from "@/constants/matches";
import {
  findGuess,
  getGuessesRepository,
  newGuess,
  updateGuess,
} from "../repositories/guess.repositories";
import { auth } from "../auth";
import { ActionResult } from "../../types/actionResult";

// export type GuessDBType = {
//   homeGoals: number;
//   awayGoals: number;
//   matchId: number;
//   createdAt: Date;
//   userId: string;
//   updatedAt: Date;
// };
export type GuessDBType = {
  homeGoals: number;
  awayGoals: number;
  matchId: number;
  createdAt: Date;
  userId: string;
  updatedAt: Date;
};

export async function getGuessesActions(): Promise<
  ActionResult<GuessDBType[]>
> {
  try {
    const session = await auth();
    if (!session) return { success: false, message: "Não autorizado" };

    const result = await getGuessesRepository(session.user.userId);
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: "Erro no servidor" };
  }
}

export async function setGuess(
  matchId: number,
  homeGoals: number,
  awayGoals: number,
): Promise<ActionResult<GuessDBType>> {
  try {
    const session = await auth();
    if (!session) return { success: false, message: "Não autorizado" };

    const canChange =
      GROUP_MATCHES[matchId - 1].datetime.getTime() > Date.now();
    if (!canChange && session.user.role !== "ADMIN")
      return { success: false, message: "Não foi possível alterar o placar" };

    const existingGuess = await findGuess(session.user.userId, matchId);

    if (existingGuess) {
      const result = await updateGuess(
        session.user.userId,
        matchId,
        homeGoals,
        awayGoals,
      );

      return { success: true, data: result };
    }

    const result = await newGuess(
      session.user.userId,
      matchId,
      homeGoals,
      awayGoals,
    );
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: "Erro no servidor" };
  }
}
