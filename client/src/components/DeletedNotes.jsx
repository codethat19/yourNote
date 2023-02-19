//jshint esversion:8
import React, { useEffect } from "react";
// import axios from "axios";
import NoteRender from "./NoteRender";
import api from "./axios";

function DeletedNotes (props) {
  async function viewDeletedNotes () {
    await api.get('/deletedNotes')
      .then(res => {
        // console.log(res.data);
        props.setNotes(res.data);
      })
      .catch( error => {
        console.log(error);
      });
  }

  //viewDeletedNotes();
  useEffect( () => {
    viewDeletedNotes();
},[]);

  return (
    <>
      {props.notes.map((noteItem, index) => {
          return (
            <NoteRender
              key={index}
              id={noteItem._id}
              title={noteItem.title}
              content={noteItem.content}
              // onDelete={viewDeletedNotes}
              onPermaDelete={viewDeletedNotes}
              onRecovery={viewDeletedNotes}
              flag={noteItem.flag}
            />
          );
        })}
    </>
  );
}

export default DeletedNotes;
