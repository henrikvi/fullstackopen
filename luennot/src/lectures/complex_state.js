import React, { useState } from 'react'
import Button from '../components/Button'


const ComplexState = (props) => {

    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setLeft(left + 1)
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setRight(right + 1)
    }

    return (
        <div className = "content">
            <div>
                <p>Left: {left}</p>
                <p>Right: {right}</p>
                <History allClicks = {allClicks}/>
            </div>
            <div>
                <Button onClick = {handleLeftClick} label = "left"/>
                <Button onClick = {handleRightClick} label = "right"/>
            </div>
        </div>
    )
}

const History = ({allClicks}) => {
    if (allClicks.length === 0){
        return (
            <p>Click the buttons maaaan!</p>
        )
    }

    return (
        <p>Clicked buttons: {allClicks.join(' ')}</p>
    )
}

export default ComplexState;