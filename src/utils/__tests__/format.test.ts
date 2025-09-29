import { formatExercise } from '../format';
import { Exercise } from '../../types/api';

describe('format', () => {
  describe('formatExercise', () => {
    const createMockExercise = (overrides: Partial<Exercise> = {}): Exercise => ({
      id: 1,
      name: 'Bicep Curl',
      description: 'A basic bicep exercise',
      muscles: [1],
      muscles_secondary: [2, 3],
      equipment: [1],
      category: 1,
      language: 2,
      license: 1,
      license_author: 'Test Author',
      images: [],
      comments: [],
      variations: [],
      ...overrides
    });

    it('should format exercise with all fields', () => {
      const exercise = createMockExercise({
        name: 'Bicep Curl',
        description: 'A basic bicep exercise',
        muscles_secondary: [2, 3]
      });

      const result = formatExercise(exercise);
      expect(result).toEqual({
        name: 'Bicep Curl',
        description: 'A basic bicep exercise',
        otherMuscles: [2, 3]
      });
    });

    it('should handle missing description', () => {
      const exercise = createMockExercise({
        name: 'Bicep Curl',
        description: undefined,
        muscles_secondary: [2]
      });

      const result = formatExercise(exercise);
      expect(result).toEqual({
        name: 'Bicep Curl',
        description: 'No description provided.',
        otherMuscles: [2]
      });
    });

    it('should handle empty secondary muscles', () => {
      const exercise = createMockExercise({
        name: 'Bicep Curl',
        description: 'A basic bicep exercise',
        muscles_secondary: []
      });

      const result = formatExercise(exercise);
      expect(result).toEqual({
        name: 'Bicep Curl',
        description: 'A basic bicep exercise',
        otherMuscles: []
      });
    });

    it('should handle null secondary muscles', () => {
      const exercise = createMockExercise({
        name: 'Bicep Curl',
        description: 'A basic bicep exercise',
        muscles_secondary: null as any
      });

      const result = formatExercise(exercise);
      expect(result).toEqual({
        name: 'Bicep Curl',
        description: 'A basic bicep exercise',
        otherMuscles: []
      });
    });
  });
});
