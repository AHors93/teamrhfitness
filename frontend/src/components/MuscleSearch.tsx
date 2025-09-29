import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type { Muscle } from '../services/api';

interface MuscleSearchProps {
  onSearch: (muscleName: string) => void;
  isLoading: boolean;
}

export const MuscleSearch: React.FC<MuscleSearchProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Muscle[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [muscles, setMuscles] = useState<Muscle[]>([]);

  useEffect(() => {
    apiService.getMuscles()
      .then(setMuscles)
      .catch(console.error);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 0) {
      const filtered = muscles.filter(muscle =>
        muscle.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (muscle: Muscle) => {
    setQuery(muscle.name);
    setShowSuggestions(false);
    onSearch(muscle.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const popularMuscles = ['biceps', 'triceps', 'chest', 'lats', 'shoulders', 'quads', 'hamstrings', 'abs'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label htmlFor="muscle-search" className="block text-sm font-medium text-gray-700 mb-2">
            Search for a muscle group
          </label>
          <input
            id="muscle-search"
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => query.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="e.g., biceps, triceps, chest..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
              {suggestions.map((muscle) => (
                <button
                  key={muscle.id}
                  type="button"
                  onClick={() => handleSuggestionClick(muscle)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                >
                  <div className="font-medium text-gray-900">{muscle.name}</div>
                  {muscle.name_en && (
                    <div className="text-sm text-gray-500">{muscle.name_en}</div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </div>
          ) : (
            'Find Exercises'
          )}
        </button>
      </form>

      <div className="mt-6">
        <p className="text-sm text-gray-600 mb-3">Popular muscle groups:</p>
        <div className="flex flex-wrap gap-2">
          {popularMuscles.map((muscle) => (
            <button
              key={muscle}
              onClick={() => {
                setQuery(muscle);
                onSearch(muscle);
              }}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full"
              disabled={isLoading}
            >
              {muscle}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
