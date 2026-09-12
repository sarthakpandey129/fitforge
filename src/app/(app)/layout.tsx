import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Providers } from "@/components/Providers";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <Providers>
      <div className="min-h-screen bg-[#0a0a0a] text-[#ffffff]">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#222222]">
          <div className="max-w-7xl mx-auto px-6 md:px-8 h-14 flex items-center justify-between">
            <a
              href="/"
              className="text-sm font-bold tracking-[0.15em] text-[#ffffff] uppercase"
            >
              FITFORGE
            </a>

            <nav className="hidden md:flex items-center gap-8">
              <a
                href="/dashboard"
                className="text-xs font-semibold tracking-[0.1em] text-[#888888] uppercase hover:text-[#ffffff] transition-colors"
              >
                Dashboard
              </a>
              <a
                href="/workouts"
                className="text-xs font-semibold tracking-[0.1em] text-[#888888] uppercase hover:text-[#ffffff] transition-colors"
              >
                Workouts
              </a>
              <a
                href="/nutrition"
                className="text-xs font-semibold tracking-[0.1em] text-[#888888] uppercase hover:text-[#ffffff] transition-colors"
              >
                Nutrition
              </a>
              <a
                href="/progress"
                className="text-xs font-semibold tracking-[0.1em] text-[#888888] uppercase hover:text-[#ffffff] transition-colors"
              >
                Progress
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <span className="text-xs font-medium text-[#888888] hidden sm:block">
                {session.user.name || session.user.email}
              </span>
              <form
                action={async () => {
                  "use server";
                  const { signOut } = await import("@/lib/auth");
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="text-xs font-semibold tracking-[0.1em] text-[#888888] uppercase hover:text-[#ffffff] transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="max-w-7xl mx-auto px-6 md:px-8 py-10">{children}</main>
      </div>
    </Providers>
  );
}
