"use server";

import { z } from "zod";

import { workoutSessionStatuses } from "@/shared/lib/workout-session/types/workout-session";
import { prisma } from "@/shared/lib/prisma";
import { actionClient } from "@/shared/api/safe-actions";

// Schéma WorkoutSet
const workoutSetSchema = z.object({
  id: z.string(),
  setIndex: z.number(),
  types: z.array(z.enum(["TIME", "WEIGHT", "REPS", "BODYWEIGHT", "NA"])),
  valueInt: z.number().optional(),
  valuesInt: z.array(z.number()).optional(),
  valueSec: z.number().optional(),
  valuesSec: z.array(z.number()).optional(),
  unit: z.enum(["kg", "lbs"]).optional(),
  units: z.array(z.enum(["kg", "lbs"])).optional(),
  completed: z.boolean(),
});

const workoutSessionExerciseSchema = z.object({
  id: z.string(),
  order: z.number(),
  sets: z.array(workoutSetSchema),
});

const syncWorkoutSessionSchema = z.object({
  session: z.object({
    id: z.string(),
    userId: z.string(),
    startedAt: z.string(),
    endedAt: z.string().optional(),
    exercises: z.array(workoutSessionExerciseSchema),
    status: z.enum(workoutSessionStatuses),
  }),
});

export const syncWorkoutSessionAction = actionClient.schema(syncWorkoutSessionSchema).action(async ({ parsedInput }) => {
  try {
    const { session } = parsedInput;

    const { status, ...sessionData } = session;

    const result = await prisma.workoutSession.upsert({
      where: { id: session.id },
      create: {
        ...sessionData,
        exercises: {
          create: session.exercises.map((exercise) => ({
            order: exercise.order,
            exercise: { connect: { id: exercise.id } },
            sets: {
              create: exercise.sets.map((set) => ({
                setIndex: set.setIndex,
                types: set.types,
                valueInt: set.valueInt,
                valuesInt: set.valuesInt,
                valueSec: set.valueSec,
                valuesSec: set.valuesSec,
                unit: set.unit,
                units: set.units,
                completed: set.completed,
                type: set.types && set.types.length > 0 ? set.types[0] : "NA",
              })),
            },
          })),
        },
      },
      update: {
        startedAt: sessionData.startedAt,
        endedAt: sessionData.endedAt,
        userId: sessionData.userId,
        // 1. Supprimer les exercices existants (et donc les sets en cascade)
        exercises: {
          deleteMany: {},
          create: session.exercises.map((exercise) => ({
            order: exercise.order,
            exercise: { connect: { id: exercise.id } },
            sets: {
              create: exercise.sets.map((set) => ({
                setIndex: set.setIndex,
                types: set.types,
                valueInt: set.valueInt,
                valuesInt: set.valuesInt,
                valueSec: set.valueSec,
                valuesSec: set.valuesSec,
                unit: set.unit,
                units: set.units,
                completed: set.completed,
                type: set.types && set.types.length > 0 ? set.types[0] : "NA",
              })),
            },
          })),
        },
      },
    });

    return { data: result };
  } catch (error) {
    console.error("Error syncing workout session:", error);
    return { serverError: "Failed to sync workout session" };
  }
});
