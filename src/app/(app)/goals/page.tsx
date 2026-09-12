import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { setGoal } from "@/app/actions/goals";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function GoalsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const goal = await prisma.goal.findUnique({
    where: { userId: session.user.id },
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <Link
            href="/dashboard"
            className="text-xs font-semibold text-black/40 hover:text-black uppercase tracking-widest mb-2 block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold tracking-tighter text-black mb-2">
            Active Goal
          </h1>
          <p className="text-base font-medium text-black/40">
            Define your primary training focus.
          </p>
        </div>
      </div>

      <div className="max-w-xl">
        <div className="bg-white rounded-2xl border border-black/5 p-6 md:p-8">
          <form action={setGoal} className="flex flex-col gap-6">
            <div>
              <label className="block text-xs font-semibold tracking-[0.1em] text-black/50 uppercase mb-4">
                Goal Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["CUT", "BULK", "MAINTAIN", "RECOMP"].map((type) => (
                  <label
                    key={type}
                    className="relative flex cursor-pointer rounded-xl border border-black/10 bg-[#fafafa] p-4 focus-within:ring-2 focus-within:ring-black/10 hover:border-black/30 transition-colors"
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      defaultChecked={goal?.type === type}
                      required
                      className="sr-only peer"
                    />
                    <div className="peer-checked:font-bold peer-checked:text-black text-black/50 font-medium text-sm w-full text-center tracking-wide">
                      {type}
                    </div>
                    {/* Active state styling overlay */}
                    <div className="absolute inset-0 rounded-xl border-2 border-transparent peer-checked:border-black pointer-events-none transition-colors" />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-[0.1em] text-black/50 uppercase mb-2">
                Target Weight (kg) <span className="text-black/30">(Optional)</span>
              </label>
              <input
                type="number"
                name="targetWeight"
                step="0.1"
                defaultValue={goal?.targetWeight || ""}
                className="w-full px-4 py-3 bg-[#fafafa] border border-black/10 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-shadow"
                placeholder="e.g. 80.0"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-[0.1em] text-black/50 uppercase mb-2">
                Notes <span className="text-black/30">(Optional)</span>
              </label>
              <textarea
                name="notes"
                rows={3}
                defaultValue={goal?.notes || ""}
                className="w-full px-4 py-3 bg-[#fafafa] border border-black/10 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-shadow resize-none"
                placeholder="Why is this your goal?"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-black text-white text-sm font-semibold tracking-wide rounded-xl hover:bg-black/90 active:scale-[0.98] transition-all cursor-pointer mt-2"
            >
              Update Goal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
