import React from "react";
import { NavLink } from "react-router-dom";
const activeStyle = {
  color: "#871616",
  textDecoration: "underline",
  fontWeight: "bold",
};
function UserHeader() {
  return (
    <div>
      <nav>
        <h1>Boat-Life</h1>
        <div className="options">
          <NavLink
            to="about"
            className="page1"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            About
          </NavLink>
          <NavLink
            to="boats"
            className="page2"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Boats
          </NavLink>
          <NavLink
            to="view-booking"
            className="page2"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            View Booking
          </NavLink>
          <NavLink
            to="/login"
            className="page2"
            style={({ isActive }) => (isActive ? activeStyle : null)}
            onClick={() => sessionStorage.removeItem("username")}
          >
            Log Out
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default UserHeader;
