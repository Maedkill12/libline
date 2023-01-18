import React from "react";
import icon from "../assets/icon.png";

const Logo = () => {
  return (
    <div className="flex flex-row items-center justify-between gap-3 cursor-pointer">
      <img
        className="w-full min-w-[100px] h-[64px] object-cover rounded-lg"
        src={icon}
      />
      <h1 className="text-3xl font-serif font-bold text-slate-800">LIBLINE</h1>
    </div>
  );
};

export default Logo;
