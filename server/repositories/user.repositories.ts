import { prisma } from "@/lib/prisma";
import { UserType } from "../actions/user.actions";

export async function findById(id: string): Promise<UserType | null> {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function findByEmail(email: string): Promise<UserType | null> {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(
  email: string,
  name: string,
): Promise<UserType> {
  return await prisma.user.create({
    data: {
      email,
      name,
    },
  });
}
