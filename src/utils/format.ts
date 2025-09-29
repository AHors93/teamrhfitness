import { Exercise, FormattedExercise } from "../types/api";
import { getMuscleNameById } from "../services/muscleService";

export function formatExercise(exercise: Exercise): FormattedExercise {
  return {
    name: exercise.name,
    description: exercise.description || "No description provided.",
    otherMuscles: exercise.muscles_secondary || []
  };
}

export async function formatExerciseWithMuscleNames(exercise: Exercise): Promise<FormattedExercise & { otherMuscleNames: string[] }> {
  const otherMuscleNames = await Promise.all(
    (exercise.muscles_secondary || []).map(id => getMuscleNameById(id))
  );

  return {
    name: exercise.name,
    description: exercise.description || "No description provided.",
    otherMuscles: exercise.muscles_secondary || [],
    otherMuscleNames
  };
}
  