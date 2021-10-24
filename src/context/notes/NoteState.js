 
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {

  const host = "http://localhost:5000";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);



  //Function to get all notes
  const getNotes = async () => {
    //backend
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
      localStorage.getItem('token')      
    },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };
  

  
  
  // FUnciton to add a note
  const addNote = async (title, description, tag) => {
    //backend
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token")
 ,
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)
    console.log("adding a new note");
    const note=json
    setNotes(notes.concat(note));
  };

  
  
  //Function to delete a note
  const deleteNote = async (id) => {
    console.log("deleting note");
 
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token")
 ,
        },
    });
    const json =   response.json();
    console.log(json)
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
 
  };

  
  
  //Function to edit a note
  const editNote = async (id, title, description, tag) => {
    // Handling the backend part
    const response = await fetch(
      `${host}/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem("token")
 ,
        },

        body: JSON.stringify({ title, description, tag }),
      }
    );
   // const json =await response.json();
      let newNotes=JSON.parse(JSON.stringify(notes));

    // handling on the client side
    for (let index = 0; index < newNotes.length; index++) {
      const element =   newNotes[index];
      if (element._id === id) {
       newNotes[index].title = title;
       newNotes[index].description = description;
       newNotes[index].tag = tag;
       break;
      }
    }
    setNotes(newNotes)
  };




  return (
    <NoteContext.Provider
      value={{ setNotes, notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
