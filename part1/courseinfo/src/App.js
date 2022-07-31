const App = () => {
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  };

  const Header = (props) => <h1>{props.title}</h1>;

  const Content = () => (
    <div>
      <Part content={part1} />
      <Part content={part2} />
      <Part content={part3} />
    </div>
  );

  const Part = (props) => (
    <h3>
      {props.content.name}: {props.content.exercises} exercises
    </h3>
  );

  const Total = (props) => <h2>Total number of exercises: {props.total}</h2>;

  return (
    <div>
      <Header title={course} />
      <Content />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
};

export default App;
