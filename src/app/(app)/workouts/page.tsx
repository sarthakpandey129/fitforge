import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function WorkoutsPage({
  searchParams,
}: {
  searchParams: { tab?: string; filter?: string; q?: string };
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/signin");
  }

  const currentTab = searchParams.tab === "library" ? "library" : "my-workouts";
  const filter = searchParams.filter || "ALL";
  const query = searchParams.q || "";

  // Data fetching
  let workouts: any[] = [];
  let exercises: any[] = [];

  if (currentTab === "my-workouts") {
    workouts = await prisma.workout.findMany({
      where: { userId: session.user.id },
      include: {
        exercises: true,
        sessions: {
          orderBy: { startedAt: 'desc' },
          take: 1
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  } else {
    // Fetch exercises for library
    const whereClause: any = {};
    if (filter !== "ALL") {
      whereClause.muscleGroup = filter;
    }
    if (query) {
      whereClause.name = { contains: query };
    }
    exercises = await prisma.exercise.findMany({
      where: whereClause,
      orderBy: { name: 'asc' }
    });
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header & Tabs */}
      <div className="flex flex-col gap-6 border-b border-[#222222] pb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tighter text-[#ffffff]">Workouts</h1>
          {currentTab === "my-workouts" && (
            <form action={async () => {
              "use server";
              const { createWorkout } = await import("@/app/actions/workouts");
              await createWorkout();
            }}>
              <button 
                type="submit"
                className="bg-[#ffffff] text-[#0a0a0a] px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-[#e0e0e0] transition-colors cursor-pointer"
              >
                Create Workout
              </button>
            </form>
          )}
        </div>
        
        <div className="flex gap-6">
          <Link 
            href="/workouts?tab=my-workouts" 
            className={`text-xs font-bold uppercase tracking-widest pb-2 border-b-2 transition-colors ${currentTab === "my-workouts" ? "text-[#ffffff] border-[#ffffff]" : "text-[#888888] border-transparent hover:text-[#ffffff]"}`}
          >
            My Workouts
          </Link>
          <Link 
            href="/workouts?tab=library" 
            className={`text-xs font-bold uppercase tracking-widest pb-2 border-b-2 transition-colors ${currentTab === "library" ? "text-[#ffffff] border-[#ffffff]" : "text-[#888888] border-transparent hover:text-[#ffffff]"}`}
          >
            Exercise Library
          </Link>
        </div>
      </div>

      {/* Tab Content */}
      {currentTab === "my-workouts" ? (
        <div className="flex flex-col gap-4">
          {workouts.length > 0 ? (
            workouts.map((workout) => (
              <Link key={workout.id} href={`/workouts/${workout.id}`} className="group block">
                <div className="bg-[#111111] border border-[#222222] rounded p-5 flex items-center justify-between group-hover:border-[#888888] transition-colors">
                  <div>
                    <h2 className="text-lg font-bold text-[#ffffff] mb-1">{workout.name}</h2>
                    <p className="text-sm text-[#888888]">
                      {workout.exercises.length} exercises
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#888888] uppercase tracking-widest mb-1">Last Performed</p>
                    <p className="text-sm font-medium text-[#ffffff]">
                      {workout.sessions.length > 0 
                        ? new Date(workout.sessions[0].startedAt).toLocaleDateString() 
                        : "Never"}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="py-20 text-center border border-[#222222] rounded bg-[#111111]">
              <p className="text-[#888888] mb-4">No workouts yet. Create your first.</p>
              <form action={async () => {
                "use server";
                const { createWorkout } = await import("@/app/actions/workouts");
                await createWorkout();
              }}>
                <button 
                  type="submit"
                  className="bg-[#ffffff] text-[#0a0a0a] px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-[#e0e0e0] transition-colors cursor-pointer"
                >
                  Create Workout
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Library Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {["ALL", "CHEST", "BACK", "LEGS", "SHOULDERS", "ARMS", "CORE"].map((f) => (
                <Link 
                  key={f}
                  href={`/workouts?tab=library&filter=${f}${query ? `&q=${query}` : ''}`}
                  className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-widest transition-colors ${filter === f ? "bg-[#ffffff] text-[#0a0a0a]" : "bg-[#111111] text-[#888888] border border-[#222222] hover:text-[#ffffff]"}`}
                >
                  {f}
                </Link>
              ))}
            </div>
            
            {/* Very simple search (Next.js server-side forms are best done with a small client component, but a form tag works too) */}
            <form action="/workouts" className="w-full md:w-64 relative">
              <input type="hidden" name="tab" value="library" />
              <input type="hidden" name="filter" value={filter} />
              <input 
                type="text" 
                name="q" 
                defaultValue={query}
                placeholder="Search exercises..." 
                className="w-full bg-[#111111] border border-[#222222] text-[#ffffff] px-4 py-2 rounded text-sm focus:outline-none focus:border-[#ffffff] transition-colors placeholder-[#888888]"
              />
            </form>
          </div>

          {/* Exercise Grid */}
          {exercises.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exercises.map((ex) => (
                <div key={ex.id} className="bg-[#111111] border border-[#222222] rounded p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#ffffff] mb-2">{ex.name}</h3>
                    <div className="flex gap-2 mb-4">
                      <span className="text-[10px] font-bold text-[#888888] bg-[#222222] px-2 py-1 rounded uppercase tracking-widest">{ex.muscleGroup}</span>
                      <span className="text-[10px] font-bold text-[#888888] bg-[#222222] px-2 py-1 rounded uppercase tracking-widest">{ex.equipment}</span>
                    </div>
                  </div>
                  {ex.instructions && (
                    <p className="text-xs text-[#888888] line-clamp-2">{ex.instructions}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-[#222222] rounded bg-[#111111]">
              <p className="text-[#888888]">No exercises found for your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
