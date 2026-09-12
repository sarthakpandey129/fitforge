import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const exercises = [
  { name: "Barbell Bench Press", muscleGroup: "CHEST", equipment: "Barbell", difficulty: "Intermediate" },
  { name: "Incline Dumbbell Press", muscleGroup: "CHEST", equipment: "Dumbbell", difficulty: "Intermediate" },
  { name: "Push-ups", muscleGroup: "CHEST", equipment: "Bodyweight", difficulty: "Beginner" },
  { name: "Cable Crossovers", muscleGroup: "CHEST", equipment: "Cable", difficulty: "Beginner" },
  { name: "Barbell Squat", muscleGroup: "LEGS", equipment: "Barbell", difficulty: "Advanced" },
  { name: "Leg Press", muscleGroup: "LEGS", equipment: "Machine", difficulty: "Beginner" },
  { name: "Romanian Deadlift", muscleGroup: "LEGS", equipment: "Barbell", difficulty: "Intermediate" },
  { name: "Bulgarian Split Squat", muscleGroup: "LEGS", equipment: "Dumbbell", difficulty: "Advanced" },
  { name: "Pull-ups", muscleGroup: "BACK", equipment: "Bodyweight", difficulty: "Intermediate" },
  { name: "Barbell Row", muscleGroup: "BACK", equipment: "Barbell", difficulty: "Intermediate" },
  { name: "Lat Pulldown", muscleGroup: "BACK", equipment: "Cable", difficulty: "Beginner" },
  { name: "Seated Cable Row", muscleGroup: "BACK", equipment: "Cable", difficulty: "Beginner" },
  { name: "Overhead Press", muscleGroup: "SHOULDERS", equipment: "Barbell", difficulty: "Intermediate" },
  { name: "Lateral Raises", muscleGroup: "SHOULDERS", equipment: "Dumbbell", difficulty: "Beginner" },
  { name: "Face Pulls", muscleGroup: "SHOULDERS", equipment: "Cable", difficulty: "Beginner" },
  { name: "Barbell Curl", muscleGroup: "ARMS", equipment: "Barbell", difficulty: "Beginner" },
  { name: "Tricep Pushdown", muscleGroup: "ARMS", equipment: "Cable", difficulty: "Beginner" },
  { name: "Hammer Curls", muscleGroup: "ARMS", equipment: "Dumbbell", difficulty: "Beginner" },
  { name: "Plank", muscleGroup: "CORE", equipment: "Bodyweight", difficulty: "Beginner" },
  { name: "Hanging Leg Raises", muscleGroup: "CORE", equipment: "Bodyweight", difficulty: "Intermediate" },
];

