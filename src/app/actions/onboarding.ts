"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export async function completeOnboarding(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  const age = parseInt(formData.get("age") as string);
  const height = parseFloat(formData.get("height") as string);
  const weight = parseFloat(formData.get("weight") as string);
  
  const activityLevel = formData.get("activityLevel") as string;
  const trainingExperience = formData.get("trainingExperience") as string;
  const preferredFrequency = formData.get("preferredFrequency") as string;
  const goalType = formData.get("goalType") as string;

  if (isNaN(age) || isNaN(height) || isNaN(weight)) {
    throw new Error("Invalid numerical data");
  }

  // Use a transaction to ensure all records are created successfully
  await prisma.$transaction(async (tx) => {
    // 1. Update User Profile
    await tx.user.update({
      where: { id: userId },
      data: {
        age,
        height,
        activityLevel,
        trainingExperience,
        preferredFrequency,
        onboarded: true,
      },
    });

    // 2. Create Initial Body Metric
    await tx.bodyMetric.create({
      data: {
        userId,
        weight,
        notes: "Initial onboarding measurement",
      },
    });

    // 3. Create Initial Goal
    await tx.goal.create({
      data: {
        userId,
        type: goalType,
        notes: "Set during onboarding",
      },
    });
  });

  // NextAuth 'update' trigger would be called on the client side, 
  // but we can just redirect to dashboard which will reload the session state
  redirect("/dashboard");
}
