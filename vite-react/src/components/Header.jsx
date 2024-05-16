import React from "react";
import { NavLink } from "react-router-dom";
function Header() {
  return (
    <div>
      <nav>
        <h1>Boat-Life</h1>
        <div className="options">
          <NavLink to="register">Register</NavLink>
          <NavLink to="login">Login</NavLink>
        </div>
      </nav>
    </div>
  );
}

export default Header;
