import React from "react";
import { IoMdCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import IconButton from "./IconButton";
import { useNavigate } from "react-router-dom";
import useAccessToken from "../hooks/useAccessToken";
import axios from "axios";
import { URL_API } from "../constants";

const headerMenu = [
  { text: "Login", icon: <FaUserCircle />, path: "/login" },
  {
    text: "Register",
    icon: <IoMdCreate />,
    path: "/register",
  },
];

const Header = () => {
  const { accessToken, dispatch } = useAccessToken();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        `${URL_API}/auth/logout`,
        {},
        { withCredentials: true }
      );
      const data = response.data;
      if (data.success) {
        dispatch({ type: "DELETE" });
        navigate("/");
      }
    } catch (error) {
      const msg = error.response.data.err;
      console.log(msg);
    }
  };

  return (
    <header className="flex flex-row justify-between p-4 bg-slate-100">
      <div onClick={() => navigate("/")}>logo</div>
      <div className="">
        <nav className="list-none flex flex-row gap-2">
          {!accessToken &&
            headerMenu.map((item) => (
              <li key={item.text} onClick={() => navigate(item.path)}>
                <IconButton icon={item.icon} iconPosition="right">
                  {item.text}
                </IconButton>
              </li>
            ))}
          {accessToken && (
            <li onClick={logoutHandler}>
              <IconButton icon={<RiLogoutBoxRFill />} iconPosition="right">
                Logout
              </IconButton>
            </li>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
