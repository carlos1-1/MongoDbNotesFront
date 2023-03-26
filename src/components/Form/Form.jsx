import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../../redux/actions";
import "./Form.scss";

export default function Notes() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.actualUser);

  const [input, setInput] = useState({
    title: "",
    description: "",
    important: false,
    finished: false,
  });

  const handleChange = ({ target: { name, type, checked, value } }) =>
    setInput({
      ...input,
      [name]: type === "checkbox" ? Boolean(checked) : value,
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      input.title.length > 20 ||
      input.description.length > 280 ||
      input.title.trim() === "" ||
      input.description.trim() === ""
    ) {
      alert(
        "Error: The title must have less than 20 characters and the description less than 280 characters. None of the fields can be empty."
      );
    } else {
      dispatch(createNote(user._id, input));
      alert("Nota creada");
      setInput({
        title: "",
        description: "",
        important: false,
        finished: false,
      });
      window.location.reload();
    }
  };

  return (
    <div className="popup">
      <button className="btn">Add Note</button>
      <div className="popup-inner">
        <form onSubmit={handleSubmit} className="form">
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={input.title}
              onChange={handleChange}
              required
              maxLength={20}
              className="input"
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={input.description}
              onChange={handleChange}
              required
              maxLength={280}
              className="input"
            />
          </label>
          <label>
            Important:
            <input
              type="checkbox"
              name="important"
              checked={input.important}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="btn create-btn">
            Create note
          </button>
        </form>
      </div>
    </div>
  );
}
