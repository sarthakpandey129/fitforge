import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import WorkoutClient from "./WorkoutClient";

export default async function WorkoutDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/signin");
  }

  const workout = await prisma.workout.findUnique({
    where: { 
      id: params.id,
      userId: session.user.id 
    },
    include: {
      exercises: {
        include: {
          exercise: true
        },
        orderBy: { order: 'asc' }
      }
    }
  });

  if (!workout) {
    redirect("/workouts");
  }

  // Fetch all available exercises to allow adding to workout
  const allExercises = await prisma.exercise.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <WorkoutClient 
      initialWorkout={workout} 
      allExercises={allExercises} 
    />
  );
}
