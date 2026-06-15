"use server";

import { createUser, findByEmail } from "../repositories/user.repositories";

export async function ensureUserExists(email: string, name: string) {
  const existingUser = await findByEmail(email);

  if (existingUser) {
    return existingUser;
  }

  return createUser(email, name);
}
