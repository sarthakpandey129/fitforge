import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.findFirst();
  console.log("Email: " + (user?.email || "No users found"));
}
main().finally(() => prisma.$disconnect());
