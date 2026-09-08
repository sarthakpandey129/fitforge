"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export async function createWorkout() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const workout = await prisma.workout.create({
    data: {
      userId: session.user.id,
      name: "New Workout",
    }
  });

  redirect(`/workouts/${workout.id}`);
}
