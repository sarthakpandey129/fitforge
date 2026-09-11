import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/signin");
  }

  const userId = session.user.id;

  // Fetch basic data (placeholder values for now as we build out the full system)
  const today = new Date();
  
  // Recent Workouts (placeholder until Workout schema is fully populated)
  const recentWorkouts = await prisma.workoutSession.findMany({
    where: { userId },
    orderBy: { startedAt: 'desc' },
    take: 3,
    include: { workout: true }
  });

  // Active Goal
  const goal = await prisma.goal.findUnique({
    where: { userId }
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <p className="text-[#888888] text-sm font-medium mb-1">
            {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h1 className="text-2xl font-bold text-[#ffffff] tracking-tight">
            Good morning, {session.user.name?.split(' ')[0] || "Athlete"}
          </h1>
        </div>
        <Link 
          href="/workouts" 
          className="bg-[#ffffff] text-[#0a0a0a] px-6 py-3 rounded text-sm font-bold uppercase tracking-widest hover:bg-[#e0e0e0] transition-colors text-center"
        >
          Start Today's Workout
        </Link>
      </div>

      {/* Row 1: Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Today's Calories", value: "0", unit: "kcal" },
          { label: "Protein Today", value: "0", unit: "g" },
          { label: "Workout Streak", value: "0", unit: "days" },
          { label: "Weekly Workouts", value: "0", unit: "/4" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#111111] border border-[#222222] rounded p-5 flex flex-col justify-between">
            <h3 className="text-[#888888] text-xs font-semibold uppercase tracking-wider mb-3">
              {stat.label}
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#ffffff]">{stat.value}</span>
              <span className="text-xs text-[#888888] font-medium">{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Recent Workouts + Nutrition Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#111111] border border-[#222222] rounded p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold text-[#ffffff] uppercase tracking-wider">Recent Workouts</h2>
            <Link href="/workouts" className="text-xs text-[#888888] hover:text-[#ffffff] transition-colors">View All</Link>
          </div>
          
          {recentWorkouts.length > 0 ? (
            <div className="space-y-3">
              {recentWorkouts.map((session) => (
                <div key={session.id} className="flex items-center justify-between border-b border-[#222222] pb-3 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-[#ffffff]">{session.workout.name}</p>
                    <p className="text-xs text-[#888888]">{new Date(session.startedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#ffffff] font-medium">{session.duration ? `${Math.floor(session.duration/60)}m` : 'Completed'}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-[#888888] text-sm">
              No workouts yet. Create your first.
            </div>
          )}
        </div>

        <div className="bg-[#111111] border border-[#222222] rounded p-6">
          <h2 className="text-sm font-bold text-[#ffffff] uppercase tracking-wider mb-6">Today's Nutrition</h2>
          
          {/* Circular progress placeholder (using simple div for now) */}
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32 rounded-full border-8 border-[#222222] flex items-center justify-center">
              <div className="text-center">
                <span className="block text-xl font-bold text-[#ffffff]">0</span>
                <span className="block text-[10px] text-[#888888] uppercase tracking-widest">Kcal</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#888888]">Protein</span>
                <span className="text-[#ffffff]">0g</span>
              </div>
              <div className="w-full h-1.5 bg-[#222222] rounded overflow-hidden">
                <div className="h-full bg-[#ffffff] w-0"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#888888]">Carbs</span>
                <span className="text-[#ffffff]">0g</span>
              </div>
              <div className="w-full h-1.5 bg-[#222222] rounded overflow-hidden">
                <div className="h-full bg-[#ffffff] w-0"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#888888]">Fat</span>
                <span className="text-[#ffffff]">0g</span>
              </div>
              <div className="w-full h-1.5 bg-[#222222] rounded overflow-hidden">
                <div className="h-full bg-[#ffffff] w-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Active Goals + Quick Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#111111] border border-[#222222] rounded p-6">
          <h2 className="text-sm font-bold text-[#ffffff] uppercase tracking-wider mb-6">Active Goals</h2>
          
          {goal ? (
            <div className="border border-[#222222] rounded p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-[#ffffff]">{goal.type} Phase</h3>
                <span className="text-xs font-bold text-[#ffffff] px-2 py-1 bg-[#222222] rounded uppercase">Target: {goal.targetWeight}kg</span>
              </div>
              <p className="text-xs text-[#888888] mb-4">Focus on consistency and nutrition.</p>
              
              <div className="w-full h-2 bg-[#222222] rounded overflow-hidden">
                <div className="h-full bg-[#ffffff] w-1/3"></div>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center text-[#888888] text-sm">
              No active goals. Head to settings to set one up.
            </div>
          )}
        </div>

        <div className="bg-[#111111] border border-[#222222] rounded p-6">
          <h2 className="text-sm font-bold text-[#ffffff] uppercase tracking-wider mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/nutrition" className="flex items-center justify-center p-4 border border-[#222222] rounded text-sm font-medium text-[#ffffff] hover:bg-[#222222] transition-colors">
              Log Meal
            </Link>
            <Link href="/workouts" className="flex items-center justify-center p-4 border border-[#222222] rounded text-sm font-medium text-[#ffffff] hover:bg-[#222222] transition-colors">
              Log Workout
            </Link>
            <Link href="/progress" className="flex items-center justify-center p-4 border border-[#222222] rounded text-sm font-medium text-[#ffffff] hover:bg-[#222222] transition-colors">
              Log Weight
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
