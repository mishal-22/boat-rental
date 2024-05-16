import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminHeader() {
  const activeStyle = {
    color: "#871616",
    textDecoration: "underline",
    fontWeight: "bold",
  };

  return (
    <div>
      <nav>
        <h1>Boat-Life</h1>
        <div className="options">
          <NavLink
            to="/admin/about"
            className="page1"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            About
          </NavLink>
          <NavLink
            to="/admin/add-boat"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Add Boat
          </NavLink>
          <NavLink
            to="/admin/boats"
            className="page2"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Boats
          </NavLink>
          <NavLink
            to="/admin/show-booking"
            className="page2"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Show Bookings
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

export default AdminHeader;
