"use server";

import GROUP_MATCHES from "@/constants/matches";
import {
  findGuess,
  getAllGuessesRepository,
  getGuessesByMatchIdRepository,
  getGuessesByUserRepository,
  newGuess,
  updateGuess,
} from "../repositories/guess.repositories";
import { auth } from "../auth";
import { ActionResult } from "../../types/actionResult";
import { GuessDBType } from "@/types/match";

export async function getGuessesByUserActions(): Promise<
  ActionResult<GuessDBType[]>
> {
  try {
    const session = await auth();
    if (!session) return { success: false, message: "Não autorizado" };

    const result = await getGuessesByUserRepository(session.user.userId);
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: "Erro no servidor" };
  }
}

export async function getGuessesByMatchIdActions(
  matchId: number,
): Promise<ActionResult<GuessDBType[]>> {
  try {
    const result = await getGuessesByMatchIdRepository(matchId);
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: "Erro no servidor" };
  }
}

export async function getAllGuessesActions(): Promise<
  ActionResult<GuessDBType[]>
> {
  try {
    const result = await getAllGuessesRepository();
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: "Erro no servidor" };
  }
}

export async function setGuessActions(
  matchId: number,
  homeGoals: number,
  awayGoals: number,
  points: number,
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
        points,
      );

      return { success: true, data: result };
    }

    const result = await newGuess(
      session.user.userId,
      matchId,
      homeGoals,
      awayGoals,
      points,
    );
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: "Erro no servidor" };
  }
}
