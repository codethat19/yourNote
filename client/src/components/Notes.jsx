import React, { useEffect } from "react";
import axios from "axios";
import NoteRender from "./NoteRender";
import api from "./axios";

function Notes (props) {
    async function viewNotes () {
        await api.get('/view')
        .then(res => {
          console.log(res.data);
          props.setNotes(res.data);
        })
        .catch( error => {
          console.log(error);
        });
      }
      //viewNotes();
      useEffect( () => {
        viewNotes();
  },[]);
      return (
        <>
          {props.notes.map((noteItem, index) => {
              return (
                <NoteRender className="container-fluid"
                  key={index}
                  id={noteItem._id}
                  title={noteItem.title}
                  content={noteItem.content}
                  onDelete={viewNotes}
                  onArchive={viewNotes}
                  flag={noteItem.flag}
                />
              );
            })}
        </>
      );
}

export default Notes;
