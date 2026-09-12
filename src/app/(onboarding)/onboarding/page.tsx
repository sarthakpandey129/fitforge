"use client";

import { completeOnboarding } from "@/app/actions/onboarding";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnboardingPage() {
  const router = useRouter();
  const { update } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      
      // We don't use the standard Server Action form action attribute 
      // because we need to manually update the NextAuth session token before redirecting.
      // If we just redirected from the server, the JWT cookie would still say onboarded: false
      // and our proxy middleware would redirect us right back here.
      
      await completeOnboarding(formData);
      
      // Force NextAuth to refresh the JWT with the newly updated DB status
      await update({ onboarded: true });
      
      // Navigate to dashboard
      router.push("/dashboard");
      router.refresh();
      
    } catch (err: any) {
      setError(err.message || "An error occurred during onboarding.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tighter text-black mb-2">
          Initialize Profile
        </h1>
        <p className="text-base font-medium text-black/40">
          Configure your baseline metrics to calibrate the system.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          {/* Physical Metrics */}
          <div>
            <h2 className="text-sm font-bold tracking-tight text-black mb-4 uppercase">
              Physical Data
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold tracking-[0.1em] text-black/50 uppercase mb-2">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  required
                  min="16"
                  max="120"
                  className="w-full px-4 py-3 bg-[#fafafa] border border-black/10 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-shadow"
                  placeholder="Years"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-[0.1em] text-black/50 uppercase mb-2">
                  Height <span className="text-black/30">(cm)</span>
                </label>
                <input
                  type="number"
                  name="height"
                  required
                  step="0.1"
                  className="w-full px-4 py-3 bg-[#fafafa] border border-black/10 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-shadow"
                  placeholder="e.g. 180.5"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-[0.1em] text-black/50 uppercase mb-2">
                  Weight <span className="text-black/30">(kg)</span>
                </label>
                <input
                  type="number"
                  name="weight"
                  required
                  step="0.1"
                  className="w-full px-4 py-3 bg-[#fafafa] border border-black/10 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-shadow"
                  placeholder="e.g. 75.0"
                />
              </div>
            </div>
          </div>

          {/* Goal */}
          <div>
            <h2 className="text-sm font-bold tracking-tight text-black mb-4 uppercase">
              Primary Objective
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["CUT", "BULK", "MAINTAIN", "RECOMP"].map((type) => (
                <label
                  key={type}
                  className="relative flex cursor-pointer rounded-xl border border-black/10 bg-[#fafafa] p-4 focus-within:ring-2 focus-within:ring-black/10 hover:border-black/30 transition-colors"
                >
                  <input
                    type="radio"
                    name="goalType"
                    value={type}
                    required
                    className="sr-only peer"
                  />
                  <div className="peer-checked:font-bold peer-checked:text-black text-black/50 font-medium text-xs w-full text-center tracking-wide">
                    {type}
                  </div>
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent peer-checked:border-black pointer-events-none transition-colors" />
                </label>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-sm font-bold tracking-tight text-black mb-4 uppercase">
                Activity Level
              </h2>
              <select 
                name="activityLevel" 
                required
                defaultValue=""
                className="w-full px-4 py-3 bg-[#fafafa] border border-black/10 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-shadow appearance-none"
              >
                <option value="" disabled>Select activity level</option>
                <option value="Sedentary">Sedentary (Desk job)</option>
                <option value="Light">Lightly Active (1-3 days/week)</option>
                <option value="Moderate">Moderately Active (3-5 days/week)</option>
                <option value="Very">Very Active (6-7 days/week)</option>
              </select>
            </div>

            <div>
              <h2 className="text-sm font-bold tracking-tight text-black mb-4 uppercase">
                Training Experience
              </h2>
              <select 
                name="trainingExperience" 
                required
                defaultValue=""
                className="w-full px-4 py-3 bg-[#fafafa] border border-black/10 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-shadow appearance-none"
              >
                <option value="" disabled>Select experience</option>
                <option value="Beginner">Beginner (&lt; 1 year)</option>
                <option value="Intermediate">Intermediate (1-3 years)</option>
                <option value="Advanced">Advanced (3+ years)</option>
              </select>
            </div>
          </div>
          
          <div>
            <h2 className="text-sm font-bold tracking-tight text-black mb-4 uppercase">
              Preferred Training Frequency
            </h2>
            <select 
              name="preferredFrequency" 
              required
              defaultValue=""
              className="w-full px-4 py-3 bg-[#fafafa] border border-black/10 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-shadow appearance-none"
            >
              <option value="" disabled>Select frequency</option>
              <option value="2-3">2-3 days per week</option>
              <option value="4-5">4-5 days per week</option>
              <option value="6+">6+ days per week</option>
            </select>
          </div>

          {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-black text-white text-sm font-semibold tracking-widest uppercase rounded-xl hover:bg-black/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-4"
          >
            {loading ? "Initializing..." : "Complete Setup"}
          </button>
        </form>
      </div>
    </div>
  );
}
