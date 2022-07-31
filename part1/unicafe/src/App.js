import { useState } from 'react';

const List = ({ title, items }) => {
  return (
    <div>
      <h2>{title}</h2>
      <ul>{items}</ul>
    </div>
  );
};

const Feedback = ({ ratings, handleClick }) => {
  const btnElements = Object.entries(ratings).map(([name]) => {
    return (
      <li key={name}>
        <button onClick={handleClick(name)}>{name}</button>
      </li>
    );
  });

  return <List title="Give Feedback" items={btnElements} />;
};

const Statistics = ({ ratings }) => {
  const statElements = Object.entries(ratings).map(([name, count]) => {
    return (
      <li key={name}>
        {name}: {count}
      </li>
    );
  });

  return <List title="Statistics" items={statElements} />;
};

const App = () => {
  const [ratings, setRatings] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleClick = (rating) => {
    return () => {
      setRatings((prevState) => {
        return {
          ...prevState,
          [rating]: ratings[rating] + 1,
        };
      });
    };
  };

  return (
    <>
      <Feedback ratings={ratings} handleClick={handleClick} />
      <Statistics ratings={ratings} />
    </>
  );
};

export default App;
