"use client";

import { useState, useEffect } from "react";
import { updateWorkoutName, completeSession } from "@/app/actions/workouts-client"; // We'll create this actions file

export default function WorkoutClient({ 
  initialWorkout, 
  allExercises 
}: { 
  initialWorkout: any; 
  allExercises: any[] 
}) {
  const [workout, setWorkout] = useState(initialWorkout);
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(workout.name);
  
  // Session State
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [setsData, setSetsData] = useState<any>({});

  // Timer
  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleNameSave = async () => {
    setIsEditingName(false);
    if (name !== workout.name) {
      setWorkout({ ...workout, name });
      await updateWorkoutName(workout.id, name);
    }
  };

  const startSession = () => {
    setIsActive(true);
    // Initialize sets data structure
    const initialSets: any = {};
    workout.exercises.forEach((ex: any) => {
      initialSets[ex.id] = Array.from({ length: ex.sets }).map((_, i) => ({
        weight: ex.weight || "",
        reps: ex.reps || "",
        completed: false
      }));
    });
    setSetsData(initialSets);
  };

  const toggleSet = (exerciseId: string, setIndex: number) => {
    setSetsData((prev: any) => {
      const newSets = { ...prev };
      newSets[exerciseId][setIndex].completed = !newSets[exerciseId][setIndex].completed;
      return newSets;
    });
  };

  const updateSet = (exerciseId: string, setIndex: number, field: string, value: string) => {
    setSetsData((prev: any) => {
      const newSets = { ...prev };
      newSets[exerciseId][setIndex][field] = value;
      return newSets;
    });
  };

  const finishWorkout = async () => {
    setIsActive(false);
    await completeSession(workout.id, timer, setsData);
    window.location.href = "/dashboard";
  };

  if (isActive) {
    const currentEx = workout.exercises[currentExerciseIndex];
    return (
      <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between bg-[#111111] border border-[#222222] p-4 rounded sticky top-20 z-10">
          <div>
            <h2 className="text-[#ffffff] font-bold">{workout.name}</h2>
            <div className="text-[#888888] font-mono text-sm">{formatTime(timer)}</div>
          </div>
          <button 
            onClick={finishWorkout}
            className="bg-[#ffffff] text-[#0a0a0a] px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-[#e0e0e0] transition-colors"
          >
            Finish
          </button>
        </div>

        {currentEx ? (
          <div className="bg-[#111111] border border-[#222222] rounded p-6">
            <h3 className="text-xl font-bold text-[#ffffff] mb-4">{currentEx.exercise.name}</h3>
            
            <div className="grid grid-cols-12 gap-2 text-xs font-bold text-[#888888] uppercase tracking-widest mb-2 border-b border-[#222222] pb-2">
              <div className="col-span-2 text-center">Set</div>
              <div className="col-span-4 text-center">Weight (kg)</div>
              <div className="col-span-4 text-center">Reps</div>
              <div className="col-span-2 text-center">Done</div>
            </div>

            {setsData[currentEx.id]?.map((set: any, i: number) => (
              <div key={i} className={`grid grid-cols-12 gap-2 items-center py-2 ${set.completed ? 'opacity-50' : ''}`}>
                <div className="col-span-2 text-center text-[#ffffff] font-bold">{i + 1}</div>
                <div className="col-span-4">
                  <input 
                    type="number" 
                    value={set.weight}
                    onChange={(e) => updateSet(currentEx.id, i, 'weight', e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-[#222222] text-[#ffffff] text-center px-2 py-2 rounded focus:outline-none focus:border-[#ffffff]"
                  />
                </div>
                <div className="col-span-4">
                  <input 
                    type="number" 
                    value={set.reps}
                    onChange={(e) => updateSet(currentEx.id, i, 'reps', e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-[#222222] text-[#ffffff] text-center px-2 py-2 rounded focus:outline-none focus:border-[#ffffff]"
                  />
                </div>
                <div className="col-span-2 flex justify-center">
                  <button 
                    onClick={() => toggleSet(currentEx.id, i)}
                    className={`w-8 h-8 rounded flex items-center justify-center border transition-colors ${set.completed ? 'bg-[#ffffff] border-[#ffffff] text-[#0a0a0a]' : 'bg-[#222222] border-[#222222] text-transparent hover:border-[#ffffff]'}`}
                  >
                    ✓
                  </button>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between mt-8">
              <button 
                onClick={() => setCurrentExerciseIndex(Math.max(0, currentExerciseIndex - 1))}
                disabled={currentExerciseIndex === 0}
                className="text-xs font-bold text-[#888888] uppercase tracking-widest disabled:opacity-30"
              >
                ← Previous
              </button>
              <button 
                onClick={() => setCurrentExerciseIndex(Math.min(workout.exercises.length - 1, currentExerciseIndex + 1))}
                disabled={currentExerciseIndex === workout.exercises.length - 1}
                className="text-xs font-bold text-[#ffffff] uppercase tracking-widest disabled:opacity-30"
              >
                Next →
              </button>
            </div>
          </div>
        ) : (
           <div className="py-20 text-center border border-[#222222] rounded bg-[#111111]">
              <p className="text-[#888888] mb-4">No exercises in this workout.</p>
           </div>
        )}
      </div>
    );
  }

  // Edit Mode (View)
  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222222] pb-6">
        {isEditingName ? (
          <div className="flex items-center gap-2 w-full md:w-auto">
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#111111] border border-[#222222] text-3xl font-bold tracking-tighter text-[#ffffff] px-2 py-1 rounded w-full md:w-auto focus:outline-none focus:border-[#ffffff]"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
            />
            <button onClick={handleNameSave} className="text-xs font-bold text-[#888888] hover:text-[#ffffff] uppercase">Save</button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tighter text-[#ffffff]">{workout.name}</h1>
            <button onClick={() => setIsEditingName(true)} className="text-[#888888] hover:text-[#ffffff]">
              ✎
            </button>
          </div>
        )}

        <button 
          onClick={startSession}
          className="bg-[#ffffff] text-[#0a0a0a] px-8 py-3 rounded text-sm font-bold uppercase tracking-widest hover:bg-[#e0e0e0] transition-colors w-full md:w-auto"
        >
          Start Session
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-bold text-[#ffffff] uppercase tracking-wider">Plan ({workout.exercises.length} Exercises)</h2>
        
        {workout.exercises.length > 0 ? (
          workout.exercises.map((ex: any, i: number) => (
            <div key={ex.id} className="bg-[#111111] border border-[#222222] rounded p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-[#888888] font-bold text-lg">{i + 1}</span>
                <div>
                  <h3 className="text-[#ffffff] font-bold">{ex.exercise.name}</h3>
                  <p className="text-xs text-[#888888] uppercase tracking-widest mt-1">
                    {ex.sets} Sets × {ex.reps || '?'} Reps
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center border border-[#222222] rounded bg-[#111111]">
            <p className="text-[#888888] mb-4">No exercises added yet.</p>
            {/* Real app would have a search component here to add exercises */}
            <p className="text-xs text-[#555555]">Go to Library to add exercises to this workout.</p>
          </div>
        )}
      </div>
    </div>
  );
}
