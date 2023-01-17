import React from "react";

const IconButton = ({ icon, style, children, iconPosition = "left" }) => {
  return (
    <div
      className={`cursor-pointer bg-slate-800 rounded-xl text-white flex flex-row gap-2 py-1 px-3 items-center gap shadow-lg shadow-slate-500 ${style}`}
    >
      {iconPosition === "left" && icon ? icon : null}
      {children}
      {iconPosition === "right" && icon ? icon : null}
    </div>
  );
};

export default IconButton;
