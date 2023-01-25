import React from "react";
import Logo from "./Logo";

const SideBar = () => {
  return (
    <div className="min-h-screen fixed min-w-[240px] bg-slate-800">
      <Logo />
    </div>
  );
};

export default SideBar;
