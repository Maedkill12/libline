import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-row ">
      <div className="w-[240px]">
        <SideBar />
      </div>
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="bg-slate-50 flex-grow flex">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
