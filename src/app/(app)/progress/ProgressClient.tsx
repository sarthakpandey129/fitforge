"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { logWeight } from "@/app/actions/progress-client";

export default function ProgressClient({
  currentTab,
  bodyData,
  strengthData,
  nutritionData,
  exercises,
  selectedExerciseId,
  prs
}: {
  currentTab: string;
  bodyData: any[];
  strengthData: any[];
  nutritionData: any[];
  exercises: any[];
  selectedExerciseId: string;
  prs: Record<string, number>;
}) {
  const router = useRouter();

  // Weight Modal
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
  const [weightInput, setWeightInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogWeight = async () => {
    if (!weightInput) return;
    setIsSubmitting(true);
    await logWeight(parseFloat(weightInput));
    setIsSubmitting(false);
    setIsWeightModalOpen(false);
    setWeightInput("");
  };

  const handleExerciseChange = (e: any) => {
    router.push(`/progress?tab=STRENGTH&exerciseId=${e.target.value}`);
  };

  const currentWeight = bodyData.length > 0 ? bodyData[bodyData.length - 1].weight : 0;
  const startWeight = bodyData.length > 0 ? bodyData[0].weight : 0;
  const change = currentWeight - startWeight;

  return (
    <div className="flex flex-col gap-8">
      {/* Header & Tabs */}
      <div className="flex flex-col gap-6 border-b border-[#222222] pb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tighter text-[#ffffff]">Progress</h1>
          {currentTab === "BODY" && (
            <button 
              onClick={() => setIsWeightModalOpen(true)}
              className="bg-[#ffffff] text-[#0a0a0a] px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-[#e0e0e0] transition-colors"
            >
              Log Weight
            </button>
          )}
        </div>
        
        <div className="flex gap-6">
          {["BODY", "STRENGTH", "NUTRITION"].map((tab) => (
            <Link 
              key={tab}
              href={`/progress?tab=${tab}`} 
              className={`text-xs font-bold uppercase tracking-widest pb-2 border-b-2 transition-colors ${currentTab === tab ? "text-[#ffffff] border-[#ffffff]" : "text-[#888888] border-transparent hover:text-[#ffffff]"}`}
            >
              {tab}
            </Link>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {currentTab === "BODY" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#111111] border border-[#222222] rounded p-5 text-center">
              <p className="text-xs text-[#888888] font-bold uppercase tracking-widest mb-1">Current</p>
              <p className="text-2xl font-bold text-[#ffffff]">{currentWeight} <span className="text-xs">kg</span></p>
            </div>
            <div className="bg-[#111111] border border-[#222222] rounded p-5 text-center">
              <p className="text-xs text-[#888888] font-bold uppercase tracking-widest mb-1">Starting</p>
              <p className="text-2xl font-bold text-[#ffffff]">{startWeight} <span className="text-xs">kg</span></p>
            </div>
            <div className="bg-[#111111] border border-[#222222] rounded p-5 text-center">
              <p className="text-xs text-[#888888] font-bold uppercase tracking-widest mb-1">Change</p>
              <p className={`text-2xl font-bold ${change > 0 ? 'text-[#ff4444]' : change < 0 ? 'text-[#44ff44]' : 'text-[#ffffff]'}`}>
                {change > 0 ? '+' : ''}{change.toFixed(1)} <span className="text-xs">kg</span>
              </p>
            </div>
          </div>

          <div className="bg-[#111111] border border-[#222222] rounded p-6 h-[400px]">
            <h3 className="text-sm font-bold text-[#ffffff] uppercase tracking-wider mb-6">Weight Over Time</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bodyData}>
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111111', border: '1px solid #222222', borderRadius: '4px' }}
                  itemStyle={{ color: '#ffffff' }}
                />
                <Line type="monotone" dataKey="weight" stroke="#ffffff" strokeWidth={2} dot={{ r: 4, fill: '#111111', stroke: '#ffffff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {currentTab === "STRENGTH" && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <div className="bg-[#111111] border border-[#222222] rounded p-6">
                <h3 className="text-sm font-bold text-[#ffffff] uppercase tracking-wider mb-4">Select Exercise</h3>
                <select 
                  value={selectedExerciseId}
                  onChange={handleExerciseChange}
                  className="w-full bg-[#0a0a0a] border border-[#222222] text-[#ffffff] px-4 py-3 rounded text-sm focus:outline-none focus:border-[#ffffff] transition-colors appearance-none"
                >
                  {exercises.map(ex => (
                    <option key={ex.id} value={ex.id}>{ex.name}</option>
                  ))}
                </select>
                
                {prs[selectedExerciseId] && (
                  <div className="mt-6 text-center border-t border-[#222222] pt-6">
                    <p className="text-xs text-[#888888] font-bold uppercase tracking-widest mb-1">Personal Record</p>
                    <p className="text-3xl font-bold text-[#ffffff]">{prs[selectedExerciseId]} <span className="text-sm">kg</span></p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-2/3 bg-[#111111] border border-[#222222] rounded p-6 h-[400px]">
              <h3 className="text-sm font-bold text-[#ffffff] uppercase tracking-wider mb-6">Max Weight Over Time</h3>
              {strengthData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={strengthData}>
                    <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111111', border: '1px solid #222222', borderRadius: '4px' }}
                      itemStyle={{ color: '#ffffff' }}
                    />
                    <Line type="stepAfter" dataKey="weight" stroke="#ffffff" strokeWidth={2} dot={{ r: 4, fill: '#111111', stroke: '#ffffff' }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-[#888888] text-sm">
                  No data for this exercise yet.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {currentTab === "NUTRITION" && (
        <div className="flex flex-col gap-6">
          <div className="bg-[#111111] border border-[#222222] rounded p-6 h-[400px]">
            <h3 className="text-sm font-bold text-[#ffffff] uppercase tracking-wider mb-6">Calories (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nutritionData}>
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#222222' }}
                  contentStyle={{ backgroundColor: '#111111', border: '1px solid #222222', borderRadius: '4px' }}
                  itemStyle={{ color: '#ffffff' }}
                />
                <Bar dataKey="calories" fill="#ffffff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Log Weight Modal */}
      {isWeightModalOpen && (
        <div className="fixed inset-0 bg-[#0a0a0a]/90 backdrop-blur z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#222222] rounded-lg w-full max-w-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#ffffff] font-bold uppercase tracking-wider">Log Weight</h2>
              <button onClick={() => setIsWeightModalOpen(false)} className="text-[#888888] hover:text-[#ffffff] text-xl">&times;</button>
            </div>
            
            <div className="mb-6">
              <label className="block text-[#888888] text-xs font-bold uppercase tracking-widest mb-2">Weight (kg)</label>
              <input 
                type="number" 
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                step="0.1"
                className="w-full bg-[#0a0a0a] border border-[#222222] text-[#ffffff] px-4 py-3 rounded focus:outline-none focus:border-[#ffffff] text-center text-xl font-bold"
                autoFocus
              />
            </div>
            
            <button 
              onClick={handleLogWeight}
              disabled={isSubmitting || !weightInput}
              className="w-full bg-[#ffffff] text-[#0a0a0a] px-4 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-[#e0e0e0] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Weight'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
