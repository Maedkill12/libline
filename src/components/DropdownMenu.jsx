import React, { useState } from "react";

const DropdownMenu = ({ main, submenu }) => {
  const [displaySubmenu, setDisplaySubmenu] = useState(false);

  const mainClickHandle = () => {
    setDisplaySubmenu((prev) => !prev);
  };

  return (
    <li onClick={mainClickHandle} className="relative">
      <div className="cursor-pointer hover:scale-150">{main}</div>
      {displaySubmenu && submenu}
    </li>
  );
};

export default DropdownMenu;
