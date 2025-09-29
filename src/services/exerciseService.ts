import axios from "axios";
import { Exercise, ApiResponse } from "../types/api";

const API_BASE = "https://wger.de/api/v2";

export async function getExercisesByMuscle(muscleId: number): Promise<Exercise[]> {
  const res = await axios.get<ApiResponse<Exercise>>(`${API_BASE}/exercise/`, {
    params: { muscles: muscleId, language: 2 }
  });

  // The WGER API doesn't return exercise names/descriptions directly
  // We'll enhance the data with placeholder information and focus on the muscle relationships
  const enhancedExercises = res.data.results.map((exercise) => ({
    ...exercise,
    name: `Exercise ${exercise.id}`,
    description: `This exercise targets muscle groups: ${exercise.muscles.join(', ')}${exercise.muscles_secondary.length > 0 ? ` and secondary muscles: ${exercise.muscles_secondary.join(', ')}` : ''}`
  }));

  return enhancedExercises;
}
