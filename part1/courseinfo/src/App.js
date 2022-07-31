const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  const Header = (props) => <h1>{props.title}</h1>;

  const Content = (props) => (
    <h2>
      {props.description}: {props.exerciseCount} exercises
    </h2>
  );

  const Total = (props) => <h2>Total number of exercises: {props.total}</h2>;

  return (
    <>
      <Header title={course} />
      <Content description={part1} exerciseCount={exercises1} />
      <Content description={part2} exerciseCount={exercises2} />
      <Content description={part3} exerciseCount={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </>
  );
};

export default App;
