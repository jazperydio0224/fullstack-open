import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticLine = (props) => {
  return (
    <>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </>
  );
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (!good && !neutral && !bad) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  }
  return (
    <table>
      <tbody>
        <tr>
          <StatisticLine text="good" value={good} />
        </tr>
        <tr>
          <StatisticLine text="neutral" value={neutral} />
        </tr>
        <tr>
          <StatisticLine text="bad" value={bad} />
        </tr>
        <tr>
          <StatisticLine text="all" value={all} />
        </tr>
        <tr>
          <StatisticLine text="average" value={average} />
        </tr>
        <tr>
          <StatisticLine text="positive" value={positive} />
        </tr>
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGoodFeedback = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    const updatedAll = updatedGood + neutral + bad;
    setAll(updatedAll);
    setAverage((updatedGood * 1 + neutral * 0 + bad * -1) / updatedAll);
    setPositive(updatedGood / updatedAll);
  };

  const handleNeutralFeedback = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    const updatedAll = updatedNeutral + good + bad;
    setAll(updatedAll);
    setAverage((good * 1 + updatedNeutral * 0 + bad * -1) / updatedAll);
    setPositive(good / updatedAll);
  };

  const handleBadFeedback = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    const updatedAll = updatedBad + good + neutral;
    setAll(updatedAll);
    setAverage((good * 1 + neutral * 0 + updatedBad * -1) / updatedAll);
    setPositive(good / updatedAll);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodFeedback} text="good" />
      <Button handleClick={handleNeutralFeedback} text="neutral" />
      <Button handleClick={handleBadFeedback} text="bad" />
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
