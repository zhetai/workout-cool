import { WorkoutStepper } from "@/features/workout-builder";

export default function TestStepperPage() {
  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Workout Builder Test</h1>
        <WorkoutStepper />
      </div>
    </div>
  );
}
