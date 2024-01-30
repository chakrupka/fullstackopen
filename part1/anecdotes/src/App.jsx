import { useState } from 'react'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const Anecdote = ({anecdote}) => <p>{anecdote}</p>

const VoteCount = (props) => <p>has {props.votes[props.anecdoteNum]} votes</p>

const MostVotes = (props) => {
  let mostVotes = 0
  for (let i = 0; i < props.votes.length; i++)
    if (props.votes[i] > props.votes[mostVotes])
      mostVotes = i

  return (
    <div>
      <Anecdote anecdote={props.anecdotes[mostVotes]} />
      <VoteCount votes={props.votes} anecdoteNum={mostVotes} />
    </div>
  )
  
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))   
  const [selected, setSelected] = useState(0)

  const selectRandom = (prev) => {
    let next = Math.floor(Math.random() * anecdotes.length)
    while (next === prev) 
      next = Math.floor(Math.random() * anecdotes.length)
    setSelected(next)
  }

  const addVote = (anecdoteNum) => {
    const copy = [...votes]
    copy[anecdoteNum] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} />
      <VoteCount votes={votes} anecdoteNum={selected} />
      <Button onClick={() => addVote(selected)} text='vote'/>
      <Button onClick={() => selectRandom(selected)} text='get new'/>
      <h1>Anecdote with most votes</h1>
      <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App