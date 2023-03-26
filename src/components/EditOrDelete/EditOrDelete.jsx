import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { editNote, deleteNote } from "../../redux/actions";
import "./Edit.scss";
export function EditOrDelete() {
  const [note, setNote] = useState(null);
  const user = useSelector((state) => state.actualUser);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [important, setImportant] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const actualNote = JSON.parse(localStorage.getItem("actualNote"));
    setNote(actualNote);
  }, []);
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    const updatedNote = {
      title: title || note.title,
      description: description || note.description,
      important,
      finished: note.finished,
    };
    dispatch(editNote(user._id, note.id, updatedNote));
    setEditing(false);
    window.location.href = "/notes";
  };
  const handleCheckboxChange = (event) => {
    setImportant(event.target.checked);
  };

  const goToFinished = () => {
    const updatedNote = {
      title: note.title,
      description: note.description,
      important: note.important,
      finished: true,
    };
    dispatch(editNote(user._id, note.id, updatedNote));
    window.location.href = "/notes";
  };
  const removeFromFinished = () => {
    const updatedNote = {
      title: note.title,
      description: note.description,
      important: note.important,
      finished: false,
    };
    dispatch(editNote(user._id, note.id, updatedNote));
    window.location.href = "/notes";
  };

  const deleteFromNote = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      await dispatch(deleteNote(user._id, note.id));
      window.location.href = "/notes";
    }
  };

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className="editContainer">
      <Link to="/notes">
        <button>Cancel</button>
      </Link>
      {note.finished === false ? (
        <button onClick={() => goToFinished()}>Mark as completed</button>
      ) : (
        <button onClick={() => removeFromFinished()}>
          quitar de completadas
        </button>
      )}
      <button onClick={() => deleteFromNote()}>Delete note</button>

      {editing ? (
        <div>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>important</label>
          <input
            type="checkbox"
            checked={important}
            onChange={handleCheckboxChange}
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <p>{note ? note.title : "cargando"}</p>
          <p>{note ? note.description : "cargado"}</p>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
}
