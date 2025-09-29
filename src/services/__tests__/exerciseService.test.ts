import { getExercisesByMuscle } from '../exerciseService';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('exerciseService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getExercisesByMuscle', () => {
    it('should return exercises for a given muscle ID', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              id: 1,
              muscles: [1],
              muscles_secondary: [2]
            },
            {
              id: 2,
              muscles: [1],
              muscles_secondary: []
            }
          ]
        }
      };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getExercisesByMuscle(1);
      
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: 1,
        name: 'Exercise 1',
        description: 'This exercise targets muscle groups: 1 and secondary muscles: 2',
        muscles: [1],
        muscles_secondary: [2]
      });
      expect(result[1]).toEqual({
        id: 2,
        name: 'Exercise 2', 
        description: 'This exercise targets muscle groups: 1',
        muscles: [1],
        muscles_secondary: []
      });
      
      expect(mockedAxios.get).toHaveBeenCalledWith('https://wger.de/api/v2/exercise/', {
        params: { muscles: 1, language: 2 }
      });
    });

    it('should handle empty results', async () => {
      const mockResponse = {
        data: {
          results: []
        }
      };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getExercisesByMuscle(999);
      expect(result).toEqual([]);
    });

    it('should handle API errors', async () => {
      mockedAxios.get.mockRejectedValue(new Error('API Error'));

      await expect(getExercisesByMuscle(1)).rejects.toThrow('API Error');
    });
  });
});
