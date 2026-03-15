interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const courseParts: CoursePart[] = [
  {
    name: 'Fundamentals',
    exerciseCount: 10,
    description: 'This is an awesome course part',
    kind: 'basic',
  },
  {
    name: 'Using props to pass data',
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: 'group',
  },
  {
    name: 'Basics of type Narrowing',
    exerciseCount: 7,
    description: 'How to go from unknown to string',
    kind: 'basic',
  },
  {
    name: 'Deeper type usage',
    exerciseCount: 14,
    description: 'Confusing description',
    backgroundMaterial:
      'https://type-level-typescript.com/template-literal-types',
    kind: 'background',
  },
  {
    name: 'TypeScript in frontend',
    exerciseCount: 10,
    description: 'a hard part',
    kind: 'basic',
  },
  {
    name: 'Backend development',
    exerciseCount: 21,
    description: 'Typing the backend',
    requirements: ['nodejs', 'jest'],
    kind: 'special',
  },
];

const App = () => {
  const courseName = "Half Stack application development";

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
     <Header courseName={courseName} />
     <Content courseParts={courseParts} />
     <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;

const Header = (props: { courseName: string }) => {
  return <h1>{props.courseName}</h1>;
}

const Content = (props: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {props.courseParts.map(part => (
        <Part key={part.name} {...part} />
      ))}
    </div>
  );
}

const Total = (props: { totalExercises: number }) => {
  return <p>Total number of exercises: {props.totalExercises}</p>;
}

const Part = (props: CoursePart) => {
  switch (props.kind) {
    case "basic":
      return (
        <div>
          <h3>{props.name} {props.exerciseCount}</h3>
          <p>{props.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>{props.name} {props.exerciseCount}</h3>
          <p>Project exercises {props.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>{props.name} {props.exerciseCount}</h3>
          <p>{props.description}</p>
          <p>Background material: {props.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>{props.name} {props.exerciseCount}</h3>
          <p>{props.description}</p>
          <p>Requirements: {props.requirements.join(', ')}</p>
        </div>
      );
    default:
      return assertNever(props);
  }
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}