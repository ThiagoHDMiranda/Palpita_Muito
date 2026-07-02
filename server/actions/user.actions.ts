"use server";

import { ActionResult } from "@/types/actionResult";
import {
  createUser,
  findByEmail,
  getAllUsersRepository,
} from "../repositories/user.repositories";
import { getAllGuessesActions } from "./guess.action";
import { GuessDBType } from "@/types/match";

export type UserType = {
  name: string | null;
  id: string;
  email: string;
  role: "ADMIN" | "USER";
  createdAt: Date;
};

export async function getAllUsersActions(): Promise<
  ActionResult<{ id: string; name: string | null }[]>
> {
  try {
    const result = await getAllUsersRepository();
    if (!result) throw new Error("Registro não encontrado");

    const users = result.map((user) => {
      return {
        id: user.id,
        name: user.name,
      };
    });

    return { success: true, data: users };
  } catch (err) {
    return { success: false, message: "Erro no servidor" };
  }
}

export async function getAllUsersAndGuessesActions(): Promise<
  ActionResult<(UserType & { guesses: GuessDBType[] })[]>
> {
  try {
    const allUsers = await getAllUsersRepository();
    if (!allUsers) throw new Error("Registro não encontrado");

    const allGuesses = await getAllGuessesActions();
    if (!allGuesses.success) throw new Error("Registro não encontrado");

    const usersAndGuesses: (UserType & { guesses: GuessDBType[] })[] =
      allUsers.map((user) => {
        const filteredGuesses = allGuesses.data.filter(
          (guess) => guess.userId === user.id,
        );
        return { ...user, guesses: filteredGuesses };
      });

    return { success: true, data: usersAndGuesses };
  } catch (err) {
    return { success: false, message: "Erro no servidor" };
  }
}

export async function ensureUserExists(
  email: string,
  name: string,
): Promise<ActionResult<UserType>> {
  try {
    const existingUser = await findByEmail(email);

    if (existingUser) {
      return { success: true, data: existingUser };
    }

    const result = await createUser(email, name);
    return { success: true, data: result };
  } catch (err) {
    return { success: false, message: "Erro no servidor" };
  }
}
