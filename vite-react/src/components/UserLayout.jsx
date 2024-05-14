import React from "react";
import UserHeader from './user components/UserHeader'
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function UserLayout() {
  return (
    <div>
      <UserHeader />
      <Outlet />
    </div>
  );
}

export default UserLayout;
