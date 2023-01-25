import React from "react";
import { Link } from "react-router-dom";
import icon from "../assets/icon.png";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex flex-row items-center gap-3 cursor-pointer py-4 px-2">
        <div className="w-[64px] h-[64px] rounded-full overflow-hidden ">
          <img
            className="w-[80px] h-[70px] object-cover rounded-lg shadow-md shadow-slate-900"
            src={icon}
            alt="Icon"
          />
        </div>
        <h1 className="hidden sm:block text-lg font-serif font-bold text-slate-800 sm:text-slate-100 ">
          LIBLINE
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
