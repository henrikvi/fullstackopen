import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const getHandler = (currentState, updater) => () => {
    updater(currentState + 1)
  }

  return (
    <div className="content">
      <div>
        <h1>Give feedback</h1>
      </div>
      <div>
        <Button onClick={getHandler(good, setGood)} label="Good" />
        <Button onClick={getHandler(neutral, setNeutral)} label="Neutral" />
        <Button onClick={getHandler(bad, setBad)} label="Bad" />
      </div>
      <div>
        <h1>Statistics</h1>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {

  const getCumulative = () => good + neutral + bad

  const getAverage = () => ((good * 1) + (neutral * 0) + (bad * -1)) / getCumulative()

  const getPositivePercentage = () => (good / getCumulative()) * 100 + '%'

  if (!(good || neutral || bad)) {
    return (
      <p>No feedback given.</p>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <Statistic text='Good' value={good} />
          <Statistic text='Neutral' value={neutral} />
          <Statistic text='Bad' value={bad} />
          <Statistic text='All' value={getCumulative()} />
          <Statistic text='Average' value={getAverage()} />
          <Statistic text='Positive-%' value={getPositivePercentage()} />
        </tbody>
      </table>
    </div>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({ onClick, label }) => {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)