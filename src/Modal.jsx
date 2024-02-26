import { Close } from "@mui/icons-material";
import React from "react";
import { GiClosedBarbute } from "react-icons/gi";

const Modal = ({ children, isModalOpen, closeModal, isLocked, themeColor }) => {
  const handleCloseModal = () => {
    if (isLocked) return;
    closeModal();
  };
  return (
    isModalOpen && (
      <div
        className={`bg-black/50 fixed z-10 inset-0 ${
          isModalOpen ? "" : ""
        } flex items-center justify-center `}
        onClick={handleCloseModal}
        color={themeColor}
      >
        <div
          className="bg-white dark:bg-slate-900 max-w-[600px] w-[80%] max-h-screen z-20 min-h-fit rounded-md p-3 flex flex-col gap-3 pb-5"
          onClick={(ev) => {
            ev.stopPropagation();
          }}
        >
          {!isLocked && (
            <div>
              <button
                onClick={handleCloseModal}
                className="float-right m-1 w-fit"
                style={{ color: themeColor }}
              >
                <Close color={`${themeColor}`} />
              </button>
            </div>
          )}
          <div className="flex-1 flex items-start justify-center">
            {children}
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
