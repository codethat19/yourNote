//jshint esversion:9
import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
// import "../../public/styles.css"
// import TextareaAutosize from 'react-textarea-autosize';


function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });

  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form method = "post" className="create-note col-sm-2">

        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title (Required)"
            required
          />
        )}

         <textarea
          name="content"
          id="txt"
          onClick={expand}
          onChange={handleChange}
          className="scroll"
          value={note.content}
          placeholder="Click to create note.....(Required)"
          rows={isExpanded ? 3 : 1}
          required
        />

        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}><AddIcon style={{marginLeft: "-15px"}} /></Fab>
        </Zoom>

      </form>
    </div>
  );
}

export default CreateArea;
