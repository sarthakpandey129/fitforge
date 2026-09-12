import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'athlete@fitforge.com';
  const existing = await prisma.user.findUnique({ where: { email } });
  
  if (!existing) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    await prisma.user.create({
      data: {
        name: 'Athlete',
        email,
        password: hashedPassword,
        onboarded: true
      }
    });
    console.log("Created user athlete@fitforge.com");
  } else {
    console.log("User already exists");
  }
}

main().finally(() => prisma.$disconnect());
