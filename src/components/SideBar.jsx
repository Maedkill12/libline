import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const SideBar = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex-grow bg-slate-800">
      <div onClick={() => navigate("/")}>
        <Logo />
      </div>
    </div>
  );
};

export default SideBar;
