"use server";

import { ActionResult } from "@/types/actionResult";
import { auth } from "../auth";
import {
  findMatchResult,
  getAllMatchResultsRepository,
  newMatchResult,
  updateMatchResult,
} from "../repositories/matchResult.repositories";
import { findByEmail, findById } from "../repositories/user.repositories";

type MatchResultType = {
  matchId: number;
  homeGoals: number;
  awayGoals: number;
  updatedAt: Date;
};

export async function getAllMatchResultsActions(): Promise<
  ActionResult<MatchResultType[]>
> {
  try {
    const result = await getAllMatchResultsRepository();
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: "Erro no servidor" };
  }
}

export async function setMatchResult(
  matchId: number,
  homeGoals: number,
  awayGoals: number,
): Promise<ActionResult<MatchResultType>> {
  try {
    const session = await auth();
    if (!session) return { success: false, message: "Não autorizado" };

    const user = await findById(session.user.userId);

    if (!user || user.role !== "ADMIN") {
      return { success: false, message: "Não autorizado" };
    }

    const existingMatchResult = await findMatchResult(matchId);

    if (existingMatchResult) {
      const result = await updateMatchResult(matchId, homeGoals, awayGoals);
      return { success: true, data: result };
    }

    const result = await newMatchResult(matchId, homeGoals, awayGoals);
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: "Erro no servidor" };
  }
}
