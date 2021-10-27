import React from "react";
import noteContext from "../context/notes/noteContext";
import { useContext } from "react";

const Noteitem = (props) => {
  const context=useContext(noteContext);
  const {deleteNote}=context;
  const { note,updateNote } = props;
  return (
      
    <div className="col-md-3 my-3">
      <div className="card" >
        <div className="card-body">
            <div className="d-flex">

          <h5 className="card-title">{note.title}</h5>
          <i className="mx-2 fas fa-edit" onClick={(e)=>{updateNote(note)}}></i>
          <i className="mx-2 fas fa-trash-alt" onClick={(e)=>{deleteNote(note._id)}}></i>
            </div>
          <p className="card-text"> {note.description}</p>
         
        </div>
      </div>
    </div>
    
  );
};

export default Noteitem;
