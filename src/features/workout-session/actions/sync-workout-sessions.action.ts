"use server";

import { z } from "zod";

import { workoutSessionStatuses } from "@/shared/lib/workout-session/types/workout-session";
import { prisma } from "@/shared/lib/prisma";
import { actionClient } from "@/shared/api/safe-actions";

// Schéma de validation
const syncWorkoutSessionSchema = z.object({
  session: z.object({
    id: z.string(),
    userId: z.string(),
    startedAt: z.string(),
    endedAt: z.string().optional(),
    exercises: z.array(z.any()), // TODO: define the schema
    status: z.enum(workoutSessionStatuses),
  }),
});

export const syncWorkoutSessionAction = actionClient.schema(syncWorkoutSessionSchema).action(async ({ parsedInput }) => {
  try {
    const { session } = parsedInput;

    const result = await prisma.workoutSession.upsert({
      where: { id: session.id },
      create: {
        ...session,
        exercises: {
          create: session.exercises.map((exercise) => ({
            ...exercise,
            sets: {
              create: exercise.sets,
            },
          })),
        },
      },
      update: {
        ...session,
        exercises: {
          deleteMany: {},
          create: session.exercises.map((exercise) => ({
            ...exercise,
            sets: {
              create: exercise.sets,
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
