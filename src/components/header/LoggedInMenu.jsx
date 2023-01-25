import React from "react";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
// import { GrNotification } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
// import { FiSettings } from "react-icons/fi";
import DropdownMenu from "../DropdownMenu";
import { useNavigate } from "react-router-dom";
import useAccessToken from "../../hooks/useAccessToken";
import useAuth from "../../hooks/useAuth";

const ProfileMenu = () => {
  const { logout, isPending } = useAuth();
  const { username } = useAccessToken();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    if (!isPending) {
      const data = await logout();
      if (data) {
        navigate("/");
      }
    }
  };
  return (
    <ul className="w-[280px] absolute bg-white dark:bg-slate-900 right-4 top-8 py-4 rounded-lg shadow-lg shadow-slate-500 dark:shadow-black">
      <li
        className="pl-4 text-lg text-slate-700 dark:text-white font-bold py-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer flex flex-row items-center gap-4"
        onClick={() => navigate(`/profile/${username}`)}
      >
        <FaUserCircle size={24} />
        <p>Profile</p>
      </li>
      {/* <li className="pl-4 text-lg text-slate-700 font-bold py-2 hover:bg-slate-100 cursor-pointer flex flex-row items-center gap-4">
        <FiSettings size={24} />
        <p>Settings</p>
      </li> */}
      <li
        className={`pl-4 text-lg text-slate-700 dark:text-white font-bold py-2 hover:bg-slate-100 dark:hover:bg-slate-700 flex flex-row items-center gap-4 ${
          isPending ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={logoutHandler}
      >
        <RiLogoutBoxRFill size={24} />
        <p>Logout</p>
      </li>
    </ul>
  );
};

const menu = [
  {
    Icon: CgProfile,
    Submenu: ProfileMenu,
  },
  // { Icon: GrNotification, Submenu: null },
];

const LoggedInMenu = () => {
  return (
    <div>
      <nav className="list-none flex flex-row-reverse gap-4 items-center dark:text-slate-200">
        {menu.map(({ Icon, Submenu }, i) => (
          <DropdownMenu
            main={<Icon size={32} />}
            submenu={Submenu && <Submenu />}
            key={i}
          />
        ))}
      </nav>
    </div>
  );
};

export default LoggedInMenu;
