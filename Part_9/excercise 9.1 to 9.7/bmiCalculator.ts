function calculateBmi(height: number, weight: number): string {
  const bmi = (weight / (height * height)) * 10000;

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal range';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
}

export default calculateBmi;

if (require.main === module) {
  const args = process.argv;

  if (args.length < 4) {
    console.log('Usage: npm run calculateBmi <height> <weight>');
    process.exit(1);
  }

  const height = Number(args[2]);
  const weight = Number(args[3]);
  console.log(calculateBmi(height, weight));
}
