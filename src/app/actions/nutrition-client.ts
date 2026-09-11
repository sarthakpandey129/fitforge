"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function logFood(dateStr: string, mealType: string, foodId: string, quantityGrams: number) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  // Prevent logging negative or 0
  if (quantityGrams <= 0) return;

  const date = new Date(dateStr);

  await prisma.nutritionLog.create({
    data: {
      userId: session.user.id,
      date,
      mealType,
      foodId,
      quantityGrams
    }
  });

  revalidatePath("/nutrition");
  revalidatePath("/dashboard");
}
