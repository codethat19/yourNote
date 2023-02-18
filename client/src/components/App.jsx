import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
// import NoteRender from "./NoteRender";
import CreateArea from "./CreateArea";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DeletedNotes from "./DeletedNotes";
import Notes from "./Notes";
import ArchivedNotes from "./ArchivedNotes";

function App() {
  const [notes, setNotes] = useState([]);
  const [headerName, setHeaderName] = useState("yourNote");


  const viewNotes = async () => {
    // const flag = JSON.stringify( setFlag );
    //console.log();
    //setNoteFlag();
    await axios.get('/view')
    .then(res => {
      setNotes(res.data);
      //console.log(res.data);
    })
    .catch( error => {
      console.log(error);
    });
  }

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
    // console.log("----------------\n" + note);
    if(note.title != "" && note.content != "") {
      const newNote = JSON.stringify( note );
      // console.log("----------------\n" + note);
        await axios.post('/addNote', newNote)
        .then(response => {
          viewNotes();
          // console.log("Addition Successful")
          // console.log(newNote)
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
          {/* <Footer /> */}
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
      </Routes>
      </Router>
      {/* <Footer /> */}
    </>

    );
}

export default App;
