import debug from "debug";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import ClassesPage from "../ClassesPage/ClassesPages";
import { getUser } from "../../utilities/users-service";
import NavBar from "../../components/NavBar/NavBar";
import AddClassPage from "../ClassesPage/AddClassPage";
import HomePage from "../HomePage/HomePage";
import ClassDetails from "../ClassesPage/ClassDetails"; // Make sure this path is correct

const log = debug("slothitude:pages:App:App");

function App() {
  const [user, setUser] = useState(getUser());
  log("user %o", user);

  if (!user) {
    return (
      <main className="App">
        <AuthPage setUser={setUser} />
      </main>
    );
  }

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/classes/avail" element={<ClassesPage user={user} />} />
        <Route path="/add-class" element={<AddClassPage />} />
        <Route path="/classes/:id" element={<ClassDetails user={user} />} />
      </Routes>
    </main>
  );
}

export default App;
