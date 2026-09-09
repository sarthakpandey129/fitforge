"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function logWeight(weight: number) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  if (weight <= 0) return;

  await prisma.bodyMetric.create({
    data: {
      userId: session.user.id,
      weight,
      date: new Date()
    }
  });

  revalidatePath("/progress");
}
