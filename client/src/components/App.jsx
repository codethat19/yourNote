//jshint esversion:8
import React, { useState, useEffect } from "react";
import Header from "./Header";
// import Footer from "./Footer";
// import NoteRender from "./NoteRender";
import CreateArea from "./CreateArea";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DeletedNotes from "./DeletedNotes";
import Notes from "./Notes";
import ArchivedNotes from "./ArchivedNotes";
import api from "./axios";

function App() {
  const [notes, setNotes] = useState([]);

  const viewNotes = async () => {
    // const flag = JSON.stringify( setFlag );
    //console.log();
    //setNoteFlag();
    await api.get('/view')
    .then(res => {
      setNotes(res.data);
      //console.log(res.data);
    })
    .catch( error => {
      console.log(error);
    });
  };

  useEffect( () => {
    viewNotes();
  },[]);
  // const viewDeletedNotes = async (note) => {
  //   await axios.get('/deletedNotes')
  //     .then(res => {
  //       // console.log(res.data)
  //       setNotes(res.data);
  //     })
  //     .catch( error => {
  //       console.log(error);
  //     });
  // }
  const addNote = async (note) => {

    if(note.title !== "" && note.content !== "") {

      const newNote = JSON.stringify( note );
        await api.post('/addNote', newNote)
        .then(response => {
          viewNotes();
        })
        .catch( error => {
          console.log(error);
        });
    } else {
      axios.get('/view');
    }
  };



  return (

    <>
    <Router>
      <Routes>
        <Route path='/view' element={
          <>
            <Header title={"yourNote"}/>
            <CreateArea onAdd={addNote} />
            <Notes notes={notes} setNotes={setNotes} />
            {/*<Footer />*/}
          </>
        }/>

        <Route path='/deleted' element={
          <>
            <Header title={"Deleted Notes"}/>
            <DeletedNotes notes={notes} setNotes={setNotes} />
            {/* <Footer />          */}
            </>
        }/>
        <Route path='/archived' element={
          <>
            <Header title={"Archived Notes"}/>
            <ArchivedNotes notes={notes} setNotes={setNotes} />
            {/* <Footer /> */}
          </>
        }/>
        <Route path='*' element={
          <>
            <Header title={"yourNote"}/>
            <CreateArea onAdd={addNote} />
            <Notes notes={notes} setNotes={setNotes} />
            {/* <Footer /> */}
          </>
        }/>
      </Routes>
    </Router>
      {/* <Footer /> */}
    </>

  );
}

export default App;
