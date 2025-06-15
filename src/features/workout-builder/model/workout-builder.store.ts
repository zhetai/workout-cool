import { create } from "zustand";
import { ExerciseAttributeValueEnum, WorkoutSessionExercise } from "@prisma/client";

import { WorkoutBuilderStep } from "../types";
import { getExercisesAction } from "./get-exercises.action";

interface WorkoutBuilderState {
  currentStep: WorkoutBuilderStep;
  selectedEquipment: ExerciseAttributeValueEnum[];
  selectedMuscles: ExerciseAttributeValueEnum[];
  // Exercices (groupés par muscle)
  exercisesByMuscle: any[];
  isLoadingExercises: boolean;
  exercisesError: any;
  exercisesOrder: string[];

  // Actions
  setStep: (step: WorkoutBuilderStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  toggleEquipment: (equipment: ExerciseAttributeValueEnum) => void;
  clearEquipment: () => void;
  toggleMuscle: (muscle: ExerciseAttributeValueEnum) => void;
  clearMuscles: () => void;
  fetchExercises: () => Promise<void>;
  setExercisesOrder: (order: string[]) => void;
  loadFromSession: (params: {
    equipment: ExerciseAttributeValueEnum[];
    muscles: ExerciseAttributeValueEnum[];
    exercisesByMuscle: {
      muscle: ExerciseAttributeValueEnum;
      exercises: WorkoutSessionExercise[];
    }[];
    exercisesOrder: string[];
  }) => void;
}

export const useWorkoutBuilderStore = create<WorkoutBuilderState>((set, get) => ({
  currentStep: 1 as WorkoutBuilderStep,
  selectedEquipment: [],
  selectedMuscles: [],
  exercisesByMuscle: [],
  isLoadingExercises: false,
  exercisesError: null,
  exercisesOrder: [],

  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 3) as WorkoutBuilderStep })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) as WorkoutBuilderStep })),

  toggleEquipment: (equipment) =>
    set((state) => ({
      selectedEquipment: state.selectedEquipment.includes(equipment)
        ? state.selectedEquipment.filter((e) => e !== equipment)
        : [...state.selectedEquipment, equipment],
    })),
  clearEquipment: () => set({ selectedEquipment: [] }),

  toggleMuscle: (muscle) =>
    set((state) => ({
      selectedMuscles: state.selectedMuscles.includes(muscle)
        ? state.selectedMuscles.filter((m) => m !== muscle)
        : [...state.selectedMuscles, muscle],
    })),
  clearMuscles: () => set({ selectedMuscles: [] }),

  fetchExercises: async () => {
    set({ isLoadingExercises: true, exercisesError: null });
    try {
      const { selectedEquipment, selectedMuscles } = get();
      const result = await getExercisesAction({
        equipment: selectedEquipment,
        muscles: selectedMuscles,
        limit: 3,
      });
      if (result?.serverError) {
        throw new Error(result.serverError);
      }
      set({ exercisesByMuscle: result?.data || [], isLoadingExercises: false });
    } catch (error) {
      set({ exercisesError: error, isLoadingExercises: false });
    }
  },

  setExercisesOrder: (order) => set({ exercisesOrder: order }),

  loadFromSession: ({ equipment, muscles, exercisesByMuscle, exercisesOrder }) => {
    set({
      selectedEquipment: equipment,
      selectedMuscles: muscles,
      exercisesByMuscle,
      exercisesOrder,
      currentStep: 3,
      isLoadingExercises: false,
      exercisesError: null,
    });
  },
}));
