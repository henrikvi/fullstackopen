import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

    const getAnecdote = (min, max) => () => {
        setSelected(Math.floor(Math.random() * (max - min + 1)) + min)
    }

    const getMaxValueIndex = (votes) => {
        const index = votes.reduce((maxIndex, currentValue, currentIndex, votes) => currentValue > votes[maxIndex] ? currentIndex : maxIndex, 0)

        return index
    }

    const vote = () => () => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
    }

    return (
        <div className='content'>
            <div>
                <Anecdote index = {selected} votes = {votes} />
            </div>
            <div>
                <Button onClick = {getAnecdote(0, anecdotes.length - 1)} label = 'Next anecdote'/>
                <Button onClick = {vote()} label = 'Vote this anecdote'/>
            </div>
            <div>
                <Anecdote index = {getMaxValueIndex(votes)} votes = {votes} />
            </div>
        </div>
    )
}

const Button = ({ onClick, label }) => {
    return (
        <button onClick={onClick}>
            {label}
        </button>
    )
}

const Anecdote = ({index, votes}) => {
    return (
        <>
            <p>{anecdotes[index]}</p>
            <p>which has {votes[index]} votes!</p>
        </>
    )
}

const anecdotes = [
    'If he dies, he dies',
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)