import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Notes from './components/Notes'
import Header from './components/Header'
import Button from './components/Button'
import Form from './components/Form'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {

  const [notes, setNotes] = useState([])
  const [note, setNote] = useState('a new note')
  const [showAll, setShowAll] = useState(true)
  const [messages, setMessages] = useState([])

  useEffect(() =>{
    noteService.getAll().then(returnedNotes => {
      setNotes(returnedNotes)
    }).catch(errorr => {
      const newMessage = {
        error: errorr.message,
        success: ''
      }
      setMessages(messages.concat(newMessage))
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
      const newMessage = {
        error: '',
        success: `${newNote.title} has been added to the list`
      }
      setMessages(messages.concat(newMessage))
      setTimeout(() => {
        setMessages([])
      },3000)
    }).catch(errorr => {
      const newMessage = {
        error: errorr.message,
        success: ''
      }
      setMessages(messages.concat(newMessage))
      setTimeout(() => {
        setMessages([])
      },3000)
    })
  }

  return(
    <div>
      <Header title={'Notes'} />
      <Notification messages={messages} />
      <Button handleClick={handleClick} text="showAll" />
      <Notes notes={notes} showAll={showAll} setNotes={setNotes} />
      <Form handleSubmit={handleSubmit} handleNoteChange={handleNoteChange} note={note} />
      <Footer />
    </div>
  )
}
export default App;
