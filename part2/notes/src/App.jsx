import { useState, useEffect } from "react"
import Note from "./components/Note"
import noteService from "./services/notes"
import Notification from "./components/Notification"

const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2024
      </em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [notif, setNotif] = useState({ message: null, type: null })

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [])

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      // .then((returnedNote) => {
      //   setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      // })
      // .catch(() => {
      //   setNotif({
      //     message: `Note '${note.content}' was already removed from server`,
      //     type: "error",
      //   })
      //   setTimeout(() => setMessage(null), 5000)
      //   setNotes(notes.filter((n) => n.id !== id))
      // })
      .catch((error) => {
        setNotif({
          message: `This feature is disabled`,
          type: "error",
        })
      })
  }

  const addNote = (event) => {
    event.preventDefault()
    const isImportant = Math.random() < 0.5
    console.log(isImportant)
    const noteObject = {
      content: newNote,
      important: isImportant,
    }

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
      setNotif({ message: `Added note to server`, type: "success" })
      setNewNote("")
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  if (!notes) {
    return null
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={notif.message} type={notif.type} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App
