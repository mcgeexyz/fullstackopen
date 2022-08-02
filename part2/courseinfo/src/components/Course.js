const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ sum }) => <p>Total of {sum} exercises</p>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map(({ id, name, exercises }) => (
      <Part key={id} name={name} exercises={exercises} />
    ))}
  </div>
);

const Course = ({ course: { name, parts } }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total sum={totalExercises} />
    </div>
  );
};

export default Course;
