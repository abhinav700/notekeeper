import React from "react";
import noteContext from "../context/notes/noteContext";
import { useContext } from "react";

const Noteitem = (props) => {
  const context=useContext(noteContext);
  const {deleteNote,theme}=context;
  const { note,updateNote } = props;
  return (
      
    <div  className={`col-md-3 my-3 bg-${theme}`} style={{backgroundColor:theme==="dark"?"grey":""}} >
      <div className={`card bg-${theme}`} >
        <div className={`card-body bg-${theme}`}>
            <div className="d-flex">

          <h5 className={`card-title `} style={{color:theme==="dark"?"white":"black"}}>{note.title}</h5>
          <i className="mx-2 fas fa-edit text-dark" onClick={(e)=>{updateNote(note)}}></i>
          <i className="mx-2 fas fa-trash-alt text-dark" onClick={(e)=>{deleteNote(note._id)}}></i>
            </div>
          <p className="card-text "  style={{color:theme==="dark"?"white":"black"}}> {note.description}</p>
         
        </div>
      </div>
    </div>
    
  );
};

export default Noteitem;
