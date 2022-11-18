import React from "react";
import noteContext from "../context/notes/noteContext";
import { useContext } from "react";
 
import { useState } from "react";

export const Addnote = () => {
  const context = useContext(noteContext);
  const { notes, addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" })
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });  
  };

  return (
    <>
      <div className="container my-3">
        <h2>Add a note</h2>

        <form>
          <div className="mb-3 my-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              name="title"
              value={note.title}
            />
            <div id="titletext" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              onChange={onChange}
              name="description"
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              onChange={onChange}
              name="tag"
              value={note.tag}
            />
          </div>

          <button
          disabled={note.title.length<5||note.description.length<5}
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
