import React from "react";
import { AuthButton } from "../AuthButton/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import "./Landing.scss";

export default function Landing() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="header">
      <h1>MongoDbNotes</h1>
      <AuthButton />
      {isAuthenticated ? (
        <Link to="/notes">
          <button>Starts</button>
        </Link>
      ) : (
        <button>Login required</button>
      )}
      <h1>create your reminders</h1>
      <p>
        Esta página fue creada usando las tecnologías MongoDB, Node.js, Express,
        React, Auth0, Redux.js y Sass.
      </p>
    </div>
  );
}

/*

*/
