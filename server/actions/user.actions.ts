"use server";

import { ActionResult } from "@/types/actionResult";
import { createUser, findByEmail } from "../repositories/user.repositories";

export type UserType = {
  name: string | null;
  id: string;
  email: string;
  role: "ADMIN" | "USER";
  createdAt: Date;
};

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
