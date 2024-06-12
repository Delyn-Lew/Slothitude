import debug from "debug";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthPage from "../AuthPage/AuthPage";
import ClassesPage from "../ClassesPage/ClassesPages";
import { getUser } from "../../utilities/users-service";
import NavBar from "../../components/NavBar/NavBar";
import AddClassPage from "../ClassesPage/AddClassPage";
import HomePage from "../HomePage/HomePage";
import ClassDetails from "../ClassesPage/ClassDetails";
import BookingSummaryPage from "../BookingSummaryPage/BookingSummaryPage";

const log = debug("slothitude:pages:App:App");

function ProtectedRoute({ user, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please log in to access this page.");
      navigate("/");
    } else if (user.role !== "studioOwner") {
      toast.error(
        "Unauthorized access. Only studio owners can access this page."
      );
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (user && user.role === "studioOwner") {
    return children;
  }

  return null;
}

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
        <Route
          path="/booking-summary"
          element={<BookingSummaryPage user={user} />}
        />
        <Route path="/classes/:id" element={<ClassDetails user={user} />} />
        <Route
          path="/add-class"
          element={
            <ProtectedRoute user={user}>
              <AddClassPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </main>
  );
}

export default App;
