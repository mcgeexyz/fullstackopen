import { useState } from 'react';

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const avg = all > 0 ? (good - bad) / all : 0;
  const pos = all > 0 ? good / all : 0;

  return (
    <div>
      <h2>Statistics</h2>
      {all > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <StatisticLine name="Good" value={good} />
            <StatisticLine name="Neutral" value={neutral} />
            <StatisticLine name="Bad" value={bad} />
            <StatisticLine name="All" value={all} />
            <StatisticLine name="Average" value={avg.toFixed(1)} />
            <StatisticLine name="Positive" value={pos.toFixed(1) + '%'} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const StatisticLine = ({ name, value }) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
);

const Button = ({ handleClick, name }) => (
  <button onClick={handleClick}>{name}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button name="Good" handleClick={() => setGood(good + 1)} />
      <Button name="Neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button name="Bad" handleClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
