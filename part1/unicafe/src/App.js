import { useState } from 'react';

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const avg = all > 0 ? (good - bad) / all : 0;
  const pos = all > 0 ? good / all : 0;

  return (
    <div>
      <h2>Statistics</h2>
      {all > 0 ? (
        <ul>
          <li>Good: {good}</li>
          <li>Neutral: {neutral}</li>
          <li>Bad: {bad}</li>
          <li>All: {all}</li>
          <li>Average: {avg.toFixed(3)}</li>
          <li>Positive: {pos.toFixed(3)}</li>
        </ul>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>Give Feedback</h2>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
