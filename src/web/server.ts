import express from 'express';
import cors from 'cors';
import path from 'path';
import { getMuscleId, getMuscleNameById, getAllMuscles } from '../services/muscleService';
import { getExercisesByMuscle } from '../services/exerciseService';
import { formatExerciseWithMuscleNames } from '../utils/format';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get all muscles
app.get('/api/muscles', async (req, res) => {
  try {
    const muscles = await getAllMuscles();
    res.json(muscles);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Search muscles
app.get('/api/muscles/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const muscleId = await getMuscleId(q);
    if (!muscleId) {
      return res.status(404).json({ error: `Muscle "${q}" not found` });
    }

    const muscleName = await getMuscleNameById(muscleId);
    res.json({ id: muscleId, name: muscleName });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Get exercises by muscle
app.get('/api/exercises', async (req, res) => {
  try {
    const { muscle } = req.query;
    if (!muscle || typeof muscle !== 'string') {
      return res.status(400).json({ error: 'Query parameter "muscle" is required' });
    }

    const muscleId = await getMuscleId(muscle);
    if (!muscleId) {
      return res.status(404).json({ error: `Muscle "${muscle}" not found` });
    }

    const exercises = await getExercisesByMuscle(muscleId);
    const formatted = await Promise.all(
      exercises.map(exercise => formatExerciseWithMuscleNames(exercise))
    );

    res.json({
      muscle: { id: muscleId, name: await getMuscleNameById(muscleId) },
      exercises: formatted,
      count: formatted.length
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// React app for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
});
