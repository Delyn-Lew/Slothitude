import { Link, NavLink } from "react-router-dom";
import { logOut } from "../../utilities/users-service";
import { useState } from "react";

export default function NavBar({ user, setUser }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = () => {
    logOut();
    setUser(null);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const buttonStyles = {
    backgroundColor: "#73576D",
    color: "white",
    textDecoration: "none",
    borderRadius: "0.375rem",
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    lineHeight: "1.25rem",
    textAlign: "center",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to="/dashboard"
          className="flex items-center space-x-3"
          style={{ textDecoration: "none" }}
        >
          <span
            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            style={{ textDecoration: "none" }}
          >
            Slothitude
          </span>
        </NavLink>
        <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
          {user ? (
            <Link
              to=""
              onClick={handleLogOut}
              style={{ ...buttonStyles }}
              className="hover:bg-opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Log Out
            </Link>
          ) : (
            <NavLink
              to="/login"
              style={{ ...buttonStyles }}
              className="hover:bg-opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Get started
            </NavLink>
          )}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${menuOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 list-none">
            <li>
              <NavLink
                to="/dashboard"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                style={{ textDecoration: "none" }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/classes/avail"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                style={{ textDecoration: "none" }}
              >
                Available Classes
              </NavLink>
            </li>
            {user && user.role !== "studioOwner" && (
              <li>
                <NavLink
                  to="/booking-summary"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  style={{ textDecoration: "none" }}
                >
                  My Bookings
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
