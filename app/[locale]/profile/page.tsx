"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useI18n } from "locales/client";
import { useWorkoutSessionService } from "@/shared/lib/workout-session/use-workout-session.service";
import { WorkoutSessionList } from "@/features/workout-session/ui/workout-session-list";
import { WorkoutSessionHeatmap } from "@/features/workout-session/ui/workout-session-heatmap";
import { useSession } from "@/features/auth/lib/auth-client";
import { LocalAlert } from "@/components/ui/local-alert";
import { Button } from "@/components/ui/button";

import type { WorkoutSession } from "@/shared/lib/workout-session/types/workout-session";

export default function ProfilePage() {
  const router = useRouter();
  const t = useI18n();
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const { getAll } = useWorkoutSessionService();
  const { data: session } = useSession();
  useEffect(() => {
    const loadSessions = async () => {
      const loadedSessions = await getAll();
      setSessions(loadedSessions);
    };
    loadSessions();
  }, []);

  const values: Record<string, number> = {};
  sessions.forEach((session) => {
    const date = session.startedAt.slice(0, 10);
    values[date] = (values[date] || 0) + 1;
  });
  const until =
    sessions.length > 0
      ? sessions.reduce((max, s) => (s.startedAt > max ? s.startedAt : max), sessions[0].startedAt).slice(0, 10)
      : new Date().toISOString().slice(0, 10);

  return (
    <div>
      {!session && <LocalAlert />}
      <WorkoutSessionHeatmap until={until} values={values} />
      <WorkoutSessionList />
      <div className="mt-8 flex justify-center">
        <Button onClick={() => router.push("/")} size="large">
          {t("profile.new_workout")}
        </Button>
      </div>
    </div>
  );
}
