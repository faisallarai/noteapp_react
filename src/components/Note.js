import React from 'react'
import Button from './Button'

const Note = ({note, toggleImportant, deleteNote}) => {

    return(
        <tr>
            <td>{note.id}</td>
            <td>{note.title}</td>
            <td>{note.important ? 'important' : 'not important'}</td>
            <td><Button text={'X'} handleClick={() => deleteNote(note.id)} /></td>
            <td><Button text={'toggle'} handleClick={() => toggleImportant(note.id)} /></td>
        </tr>
    )
}

export default Note