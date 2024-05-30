import debug from "debug";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import HomePage from "../HomePage/HomePage";
import "../../index.css";

const log = debug("mern:pages:App:App");

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
    <>
      <main className="App">
        <NavBar setUser={setUser} />

        <Routes>
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/orders/new" element={<NewOrderPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
