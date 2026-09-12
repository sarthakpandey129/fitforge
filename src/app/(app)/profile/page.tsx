import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tighter text-black mb-2">
          Profile Identity
        </h1>
        <p className="text-base font-medium text-black/40">
          Your core system configuration.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
        <div className="p-8 border-b border-black/5">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white text-xl font-bold">
              {user.name?.charAt(0) || user.email.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-black">{user.name || "User"}</h2>
              <p className="text-sm text-black/40">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-semibold tracking-[0.1em] text-black/50 uppercase mb-2">
                Physical Traits
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between text-sm">
                  <span className="text-black/60">Age</span>
                  <span className="font-semibold text-black">{user.age || "—"}</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-black/60">Height</span>
                  <span className="font-semibold text-black">{user.height ? `${user.height} cm` : "—"}</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold tracking-[0.1em] text-black/50 uppercase mb-2">
                Training Configuration
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between text-sm">
                  <span className="text-black/60">Activity Level</span>
                  <span className="font-semibold text-black">{user.activityLevel || "—"}</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-black/60">Experience</span>
                  <span className="font-semibold text-black">{user.trainingExperience || "—"}</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-black/60">Frequency</span>
                  <span className="font-semibold text-black">{user.preferredFrequency ? `${user.preferredFrequency} days/wk` : "—"}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-[#fafafa] p-6 flex justify-end">
          <p className="text-xs text-black/40">
            Joined {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
