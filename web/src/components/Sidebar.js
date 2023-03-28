import React from "react";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <SideBarIcon icon={<FaHome size="32" />} link="/" text="Feed" />
      <SideBarIcon
        icon={<CgProfile size="28" />}
        link="/Profile"
        text="Profile"
      />
    </div>
  );
};

const SideBarIcon = ({ icon, link, text = "text" }) => {
  return (
    <NavLink to={link} className="sidebar-icon">
      {icon}
      <span className="sidebar-tooltip">{text}</span>
    </NavLink>
  );
};

export default Sidebar;
