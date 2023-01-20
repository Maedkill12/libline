import React from "react";
import { useNavigate } from "react-router-dom";
import useAccessToken from "../hooks/useAccessToken";
import LoggedInMenu from "./LoggedInMenu";
import LoggedOutMenu from "./LoggedOutMenu";

const Header = () => {
  const { accessToken } = useAccessToken();
  const navigate = useNavigate();

  return (
    <header className="flex flex-row justify-end p-4 items-center bg-slate-100 fixed min-w-[calc(100vw-240px)]">
      <div>
        {!accessToken && <LoggedOutMenu />}
        {accessToken && <LoggedInMenu />}
      </div>
    </header>
  );
};

export default Header;
