import React from "react";
import icon from "../assets/icon.png";

const Logo = () => {
  return (
    <div className="flex flex-row items-center gap-3 cursor-pointer py-4 px-2">
      <img
        className="w-[64px] h-[64px] object-cover rounded-lg shadow-md shadow-slate-900"
        src={icon}
      />
      <h1 className="text-lg font-serif font-bold text-slate-100 ">LIBLINE</h1>
    </div>
  );
};

export default Logo;
