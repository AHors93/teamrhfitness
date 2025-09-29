import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { apiService } from './services/api';
import type { ExerciseResponse } from './services/api';
import { Header } from './components/Header';
import { MuscleSearch } from './components/MuscleSearch';
import { ExerciseList } from './components/ExerciseList';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [exercises, setExercises] = useState<ExerciseResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMuscleSearch = async (muscleName: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await apiService.getExercisesByMuscle(muscleName);
      setExercises(result);
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to fetch exercises');
      setExercises(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Exercise Finder
              </h1>
              <p className="text-lg text-gray-600">
                Find exercises that target specific muscle groups using the WGER API
              </p>
            </div>

            <MuscleSearch onSearch={handleMuscleSearch} isLoading={isLoading} />

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Error
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      {error}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {exercises && (
              <ExerciseList 
                exercises={exercises.exercises} 
                muscleName={exercises.muscle.name}
                count={exercises.count}
              />
            )}
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;