// Card.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNote } from "../../redux/actions";
import "./Card.scss";

export default function Card({ title, description, id, finished }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.actualUser);
  useEffect(() => {
    localStorage.removeItem("actualNote");
  }, []);

  const editOrModific = async () => {
    await localStorage.setItem(
      "actualNote",
      JSON.stringify({ title, description, finished, id })
    );
    await dispatch(getNote(user._id, id));
  };

  return (
    <div className="card">
      <h1>{title}</h1>
      <p>{description}</p>
      <Link to={`/notes/${id}`}>
        <button onClick={editOrModific}>Edit Or Delete</button>
      </Link>
    </div>
  );
}
