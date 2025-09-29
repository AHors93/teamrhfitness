import axios from "axios";
import { Muscle, ApiResponse } from "../types/api";

const API_BASE = "https://wger.de/api/v2";

// Cache for muscle data to avoid repeated API calls
let muscleCache: Muscle[] | null = null;

export async function getMuscleId(muscleName: string): Promise<number | null> {
  const muscles = await getAllMuscles();
  const lower = muscleName.toLowerCase();

  // First try exact match on name
  let match = muscles.find((m: Muscle) => m.name.toLowerCase() === lower);

  // Then try exact match on name_en (English name)
  if (!match) {
    match = muscles.find((m: Muscle) => m.name_en && m.name_en.toLowerCase() === lower);
  }

  // Then try partial match on name
  if (!match) {
    match = muscles.find((m: Muscle) => m.name.toLowerCase().includes(lower));
  }

  // Finally try partial match on name_en
  if (!match) {
    match = muscles.find((m: Muscle) => m.name_en && m.name_en.toLowerCase().includes(lower));
  }

  return match ? match.id : null;
}

export async function getMuscleNameById(muscleId: number): Promise<string> {
  const muscles = await getAllMuscles();
  const muscle = muscles.find(m => m.id === muscleId);
  return muscle ? muscle.name : `Muscle ${muscleId}`;
}

export async function getAllMuscles(): Promise<Muscle[]> {
  if (!muscleCache) {
    const res = await axios.get<ApiResponse<Muscle>>(`${API_BASE}/muscle/`);
    muscleCache = res.data.results;
  }
  return muscleCache;
}

// Added for test helper
export function clearMuscleCache(): void {
  muscleCache = null;
}
