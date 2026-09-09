"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addBodyMetric(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const weight = parseFloat(formData.get("weight") as string);
  const bodyFatStr = formData.get("bodyFat") as string;
  const bodyFat = bodyFatStr ? parseFloat(bodyFatStr) : null;
  const notes = formData.get("notes") as string | null;

  if (isNaN(weight) || weight <= 0) {
    throw new Error("Invalid weight");
  }

  await prisma.bodyMetric.create({
    data: {
      userId: session.user.id,
      weight,
      bodyFat,
      notes,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/progress");
}

export async function deleteBodyMetric(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Ensure the metric belongs to the user
  await prisma.bodyMetric.deleteMany({
    where: {
      id,
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/progress");
}
