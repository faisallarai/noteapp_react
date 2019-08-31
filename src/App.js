import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Notes from './components/Notes'
import Header from './components/Header'
import Button from './components/Button'
import Form from './components/Form'
import noteService from './services/notes'

const App = () => {

  const [notes, setNotes] = useState([])
  const [note, setNote] = useState('a new note')
  const [showAll, setShowAll] = useState(true)

  useEffect(() =>{
    noteService.getAll().then(returnedNotes => {
      setNotes(returnedNotes)
    })
  },[])

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNote(event.target.value)
  }

  const handleClick = () => {
    const newShowAll = !showAll
    setShowAll(newShowAll)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newNote = {
      title: note,
      date: new Date().toISOString(),
      important: Math.random() * 0.5
    }
    
    if(notes.filter(n => n.title === note).length > 0){
      return alert(`The ${note} already exist`)
    }

    if(newNote.title === ''){
      return alert(`The note cannot be empty`)
    }

    noteService.create(newNote).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNote('')
    })
  }

  return(
    <div>
      <Header title={'Filter'} />
      <Button handleClick={handleClick} text="showAll" />
      <Header title={'Submit Note'} />
      <Form handleSubmit={handleSubmit} handleNoteChange={handleNoteChange} note={note} />
      <Header title={'Note Table'} />
      <Notes notes={notes} showAll={showAll} setNotes={setNotes} />
    </div>
  )
}
export default App;
