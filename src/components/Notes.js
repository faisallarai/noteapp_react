import React from 'react'
import Note from './Note'
import noteService from '../services/notes'

const Notes = ({notes, showAll, setNotes}) => {
    // Creating a new note based on showAll
    const newNotes = showAll ? notes : notes.filter(note => note.important)
    

    const toggleImportant = (note_id) => {
        const newNote = notes.find(n => n.id === note_id)
        const changedNote = {...newNote, important: !newNote.important}
        noteService.update(note_id, changedNote).then(returnedNote => {
            const newNotes = notes.map(note => note.id !== note_id ? note : returnedNote)
            setNotes(newNotes)
        }).catch(errror => {
            console.log(errror.message)
        })
    }

    const deleteNote = (note_id) => {
        const note = notes.find(n => n.id === note_id)
        if(window.confirm(`Delete ${note.title} ?`)){
            noteService.remove(note_id).then(returnedNote => {
                setNotes(notes.filter(n => n.id !== note_id))
            }).catch(error => {
                console.log(error)
            })   
        }
             
    }

    const row = () => newNotes.map(note => <Note key={note.id} note={note} deleteNote={() => deleteNote(note.id)} toggleImportant={() => toggleImportant(note.id)} />)

    return(
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                {row()}
            </tbody>
        </table>
    )
}

export default Notes