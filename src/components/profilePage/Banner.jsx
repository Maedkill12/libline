import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import useAccessToken from "../../hooks/useAccessToken";
import useModal from "../../hooks/useModal";
import IconButton from "../IconButton";
import EditProfileForm from "./EditProfileForm";

const Banner = ({ profile: { username, photoURL } }) => {
  const { username: userLogged } = useAccessToken();
  const { Modal, closeModal, openModal } = useModal();
  return (
    <>
      <Modal>
        <div className="w-[400px] bg-white rounded-lg shadow-lg shadow-black">
          <button className="m-0" onClick={closeModal}>
            <AiOutlineCloseCircle size={40} />
          </button>
          <div className="px-4 pb-4 ">
            <h2 className="text-center text-2xl font-bold font-sans text-slate-800 mb-4">
              Edit Profile
            </h2>
            <EditProfileForm closeModal={closeModal} />
          </div>
        </div>
      </Modal>
      <div className="bg-gradient-to-b  from-slate-100 dark:from-slate-800/80 to-slate-300 dark:to-slate-800 w-full py-8 px-4 flex flex-row items-center gap-4">
        <div className="w-48 h-48 bg-slate-800 dark:bg-slate-700 rounded-full flex items-center justify-center overflow-hidden">
          {photoURL ? (
            <img
              src={photoURL}
              className="h-44 w-44 rounded-full object-cover"
              alt="Profile"
            />
          ) : (
            <FaUserCircle size={180} color="rgb(241 245 249)" />
          )}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white font-serif">
            {username}
          </h2>
          {username === userLogged && (
            <div className="mt-1" onClick={openModal}>
              <IconButton icon={<MdModeEdit />}></IconButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Banner;
