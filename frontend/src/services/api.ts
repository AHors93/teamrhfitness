import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export interface Muscle {
  id: number;
  name: string;
  name_en?: string;
  is_front: boolean;
  image_url_main: string;
  image_url_secondary: string;
}

export interface Exercise {
  id: number;
  name: string;
  description: string;
  otherMuscles: number[];
  otherMuscleNames: string[];
}

export interface ExerciseResponse {
  muscle: {
    id: number;
    name: string;
  };
  exercises: Exercise[];
  count: number;
}

export const apiService = {
  // Gets all muscles
  async getMuscles(): Promise<Muscle[]> {
    const response = await api.get<Muscle[]>('/muscles');
    return response.data;
  },

  // Searches for a muscle by name
  async searchMuscle(query: string): Promise<{ id: number; name: string }> {
    const response = await api.get<{ id: number; name: string }>('/muscles/search', {
      params: { q: query }
    });
    return response.data;
  },

  // Gets exercises by muscle
  async getExercisesByMuscle(muscle: string): Promise<ExerciseResponse> {
    const response = await api.get<ExerciseResponse>('/exercises', {
      params: { muscle }
    });
    return response.data;
  },

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await api.get<{ status: string; timestamp: string }>('/health');
    return response.data;
  }
};
