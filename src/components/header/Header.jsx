import React from "react";
import useAccessToken from "../../hooks/useAccessToken";
import Logo from "../Logo";
import LoggedInMenu from "./LoggedInMenu";
import LoggedOutMenu from "./LoggedOutMenu";

const Header = () => {
  const { accessToken } = useAccessToken();

  return (
    <header className="flex flex-row justify-between md:justify-end p-0 md:p-4 items-center bg-slate-100 dark:bg-slate-800 fixed min-w-full md:min-w-[calc(100vw-240px)]">
      <div className="block md:hidden">
        <Logo />
      </div>
      <div className="mr-4">
        {!accessToken && <LoggedOutMenu />}
        {accessToken && <LoggedInMenu />}
      </div>
    </header>
  );
};

export default Header;
