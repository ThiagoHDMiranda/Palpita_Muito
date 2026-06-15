import { prisma } from "@/lib/prisma";

export async function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(email: string, name: string) {
  return prisma.user.create({
    data: {
      email,
      name,
    },
  });
}
