import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import ProgressClient from "./ProgressClient";

export default async function ProgressPage({
  searchParams,
}: {
  searchParams: { tab?: string; exerciseId?: string };
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/signin");
  }

  const userId = session.user.id;
  const currentTab = searchParams.tab || "BODY";

  // -- BODY DATA --
  const bodyMetrics = await prisma.bodyMetric.findMany({
    where: { userId },
    orderBy: { date: 'asc' }
  });

  const bodyData = bodyMetrics.map(m => ({
    date: m.date.toISOString().split("T")[0],
    weight: m.weight
  }));

  // -- STRENGTH DATA --
  const exercises = await prisma.exercise.findMany({
    orderBy: { name: 'asc' }
  });
  
  // Find all sets for user
  const allSets = await prisma.sessionSet.findMany({
    where: { 
      session: { userId },
      completed: true,
      weight: { not: null }
    },
    include: {
      session: true,
      exercise: true
    },
    orderBy: { session: { startedAt: 'asc' } }
  });

  const prs: Record<string, number> = {};
  allSets.forEach(set => {
    const w = set.weight || 0;
    if (!prs[set.exerciseId] || w > prs[set.exerciseId]) {
      prs[set.exerciseId] = w;
    }
  });

  const selectedExerciseId = searchParams.exerciseId || (exercises.length > 0 ? exercises[0].id : "");
  
  const strengthData: any[] = [];
  if (selectedExerciseId) {
    // get max weight per day for this exercise
    const exerciseSets = allSets.filter(s => s.exerciseId === selectedExerciseId);
    const dayMap = new Map();
    exerciseSets.forEach(s => {
      const d = s.session.startedAt.toISOString().split("T")[0];
      const max = dayMap.get(d) || 0;
      if ((s.weight || 0) > max) {
        dayMap.set(d, s.weight);
      }
    });
    dayMap.forEach((weight, date) => strengthData.push({ date, weight }));
  }

  // -- NUTRITION DATA (Last 7 days) --
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const nutritionLogs = await prisma.nutritionLog.findMany({
    where: { 
      userId,
      date: { gte: sevenDaysAgo }
    },
    include: { food: true }
  });

  const nutMap = new Map();
  // Initialize last 7 days
  for(let i=6; i>=0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    nutMap.set(d.toISOString().split("T")[0], { date: d.toISOString().split("T")[0], calories: 0, protein: 0 });
  }

  nutritionLogs.forEach(log => {
    const d = log.date.toISOString().split("T")[0];
    if (nutMap.has(d)) {
      const day = nutMap.get(d);
      const factor = log.quantityGrams / 100;
      day.calories += log.food.caloriesPer100 * factor;
      day.protein += log.food.proteinPer100 * factor;
    }
  });

  const nutritionData = Array.from(nutMap.values());

  return (
    <ProgressClient 
      currentTab={currentTab}
      bodyData={bodyData}
      strengthData={strengthData}
      nutritionData={nutritionData}
      exercises={exercises}
      selectedExerciseId={selectedExerciseId}
      prs={prs}
    />
  );
}
