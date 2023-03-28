import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Sidebar />
      <div className="main">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
