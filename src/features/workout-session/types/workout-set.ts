import { ExerciseWithAttributes } from "@/features/workout-builder/types";

export type WorkoutSetType = "TIME" | "WEIGHT" | "REPS" | "BODYWEIGHT" | "NA";
export type WorkoutSetUnit = "kg" | "lbs";

export interface WorkoutSet {
  id: string;
  setIndex: number;
  types: WorkoutSetType[]; // To support multiple columns
  valueInt?: number; // reps, weight, minutes, etc.
  valuesInt?: number[]; // To support multiple columns
  valueSec?: number; // seconds (if TIME)
  valuesSec?: number[]; // To support multiple columns
  unit?: WorkoutSetUnit;
  units?: WorkoutSetUnit[]; // Pour supporter plusieurs colonnes
  completed: boolean;
}

export interface WorkoutSessionExercise extends ExerciseWithAttributes {
  id: string;
  order: number;
  sets: WorkoutSet[];
}
