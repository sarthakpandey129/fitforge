"use client";

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface DashboardClientProps {
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    targets: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    }
  };
  activityData: any[]; // { date: string, volume: number }
  goalProgress: number; // 0-100
  goalType: string;
  goalTarget: number;
}

export default function DashboardClient({ 
  nutrition, 
  activityData, 
  goalProgress, 
  goalType, 
  goalTarget 
}: DashboardClientProps) {
  
  const pieData = [
    { name: "Consumed", value: nutrition.calories },
    { name: "Remaining", value: Math.max(0, nutrition.targets.calories - nutrition.calories) }
  ];
  
  const COLORS = ["#ffffff", "#222222"];

  const getPercentage = (value: number, target: number) => {
    if (target === 0) return 0;
    return Math.min(100, Math.round((value / target) * 100));
  };

  return (
    <>
      {/* Nutrition Summary (Client Side for Animation/Charts) */}
      <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border-[#222222] shadow-[0_0_20px_rgba(255,255,255,0.02)] border border-[#222222] rounded p-6">
        <h2 className="text-sm font-bold text-[#ffffff] uppercase tracking-wider mb-6">Today's Nutrition</h2>
        
        <div className="flex justify-center mb-6 relative h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={50}
                outerRadius={60}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold text-[#ffffff]">{Math.round(nutrition.calories)}</span>
            <span className="text-[10px] text-[#888888] uppercase tracking-widest">Kcal</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#888888]">Protein</span>
              <span className="text-[#ffffff]">{Math.round(nutrition.protein)}g / {nutrition.targets.protein}g</span>
            </div>
            <div className="w-full h-1.5 bg-[#222222] rounded overflow-hidden">
              <div 
                className="h-full bg-[#ffffff] transition-all duration-1000" 
                style={{ width: `${getPercentage(nutrition.protein, nutrition.targets.protein)}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#888888]">Carbs</span>
              <span className="text-[#ffffff]">{Math.round(nutrition.carbs)}g / {nutrition.targets.carbs}g</span>
            </div>
            <div className="w-full h-1.5 bg-[#222222] rounded overflow-hidden">
              <div 
                className="h-full bg-[#ffffff] transition-all duration-1000" 
                style={{ width: `${getPercentage(nutrition.carbs, nutrition.targets.carbs)}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#888888]">Fat</span>
              <span className="text-[#ffffff]">{Math.round(nutrition.fat)}g / {nutrition.targets.fat}g</span>
            </div>
            <div className="w-full h-1.5 bg-[#222222] rounded overflow-hidden">
              <div 
                className="h-full bg-[#ffffff] transition-all duration-1000" 
                style={{ width: `${getPercentage(nutrition.fat, nutrition.targets.fat)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Goal */}
      <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border-[#222222] shadow-[0_0_20px_rgba(255,255,255,0.02)] border border-[#222222] rounded p-6">
        <h2 className="text-sm font-bold text-[#ffffff] uppercase tracking-wider mb-6">Active Goals</h2>
        
        {goalType ? (
          <div className="border border-[#222222] rounded p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-[#ffffff]">{goalType} Phase</h3>
              <span className="text-xs font-bold text-[#ffffff] px-2 py-1 bg-[#222222] rounded uppercase">Target: {goalTarget}kg</span>
            </div>
            <p className="text-xs text-[#888888] mb-4">Focus on consistency and nutrition.</p>
            
            <div className="w-full h-2 bg-[#222222] rounded overflow-hidden mb-2">
              <div 
                className="h-full bg-[#ffffff] transition-all duration-1000 relative" 
                style={{ width: `${Math.max(5, goalProgress)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-[#888888] font-bold uppercase tracking-widest">
              <span>Start</span>
              <span>{goalProgress}%</span>
              <span>Goal</span>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center text-[#888888] text-sm">
            No active goals. Head to settings to set one up.
          </div>
        )}
      </div>

      {/* Activity Pulse (Mini Chart) */}
      <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border-[#222222] shadow-[0_0_20px_rgba(255,255,255,0.02)] border border-[#222222] rounded p-6 lg:col-span-2">
         <h2 className="text-sm font-bold text-[#ffffff] uppercase tracking-wider mb-6">Activity Pulse (7 Days)</h2>
         <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#888888', fontSize: 10 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#888888', fontSize: 10 }}
                />
                <Tooltip 
                  cursor={{ fill: '#222222' }}
                  contentStyle={{ backgroundColor: '#111111', borderColor: '#222222', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: any) => [`${value} sessions`, 'Activity']}
                />
                <Bar dataKey="volume" fill="#ffffff" radius={[2, 2, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
         </div>
      </div>
    </>
  );
}
