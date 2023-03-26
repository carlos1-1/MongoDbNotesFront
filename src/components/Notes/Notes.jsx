import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImportant, getNotFinished } from "../../redux/actions.js";
import Card from "../Card/Card.jsx";
import Form from "../Form/Form.jsx";
import Paginated from "../Paginated/Paginated.jsx";
import "./Notes.scss";

export default function Notes() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.actualUser);
  const notes = useSelector((state) => state.notes);

  const [initialpage, setInitialPage] = useState(1);
  const [notesPerPage] = useState(4);
  const lastNote = initialpage * notesPerPage;
  const firstNote = lastNote - notesPerPage;
  const currentNotes = notes.slice(firstNote, lastNote);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (user._id) {
      dispatch(getNotFinished(user._id, false));
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [user._id]);

  const paginated = (pageNumber) => {
    setInitialPage(pageNumber);
  };
  const finishedNote = () => {
    dispatch(getNotFinished(user._id, true));
  };
  const importantNote = () => {
    dispatch(getImportant(user._id, true));
  };
  const generalNote = () => {
    dispatch(getNotFinished(user._id, false));
  };

  return (
    <div className="note-container">
      <Form />
      <div className="note-buttons-container">
        <button className="note-button" onClick={() => generalNote()}>
          See generals
        </button>
        <button className="note-button" onClick={() => importantNote()}>
          See important
        </button>
        <button className="note-button" onClick={() => finishedNote()}>
          See finished
        </button>
      </div>
      {loading ? (
        <h1>Loading</h1>
      ) : notes.length > 0 ? (
        <div className="note-cards-container">
          {currentNotes.map((note) => {
            return (
              <div key={note._id} className="note-card-container">
                <Card
                  id={note._id}
                  title={note.title}
                  description={note.description}
                  userId={user._id}
                  finished={note.finished}
                  key={note._id}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <h1>Sorry, there are no results.</h1>
      )}
      <div className="paginated">
        <Paginated
          notesPerPage={notesPerPage}
          notesTotal={notes.length}
          paginated={paginated}
          initialpage={initialpage}
        />
      </div>
    </div>
  );
}
