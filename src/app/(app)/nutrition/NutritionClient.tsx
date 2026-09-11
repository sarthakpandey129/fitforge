"use client";

import { useState } from "react";
import { logFood } from "@/app/actions/nutrition-client";
import { useRouter } from "next/navigation";

export default function NutritionClient({
  dateStr,
  logs,
  meals,
  totals,
  targets,
  allFoods,
}: {
  dateStr: string;
  logs: any[];
  meals: Record<string, any[]>;
  totals: any;
  targets: any;
  allFoods: any[];
}) {
  const router = useRouter();
  
  // Date Navigation
  const prevDay = () => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() - 1);
    router.push(`/nutrition?date=${d.toISOString().split("T")[0]}`);
  };

  const nextDay = () => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + 1);
    router.push(`/nutrition?date=${d.toISOString().split("T")[0]}`);
  };

  const isToday = dateStr === new Date().toISOString().split("T")[0];

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMealType, setCurrentMealType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [quantity, setQuantity] = useState<string>("100");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openSearch = (mealType: string) => {
    setCurrentMealType(mealType);
    setSearchQuery("");
    setSelectedFood(null);
    setQuantity("100");
    setIsModalOpen(true);
  };

  const filteredFoods = allFoods.filter((f) => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLog = async () => {
    if (!selectedFood || !quantity) return;
    setIsSubmitting(true);
    await logFood(dateStr, currentMealType, selectedFood.id, parseFloat(quantity));
    setIsSubmitting(false);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Date Selector */}
      <div className="flex items-center justify-between border-b border-[#222222] pb-6">
        <button onClick={prevDay} className="text-[#888888] hover:text-[#ffffff] font-bold tracking-widest text-sm p-2 uppercase">
          ← Prev
        </button>
        <h1 className="text-xl md:text-2xl font-bold tracking-tighter text-[#ffffff]">
          {isToday ? "Today" : new Date(dateStr).toLocaleDateString()}
        </h1>
        <button 
          onClick={nextDay} 
          disabled={isToday}
          className={`font-bold tracking-widest text-sm p-2 uppercase ${isToday ? 'text-[#333333] cursor-not-allowed' : 'text-[#888888] hover:text-[#ffffff]'}`}
        >
          Next →
        </button>
      </div>

      {/* Daily Targets Bar */}
      <div className="bg-[#111111] border border-[#222222] rounded p-6">
        <h2 className="text-sm font-bold text-[#ffffff] uppercase tracking-wider mb-6">Daily Targets</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <MacroBar label="Calories" current={totals.calories} target={targets.calories} unit="kcal" />
          <MacroBar label="Protein" current={totals.protein} target={targets.protein} unit="g" />
          <MacroBar label="Carbs" current={totals.carbs} target={targets.carbs} unit="g" />
          <MacroBar label="Fat" current={totals.fat} target={targets.fat} unit="g" />
        </div>
      </div>

      {/* Meals */}
      <div className="flex flex-col gap-6">
        {["BREAKFAST", "LUNCH", "DINNER", "SNACKS"].map((mealName) => (
          <div key={mealName} className="bg-[#111111] border border-[#222222] rounded p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-[#ffffff] uppercase tracking-wider">{mealName}</h2>
              <button 
                onClick={() => openSearch(mealName)}
                className="text-xs font-bold text-[#888888] hover:text-[#ffffff] tracking-widest uppercase transition-colors"
              >
                + Add Food
              </button>
            </div>
            
            {meals[mealName]?.length > 0 ? (
              <div className="flex flex-col gap-3">
                {meals[mealName].map((log) => (
                  <div key={log.id} className="flex justify-between items-center border-b border-[#222222] pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="text-[#ffffff] font-medium text-sm">{log.food.name}</p>
                      <p className="text-[#888888] text-xs mt-0.5">{log.quantityGrams}g</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#ffffff] font-medium text-sm">{Math.round(log.cals)} kcal</p>
                      <p className="text-[#888888] text-xs mt-0.5">{Math.round(log.pro)}g P</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-4 text-center text-[#555555] text-sm">
                No food logged yet.
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Budget Tracker Placeholder */}
      <div className="bg-[#111111] border border-[#222222] rounded p-6">
        <h2 className="text-sm font-bold text-[#ffffff] uppercase tracking-wider mb-2">Budget Tracker</h2>
        <p className="text-[#888888] text-sm mb-4">You are within your estimated daily food budget based on your logged meals.</p>
        <div className="w-full h-2 bg-[#222222] rounded overflow-hidden">
          <div className="h-full bg-[#ffffff] w-1/2"></div>
        </div>
      </div>

      {/* Search Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0a0a0a]/90 backdrop-blur z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#222222] rounded-lg w-full max-w-lg flex flex-col h-[80vh] md:h-[60vh]">
            <div className="p-4 border-b border-[#222222] flex justify-between items-center">
              <h2 className="text-[#ffffff] font-bold uppercase tracking-wider">Add to {currentMealType}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#888888] hover:text-[#ffffff] text-xl">&times;</button>
            </div>
            
            {!selectedFood ? (
              <>
                <div className="p-4 border-b border-[#222222]">
                  <input 
                    type="text" 
                    placeholder="Search food database..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-[#222222] text-[#ffffff] px-4 py-3 rounded text-sm focus:outline-none focus:border-[#ffffff] transition-colors"
                    autoFocus
                  />
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                  {filteredFoods.map(f => (
                    <button 
                      key={f.id} 
                      onClick={() => setSelectedFood(f)}
                      className="w-full text-left p-3 hover:bg-[#222222] rounded flex justify-between items-center group"
                    >
                      <span className="text-[#ffffff] text-sm font-medium">{f.name}</span>
                      <span className="text-[#888888] text-xs opacity-0 group-hover:opacity-100 transition-opacity">Select →</span>
                    </button>
                  ))}
                  {filteredFoods.length === 0 && (
                    <div className="text-center py-10 text-[#888888] text-sm">No foods found.</div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-6 flex-1 flex flex-col justify-center gap-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#ffffff] mb-2">{selectedFood.name}</h3>
                  <p className="text-[#888888] text-sm">
                    Per 100g: {selectedFood.caloriesPer100} kcal | {selectedFood.proteinPer100}g P
                  </p>
                </div>
                
                <div>
                  <label className="block text-[#888888] text-xs font-bold uppercase tracking-widest mb-2">Quantity (Grams)</label>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-[#222222] text-[#ffffff] px-4 py-3 rounded focus:outline-none focus:border-[#ffffff] text-center text-xl font-bold"
                    autoFocus
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <button 
                    onClick={() => setSelectedFood(null)}
                    className="border border-[#222222] text-[#ffffff] px-4 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-[#222222] transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleLog}
                    disabled={isSubmitting}
                    className="bg-[#ffffff] text-[#0a0a0a] px-4 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-[#e0e0e0] transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Logging...' : 'Log Food'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MacroBar({ label, current, target, unit }: { label: string, current: number, target: number, unit: string }) {
  const percentage = Math.min(100, Math.max(0, (current / target) * 100));
  
  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <span className="text-[#888888] text-xs font-bold uppercase tracking-widest">{label}</span>
        <span className="text-[#ffffff] text-sm font-bold">{Math.round(current)} / {target}<span className="text-[10px] text-[#888888] ml-1">{unit}</span></span>
      </div>
      <div className="w-full h-1.5 bg-[#222222] rounded overflow-hidden">
        <div 
          className="h-full bg-[#ffffff] transition-all duration-500 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
