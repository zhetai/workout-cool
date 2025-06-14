"use client";

import { useSyncWorkoutSessions } from "../model/use-sync-workout-sessions";

export const WorkoutSessionsSynchronizer = () => {
  const { isSyncing, syncSessions } = useSyncWorkoutSessions();

  if (isSyncing) {
    return <div>Synchronizing...</div>;
  }

  return <button onClick={() => syncSessions()}>Sync</button>;
};
