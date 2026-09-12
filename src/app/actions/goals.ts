"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function setGoal(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const type = formData.get("type") as string;
  const targetWeightStr = formData.get("targetWeight") as string;
  const targetWeight = targetWeightStr ? parseFloat(targetWeightStr) : null;
  const notes = formData.get("notes") as string | null;

  if (!["BULK", "CUT", "MAINTAIN", "RECOMP"].includes(type)) {
    throw new Error("Invalid goal type");
  }

  await prisma.goal.upsert({
    where: {
      userId: session.user.id,
    },
    update: {
      type,
      targetWeight,
      notes,
    },
    create: {
      userId: session.user.id,
      type,
      targetWeight,
      notes,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/goals");
}
