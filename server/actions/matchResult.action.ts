"use server";

import { ActionResult } from "@/types/actionResult";
import { auth } from "../auth";
import {
  findMatchResult,
  getAllMatchResultsRepository,
  newMatchResult,
  updateMatchResult,
} from "../repositories/matchResult.repositories";
import { findById } from "../repositories/user.repositories";
import { UserType } from "./user.actions";
import { getGuessesByMatchIdActions } from "./guess.action";
import { GuessDBType, MatchResultType } from "@/types/match";
import { updateGuess } from "../repositories/guess.repositories";

export async function getAllMatchResultsActions(): Promise<
  ActionResult<MatchResultType[]>
> {
  try {
    const result: MatchResultType[] = await getAllMatchResultsRepository();
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: "Erro no servidor" };
  }
}

function calculatePoints(
  result: { homeGoals: number; awayGoals: number },
  guess: GuessDBType,
) {
  if (
    result.homeGoals === guess.homeGoals &&
    result.awayGoals === guess.awayGoals
  ) {
    return 6;
  }

  const right = {
    victory: false,
    draw: false,
    goal: false,
    goalsDifference: false,
  };

  if (
    result.homeGoals === guess.homeGoals ||
    result.awayGoals === guess.awayGoals
  ) {
    right.goal = true;
  }

  const resultGoalsDifference = result.homeGoals - result.awayGoals;
  const guessGoalsDifference = guess.homeGoals - guess.awayGoals;

  if (
    (resultGoalsDifference < 0 && guessGoalsDifference < 0) ||
    (resultGoalsDifference > 0 && guessGoalsDifference > 0)
  ) {
    right.victory = true;
  }

  if (resultGoalsDifference === 0 && guessGoalsDifference === 0) {
    right.draw = true;
  }

  if (resultGoalsDifference === guessGoalsDifference) {
    right.goalsDifference = true;
  }

  const totalPoints =
    (right.victory ? 3 : 0) +
    (right.draw ? 3 : 0) +
    (right.goal ? 1 : 0) +
    (right.goalsDifference ? 2 : 0);

  return totalPoints;
}

export async function setGuessPoints(
  matchId: number,
  result: { homeGoals: number; awayGoals: number },
): Promise<ActionResult<GuessDBType[]>> {
  try {
    const allMatchesById = await getGuessesByMatchIdActions(matchId);

    if (!allMatchesById.success)
      return { success: false, message: "Erro no servidor" };

    const updatePoints = await Promise.all(
      allMatchesById.data.map(async (match) => {
        const points = calculatePoints(result, match);
        if (match.points === points) return match;

        const setGuessResult = await updateGuess(
          match.userId,
          matchId,
          match.homeGoals,
          match.awayGoals,
          points,
        );

        return setGuessResult;
      }),
    );

    return { success: true, data: updatePoints };
  } catch (err) {
    return { success: false, message: "Erro no servidor" };
  }
}

export async function setMatchResult(
  matchId: number,
  homeGoals: number,
  awayGoals: number,
  extraTime: boolean,
  homeETGoals: number | null,
  awayETGoals: number | null,
  homePenalties: number | null,
  awayPenalties: number | null,
): Promise<ActionResult<MatchResultType>> {
  try {
    const session = await auth();
    if (!session) return { success: false, message: "Não autorizado" };

    const user: UserType | null = await findById(session.user.userId);

    if (!user || user.role !== "ADMIN") {
      return { success: false, message: "Não autorizado" };
    }

    const existingMatchResult = await findMatchResult(matchId);

    if (existingMatchResult) {
      const result = await updateMatchResult(
        matchId,
        homeGoals,
        awayGoals,
        extraTime,
        homeETGoals,
        awayETGoals,
        homePenalties,
        awayPenalties,
      );

      setGuessPoints(result.matchId, {
        homeGoals: result.homeGoals,
        awayGoals: result.awayGoals,
      });
      return { success: true, data: result };
    }

    const result = await newMatchResult(
      matchId,
      homeGoals,
      awayGoals,
      extraTime,
      homeETGoals,
      awayETGoals,
      homePenalties,
      awayPenalties,
    );

    setGuessPoints(result.matchId, {
      homeGoals: result.homeGoals,
      awayGoals: result.awayGoals,
    });

    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: "Erro no servidor" };
  }
}
