import React from "react";
import { IoMdCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import IconButton from "../IconButton";
import { useNavigate } from "react-router-dom";

const menu = [
  { text: "Login", icon: <FaUserCircle />, path: "/login" },
  {
    text: "Register",
    icon: <IoMdCreate />,
    path: "/register",
  },
];

const LoggedOutMenu = () => {
  const navigate = useNavigate();
  return (
    <nav className="list-none flex flex-row gap-2">
      {menu.map((item) => (
        <li key={item.text} onClick={() => navigate(item.path)}>
          <IconButton icon={item.icon} iconPosition="right">
            {item.text}
          </IconButton>
        </li>
      ))}
    </nav>
  );
};

export default LoggedOutMenu;
