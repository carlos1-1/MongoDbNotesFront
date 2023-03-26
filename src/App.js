import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOrCreateUser } from "./redux/actions";
import Landing from "./components/Landing/Landing";
import Notes from "./components/Notes/Notes.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { EditOrDelete } from "./components/EditOrDelete/EditOrDelete";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getOrCreateUser(user.email));
    }
  }, [isAuthenticated, dispatch]);

  const RequireAuth = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/" />;
    return <>{children}</>;
  };

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/Notes" element={<Notes />} />
        <Route
          path="/Notes/:id"
          element={
            <RequireAuth>
              <EditOrDelete />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
