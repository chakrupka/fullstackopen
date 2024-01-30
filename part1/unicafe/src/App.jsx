import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Header = (props) => <h1>{props.text}</h1>

const StatisticLine = (props) => {
  switch (props.text) {
    case 'positive':
      return (
        <tr>
          <td>{props.text}</td>
          <td>{props.value} %</td>
        </tr>
      )
    default:
      return (
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      )
  }
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all) * 100

  if (all) {
    return (
      <div>
          <table>
            <tbody>
              <StatisticLine text='good' value={good} />
              <StatisticLine text='neutral' value={neutral} />
              <StatisticLine text='bad' value={bad} />
              <StatisticLine text='all' value={all} />
              <StatisticLine text='average' value={average} />
              <StatisticLine text='positive' value={positive} />
            </tbody>
          </table>
      </div>
      )
  } else {
    return (
      <div>
        <p>No feedback yet</p>
      </div>
    )
  }


}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementValue = (props) => {
    props.setValue(props.newValue)
  }

  return (
    <div>
      <Header text='give feedback'/>
      <Button onClick={() => incrementValue({newValue: good + 1, setValue: setGood})} text='good'/>
      <Button onClick={() => incrementValue({newValue: neutral + 1, setValue: setNeutral})} text='neutral'/>
      <Button onClick={() => incrementValue({newValue: bad + 1, setValue: setBad})} text='bad'/>
      <Header text='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App