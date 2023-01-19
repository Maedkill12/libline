import React from "react";
import Logo from "./Logo";

const SideBar = () => {
  return (
    <div className=" min-h-screen bg-slate-800">
      <div onClick={() => navigate("/")}>
        <Logo />
      </div>
    </div>
  );
};

export default SideBar;
