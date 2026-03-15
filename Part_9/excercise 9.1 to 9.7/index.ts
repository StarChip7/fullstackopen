import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('hello fullstack!');
});

app.get('/bmi', (req, res) => {

  try {
    if (!req.query.height || !req.query.weight) {
      throw new Error('malformatted parameters');
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ error: errorMessage });
    return;
  }
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  const bmi = calculateBmi(height, weight);


  res.json({ height, weight, bmi });
});


app.post('/exercises', (req, res) => {

  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const daily_exercises = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const target = req.body.target;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  if (!Array.isArray(daily_exercises) || typeof target !== 'number') {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  for (const exercise of daily_exercises) {
    if (typeof exercise !== 'number') {
      res.status(400).json({ error: 'malformatted parameters' });
      return;
    }
  }

  res.json(calculateExercises(daily_exercises as number[], target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});