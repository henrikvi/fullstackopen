import React from 'react'
import Button from './Button'

const Note = ({note, toggleImportance}) => {

    const label = note.important ?
        'Make not important' : 'Make important'

    return (
        <li>{note.content} <Button onClick = {toggleImportance} label = {label} /></li>
    )
}

export default Note