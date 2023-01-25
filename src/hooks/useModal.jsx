import React from "react";
import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const _closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const Modal = ({ children }) => (
    <>
      {isOpen && (
        <div
          className={`absolute top-0 left-0 h-full w-full flex items-center justify-center after:content-[""] after:h-full after:w-full  after:top-0 after:left-0 after:opacity-70 after:bg-gray-800 after:fixed`}
          onClick={_closeModal}
        >
          <div className="opacity-100 z-10 fixed ">{children}</div>
        </div>
      )}
    </>
  );

  return { openModal, closeModal, isOpen, Modal };
};

export default useModal;
