import { Link, Outlet } from "react-router-dom";
import "./styles/navbar.css";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
const Navbar = () => {
  return (
    <>
      <header>
        <div>
          <img
            src="src\components\images\FEEDBACK_SYMBOL.jpg"
            alt=""
            width={40}
          />
          <span>FEEDBACK SYSTEM</span>
        </div>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/ranking">Ranking</Link>
          </li>
          <li>
            <Link to="/portal">Feedback Portal</Link>
          </li>
          <button
            onClick={() => {
              signOut(auth);
            }}
          >
            LogOut
          </button>
        </ul>
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;
