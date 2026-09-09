import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import NutritionClient from "./NutritionClient";

export default async function NutritionPage({
  searchParams,
}: {
  searchParams: { date?: string };
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/signin");
  }

  const userId = session.user.id;

  // Determine date to query
  const dateStr = searchParams.date || new Date().toISOString().split("T")[0];
  const queryDate = new Date(dateStr);
  const nextDate = new Date(queryDate);
  nextDate.setDate(nextDate.getDate() + 1);

  // Fetch Nutrition Logs for the given day
  const logs = await prisma.nutritionLog.findMany({
    where: {
      userId,
      date: {
        gte: queryDate,
        lt: nextDate,
      },
    },
    include: {
      food: true,
    },
  });

  // Calculate totals
  const totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
  const meals = {
    BREAKFAST: [] as any[],
    LUNCH: [] as any[],
    DINNER: [] as any[],
    SNACKS: [] as any[],
  };

  logs.forEach((log) => {
    const factor = log.quantityGrams / 100;
    const cals = log.food.caloriesPer100 * factor;
    const pro = log.food.proteinPer100 * factor;
    const car = log.food.carbsPer100 * factor;
    const fat = log.food.fatPer100 * factor;

    totals.calories += cals;
    totals.protein += pro;
    totals.carbs += car;
    totals.fat += fat;

    if (meals[log.mealType as keyof typeof meals]) {
      meals[log.mealType as keyof typeof meals].push({
        ...log,
        cals,
        pro,
        car,
        fat,
      });
    }
  });

  // Fetch all foods for the modal search
  // In a real app with 10k foods, we'd use an API endpoint. 
  // With 50 foods, sending them down to the client is totally fine.
  const allFoods = await prisma.food.findMany({
    orderBy: { name: 'asc' }
  });

  // Basic Macro targets placeholder based on user data
  // Assuming 2500 kcal, 150g P, 250g C, 70g F as default
  const targets = {
    calories: 2500,
    protein: 150,
    carbs: 250,
    fat: 70
  };

  return (
    <NutritionClient 
      dateStr={dateStr}
      logs={logs}
      meals={meals}
      totals={totals}
      targets={targets}
      allFoods={allFoods}
    />
  );
}
