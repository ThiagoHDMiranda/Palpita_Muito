import { prisma } from "@/lib/prisma";

export async function findById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function findByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(email: string, name: string) {
  return await prisma.user.create({
    data: {
      email,
      name,
    },
  });
}
