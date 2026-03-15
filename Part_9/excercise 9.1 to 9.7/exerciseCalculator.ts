interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(
  dailyExercises: number[],
  target: number,
): ExerciseResult {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter((day) => day > 0).length;
  const average = dailyExercises.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "Great job! You've met your target.";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better.';
  } else {
    rating = 1;
    ratingDescription = 'bad';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

export default calculateExercises;

if (require.main === module) {
  const args = process.argv;

  if (args.length < 4) {
    console.log('Usage: npm run calculateExercises <daily-exercises> <target>');
    process.exit(1);
  }

  const dailyExercises = args.slice(3, args.length).map(Number);
  const target = Number(args[2]);

  console.log(calculateExercises(dailyExercises, target));
}
