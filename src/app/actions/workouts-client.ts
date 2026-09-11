"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateWorkoutName(workoutId: string, name: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.workout.update({
    where: { id: workoutId, userId: session.user.id },
    data: { name }
  });

  revalidatePath(`/workouts/${workoutId}`);
  revalidatePath("/workouts");
}

export async function completeSession(workoutId: string, durationSeconds: number, setsData: any) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  // Create WorkoutSession
  const workoutSession = await prisma.workoutSession.create({
    data: {
      userId: session.user.id,
      workoutId,
      duration: durationSeconds,
      completedAt: new Date(),
    }
  });

  // Create SessionSets
  const setPromises = [];
  for (const [exerciseId, sets] of Object.entries(setsData)) {
    const exerciseSets = sets as any[];
    for (let i = 0; i < exerciseSets.length; i++) {
      const s = exerciseSets[i];
      setPromises.push(
        prisma.sessionSet.create({
          data: {
            sessionId: workoutSession.id,
            exerciseId,
            setNumber: i + 1,
            weight: s.weight ? parseFloat(s.weight) : null,
            reps: s.reps ? parseInt(s.reps) : null,
            completed: s.completed
          }
        })
      );
    }
  }

  await Promise.all(setPromises);

  revalidatePath("/dashboard");
  revalidatePath("/workouts");
  revalidatePath("/progress");
}