const indianFoods = [
  { name: "White Rice (Cooked)", caloriesPer100: 130, proteinPer100: 2.7, carbsPer100: 28, fatPer100: 0.3, isIndian: true },
  { name: "Brown Rice (Cooked)", caloriesPer100: 112, proteinPer100: 2.6, carbsPer100: 24, fatPer100: 0.9, isIndian: true },
  { name: "Roti (Whole Wheat)", caloriesPer100: 297, proteinPer100: 9.7, carbsPer100: 55, fatPer100: 3.7, isIndian: true },
  { name: "Toor Dal (Cooked)", caloriesPer100: 116, proteinPer100: 6, carbsPer100: 20, fatPer100: 1.5, isIndian: true },
  { name: "Moong Dal (Cooked)", caloriesPer100: 105, proteinPer100: 7, carbsPer100: 19, fatPer100: 0.5, isIndian: true },
  { name: "Paneer (Full Fat)", caloriesPer100: 265, proteinPer100: 18, carbsPer100: 1.2, fatPer100: 20, isIndian: true },
  { name: "Chicken Breast (Cooked)", caloriesPer100: 165, proteinPer100: 31, carbsPer100: 0, fatPer100: 3.6, isIndian: true },
  { name: "Egg (Whole, Boiled)", caloriesPer100: 155, proteinPer100: 13, carbsPer100: 1.1, fatPer100: 11, isIndian: true },
  { name: "Soya Chunks (Raw)", caloriesPer100: 345, proteinPer100: 52, carbsPer100: 33, fatPer100: 0.5, isIndian: true },
  { name: "Curd / Dahi (Whole Milk)", caloriesPer100: 98, proteinPer100: 3.5, carbsPer100: 3.4, fatPer100: 4.3, isIndian: true },
  { name: "Cow Milk", caloriesPer100: 61, proteinPer100: 3.2, carbsPer100: 4.8, fatPer100: 3.3, isIndian: true },
  { name: "Buffalo Milk", caloriesPer100: 97, proteinPer100: 3.7, carbsPer100: 5.2, fatPer100: 6.9, isIndian: true },
  { name: "Banana", caloriesPer100: 89, proteinPer100: 1.1, carbsPer100: 23, fatPer100: 0.3, isIndian: true },
  { name: "Potato (Boiled)", caloriesPer100: 87, proteinPer100: 1.9, carbsPer100: 20, fatPer100: 0.1, isIndian: true },
  { name: "Sweet Potato (Boiled)", caloriesPer100: 86, proteinPer100: 1.6, carbsPer100: 20, fatPer100: 0.1, isIndian: true },
  { name: "Rajma (Cooked)", caloriesPer100: 127, proteinPer100: 9, carbsPer100: 23, fatPer100: 0.5, isIndian: true },
  { name: "Chole / Chickpeas (Cooked)", caloriesPer100: 164, proteinPer100: 9, carbsPer100: 27, fatPer100: 2.6, isIndian: true },
  { name: "Peanuts (Roasted)", caloriesPer100: 567, proteinPer100: 26, carbsPer100: 16, fatPer100: 49, isIndian: true },
  { name: "Almonds", caloriesPer100: 579, proteinPer100: 21, carbsPer100: 22, fatPer100: 50, isIndian: true },
  { name: "Walnuts", caloriesPer100: 654, proteinPer100: 15, carbsPer100: 14, fatPer100: 65, isIndian: true },
  { name: "Ghee", caloriesPer100: 900, proteinPer100: 0, carbsPer100: 0, fatPer100: 100, isIndian: true },
  { name: "Butter", caloriesPer100: 717, proteinPer100: 0.9, carbsPer100: 0.1, fatPer100: 81, isIndian: true },
  { name: "Oats (Raw)", caloriesPer100: 389, proteinPer100: 17, carbsPer100: 66, fatPer100: 6.9, isIndian: true },
  { name: "Whey Protein Concentrate", caloriesPer100: 414, proteinPer100: 80, carbsPer100: 9, fatPer100: 6, isIndian: false },
  { name: "Whey Protein Isolate", caloriesPer100: 359, proteinPer100: 90, carbsPer100: 2, fatPer100: 1, isIndian: false },
  { name: "White Bread", caloriesPer100: 265, proteinPer100: 9, carbsPer100: 49, fatPer100: 3.2, isIndian: false },
  { name: "Brown Bread", caloriesPer100: 250, proteinPer100: 11, carbsPer100: 41, fatPer100: 3.5, isIndian: false },
  { name: "Aloo Sabzi (Approx)", caloriesPer100: 130, proteinPer100: 1.5, carbsPer100: 15, fatPer100: 7, isIndian: true },
  { name: "Palak Paneer (Approx)", caloriesPer100: 200, proteinPer100: 12, carbsPer100: 8, fatPer100: 15, isIndian: true },
  { name: "Chicken Curry (Approx)", caloriesPer100: 150, proteinPer100: 16, carbsPer100: 5, fatPer100: 8, isIndian: true },
  { name: "Mixed Sprout Salad", caloriesPer100: 110, proteinPer100: 8, carbsPer100: 20, fatPer100: 1.5, isIndian: true },
  { name: "Poha (Cooked)", caloriesPer100: 130, proteinPer100: 2.5, carbsPer100: 25, fatPer100: 2, isIndian: true },
  { name: "Upma (Cooked)", caloriesPer100: 150, proteinPer100: 3, carbsPer100: 22, fatPer100: 5, isIndian: true },
  { name: "Idli", caloriesPer100: 105, proteinPer100: 3, carbsPer100: 22, fatPer100: 0.4, isIndian: true },
  { name: "Dosa (Plain)", caloriesPer100: 167, proteinPer100: 3.5, carbsPer100: 29, fatPer100: 3.7, isIndian: true },
  { name: "Apple", caloriesPer100: 52, proteinPer100: 0.3, carbsPer100: 14, fatPer100: 0.2, isIndian: true },
  { name: "Papaya", caloriesPer100: 43, proteinPer100: 0.5, carbsPer100: 11, fatPer100: 0.3, isIndian: true },
  { name: "Guava", caloriesPer100: 68, proteinPer100: 2.6, carbsPer100: 14, fatPer100: 1, isIndian: true },
  { name: "Mango", caloriesPer100: 60, proteinPer100: 0.8, carbsPer100: 15, fatPer100: 0.4, isIndian: true },
  { name: "Cucumber", caloriesPer100: 15, proteinPer100: 0.7, carbsPer100: 3.6, fatPer100: 0.1, isIndian: true },
  { name: "Tomato", caloriesPer100: 18, proteinPer100: 0.9, carbsPer100: 3.9, fatPer100: 0.2, isIndian: true },
  { name: "Onion", caloriesPer100: 40, proteinPer100: 1.1, carbsPer100: 9, fatPer100: 0.1, isIndian: true },
  { name: "Bhindi (Cooked)", caloriesPer100: 70, proteinPer100: 2, carbsPer100: 8, fatPer100: 4, isIndian: true },
  { name: "Gobi Aloo (Cooked)", caloriesPer100: 90, proteinPer100: 2, carbsPer100: 12, fatPer100: 4, isIndian: true },
  { name: "Baingan Bharta", caloriesPer100: 80, proteinPer100: 1.5, carbsPer100: 8, fatPer100: 5, isIndian: true },
  { name: "Besan Chilla", caloriesPer100: 160, proteinPer100: 8, carbsPer100: 18, fatPer100: 6, isIndian: true },
  { name: "Mutton Curry (Approx)", caloriesPer100: 200, proteinPer100: 20, carbsPer100: 4, fatPer100: 12, isIndian: true },
  { name: "Fish Curry (Approx)", caloriesPer100: 140, proteinPer100: 16, carbsPer100: 5, fatPer100: 6, isIndian: true },
  { name: "Egg Curry", caloriesPer100: 150, proteinPer100: 10, carbsPer100: 6, fatPer100: 10, isIndian: true },
  { name: "Masoor Dal (Cooked)", caloriesPer100: 116, proteinPer100: 9, carbsPer100: 20, fatPer100: 0.4, isIndian: true },
];

async function main() {
  console.log("Seeding database...");
  
  // Exercises
  const exerciseCount = await prisma.exercise.count();
  if (exerciseCount === 0) {
    for (const ex of exercises) {
      await prisma.exercise.create({ data: ex });
    }
    console.log(`Seeded ${exercises.length} exercises.`);
  } else {
    console.log("Exercises already seeded.");
  }

  // Foods
  const foodCount = await prisma.food.count();
  if (foodCount === 0) {
    for (const food of indianFoods) {
      await prisma.food.create({ data: food });
    }
    console.log(`Seeded ${indianFoods.length} foods.`);
  } else {
    console.log("Foods already seeded.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
