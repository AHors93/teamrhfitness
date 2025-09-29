import type { Exercise } from '../services/api';

interface ExerciseListProps {
  exercises: Exercise[];
  muscleName: string;
  count: number;
}

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

export const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, muscleName, count }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Exercises for {muscleName}
        </h2>
        <p className="text-gray-600">
          Found {count} exercise{count !== 1 ? 's' : ''} targeting {muscleName}
        </p>
      </div>

      {exercises.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🏋️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No exercises found</h3>
          <p className="text-gray-600">Try searching for a different muscle group.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exercises.map((exercise, index) => (
            <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, index }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
            {index + 1}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {exercise.name}
          </h3>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
          <p className="text-sm text-gray-600">
            {exercise.description}
          </p>
        </div>

        {exercise.otherMuscleNames.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Other muscles trained</h4>
            <div className="flex flex-wrap gap-1">
              {exercise.otherMuscleNames.map((muscleName, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {muscleName}
                </span>
              ))}
            </div>
          </div>
        )}

        {exercise.otherMuscleNames.length === 0 && (
          <div className="text-sm text-gray-500 italic">
            No secondary muscles targeted
          </div>
        )}
      </div>
    </div>
  );
};
