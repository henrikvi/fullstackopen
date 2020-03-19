import React, { useState } from 'react'
import Button from '../components/Button'

const SimpleState = (props) => {
    
    const [ counter, setCounter ] = useState(0)

    // tässä setToValue siis palauttaa (return) setToCounter-funktion jolle on muualla määritelty value
    // koska setToValue on "kompakti" niin se voidaan kirjoittaa yhdelle riville nuolifunktiona
    const setToValue = (value) => () => {
        setCounter (value)
    }

    return (
        <div className = "content">
            <Display counter = {counter}/>
            <div>
                <Button onClick = {setToValue(counter + 1)} label = "Plus"/>
                <Button onClick = {setToValue(counter - 1)} label = "Minus"/>
                <Button onClick = {setToValue(0)} label = "Reset"/>
            </div>
        </div>
    )
}

const Display = ({counter}) => <div>{counter}</div>

export default SimpleState;