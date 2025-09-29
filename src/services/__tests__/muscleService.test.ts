import { getMuscleId, clearMuscleCache } from '../muscleService';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('muscleService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    clearMuscleCache(); 
  });

  describe('getMuscleId', () => {
    it('should return muscle ID for exact match', async () => {
      const mockResponse = {
        data: {
          results: [
            { id: 1, name: 'Biceps brachii' },
            { id: 2, name: 'Triceps brachii' },
            { id: 3, name: 'Quadriceps femoris' }
          ]
        }
      };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getMuscleId('Biceps brachii');
      expect(result).toBe(1);
    });

    it('should return muscle ID for case-insensitive exact match', async () => {
      const mockResponse = {
        data: {
          results: [
            { id: 1, name: 'Biceps brachii' },
            { id: 2, name: 'Triceps brachii' }
          ]
        }
      };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getMuscleId('biceps brachii');
      expect(result).toBe(1);
    });

    it('should return muscle ID for partial match', async () => {
      const mockResponse = {
        data: {
          results: [
            { id: 1, name: 'Biceps brachii' },
            { id: 2, name: 'Triceps brachii' }
          ]
        }
      };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getMuscleId('biceps');
      expect(result).toBe(1);
    });

    it('should return null when no match found', async () => {
      const mockResponse = {
        data: {
          results: [
            { id: 1, name: 'Biceps brachii' },
            { id: 2, name: 'Triceps brachii' }
          ]
        }
      };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getMuscleId('nonexistent');
      expect(result).toBeNull();
    });

    it('should handle API errors', async () => {
      mockedAxios.get.mockRejectedValue(new Error('API Error'));

      await expect(getMuscleId('biceps')).rejects.toThrow('API Error');
    });
  });
});
