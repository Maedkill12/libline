import React from "react";
import Header from "./header/Header";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-row ">
      <div className="hidden md:block w-[240px]">
        <SideBar />
      </div>
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="bg-slate-50 dark:bg-slate-900 flex-grow flex mt-16 min-h-[calc(100vh-4rem)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
