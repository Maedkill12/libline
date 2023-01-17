import React from "react";
import { IoMdCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import IconButton from "./IconButton";
import { useNavigate } from "react-router-dom";

const headerMenu = [
  { text: "Login", icon: <FaUserCircle />, path: "/login" },
  {
    text: "Register",
    icon: <IoMdCreate />,
    path: "/register",
  },
];

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="flex flex-row justify-between p-4 bg-slate-100">
      <div onClick={() => navigate("/")}>logo</div>
      <div className="">
        <nav className="list-none flex flex-row gap-2">
          {headerMenu.map((item) => (
            <li key={item.text} onClick={() => navigate(item.path)}>
              <IconButton icon={item.icon} iconPosition="right">
                {item.text}
              </IconButton>
            </li>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
