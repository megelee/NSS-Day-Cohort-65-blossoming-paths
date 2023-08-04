import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current location is the profile page ("/profile")
  const isProfilePage = location.pathname === "/profile";
  // Check if the current location is the forums page ("/forums")
  const isForumsPage = location.pathname === "/forums";

  return (
    <ul className="navbar">
      {/* <li className="navbar__item active">
        <Link className="navbar__link" to="/profile">
          Profile
        </Link>
      </li> */}
      <li className="navbar__item active">
        <Link className="navbar__link" to="/forums">
          Forums
        </Link>
      </li>
      {isProfilePage && (
        <li className="navbar__item active">
          <Link className="navbar__link" to="/">
            Home
          </Link>
        </li>
      )}
      {isForumsPage && (
        <li className="navbar__item active">
          <Link className="navbar__link" to="/">
            Home
          </Link>
        </li>
      )}
      {localStorage.getItem("blossom_user") ? (
        <li className="navbar__item navbar__logout">
          <Link
            className="navbar__link"
            to=""
            onClick={() => {
              localStorage.removeItem("blossom_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};

