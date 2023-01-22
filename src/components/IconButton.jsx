import React from "react";

const IconButton = ({
  icon,
  extraStyle,
  children,
  iconPosition = "left",
  type,
}) => {
  return (
    <button
      className={`cursor-pointer bg-slate-800 rounded-xl text-white flex flex-row gap-2 py-1 px-3 items-center gap shadow-md shadow-slate-500 hover:opacity-90 ${extraStyle}`}
      type={type}
    >
      {iconPosition === "left" && icon ? icon : null}
      {children}
      {iconPosition === "right" && icon ? icon : null}
    </button>
  );
};

export default IconButton;
