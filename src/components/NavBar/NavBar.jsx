import { Link, NavLink } from "react-router-dom";
import { logOut } from "../../utilities/users-service";

export default function NavBar({ setUser }) {
  const handleLogOut = () => {
    logOut();
    setUser(null);
  };

  return (
    <nav>
      <NavLink to="/dashboard">
        <img src="Slothitude.png" className="h-12" alt="logo" />
      </NavLink>
      &nbsp; | &nbsp;
      <NavLink to="/classes/avail">Available Classes</NavLink>
      &nbsp; | &nbsp;
      <Link to="" onClick={handleLogOut}>
        Log Out
      </Link>
    </nav>
  );
}
