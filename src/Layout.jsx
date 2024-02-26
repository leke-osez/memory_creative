import React, { useState } from "react";
import Modal from "./Modal";
import useThemeHook from "./hooks/useThemeMode";
import useDisclosure from "./hooks/useDisclosure";
import {
  ArrowBackIos,
  DarkMode,
  LightMode,
  Settings,
} from "@mui/icons-material";
import Button from "./components/Button";
import Title from "./components/Title";
import CheckButton from "./components/CheckButton";

const Layout = ({
  children,
  gameState,
  themeColor,
  goBack,
  isSettingModalOpen,
  themeColors,
  closeSettingModal,
  openSettingModal,
  isGameOverModalOpen,
  closeGameOverModal,
  openGameOverModal,
  isQuitModalOpen,
  closeQuitModal,
  openQuitModal,
  setGameState,
  setGameDifficulty,
  gameDifficulty,
  handleThemeColor,
  isGameWonModalOpen,
  closeGameWonModal,
  onClick,
}) => {
  const { configTheme, getTheme, setTheme } = useThemeHook();

  const replay = () => {
    closeGameOverModal();
    closeGameWonModal();
  };

  const quit = () => {
    closeQuitModal();
    setGameState("start");
  };

  const handleGameDifficulty = (mode) => {
    setGameDifficulty(mode);
  };

  return (
    <div
      className="w-full flex flex-col items-center dark:bg-slate-950 min-h-screen py-3 "
      onClick={onClick}
    >
      {/* MODALS */}
      {/* SETTINGS */}
      <Modal
        closeModal={closeSettingModal}
        isModalOpen={isSettingModalOpen}
        themeColor={themeColor}
      >
        <div className="flex flex-col ml-[10%] gap-6 overflow-y-auto  w-full mb-6">
          <div>
            <Title themeColor={themeColor}>Select Theme Color</Title>
            {/* color set */}
            <div className="ml-2">
              {themeColors.map((color) => (
                <button
                  onClick={() => handleThemeColor(color)}
                  style={{
                    backgroundColor: themeColor === color ? `${color}30` : "",
                  }}
                  className={`aspect-square min-w-10 min-h-10 rounded-full p-2`}
                >
                  <div
                    className={`aspect-square min-w-10 min-h-10 rounded-full`}
                    style={{
                      backgroundColor: color,
                    }}
                  ></div>
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Title themeColor={themeColor}>Select Difficulty</Title>
            {/* difficulty */}
            <div className="ml-3 flex flex-col gap-2">
              <CheckButton
                onClick={() => {
                  handleGameDifficulty("easy");
                }}
                themeColor={themeColor}
                isChecked={gameDifficulty === "easy"}
              >
                Too Easy
              </CheckButton>
              <CheckButton
                onClick={() => {
                  handleGameDifficulty("medium");
                }}
                themeColor={themeColor}
                isChecked={gameDifficulty === "medium"}
              >
                Well
              </CheckButton>
              <CheckButton
                onClick={() => {
                  handleGameDifficulty("hard");
                }}
                themeColor={themeColor}
                isChecked={gameDifficulty === "hard"}
              >
                Boss
              </CheckButton>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isModalOpen={isGameOverModalOpen}
        closeModal={closeGameOverModal}
        isLocked={true}
        themeColor={themeColor}
      >
        <div className="flex flex-col items-center justify-center gap-5">
          <h1 className="text-3xl font-bold" style={{ color: themeColor }}>
            Game Over!
          </h1>
          <button
            style={{ backgroundColor: themeColor }}
            className={"text-white font-sime-bold px-4 py-2"}
            onClick={replay}
          >
            Play again
          </button>
        </div>
      </Modal>

      <Modal
        isModalOpen={isQuitModalOpen}
        closeModal={closeQuitModal}
        themeColor={themeColor}
      >
        <div className="flex flex-col items-center text-center justify-start flex-1 gap-7">
          <h1 className="text-2xl font-semibold" style={{ color: themeColor }}>
            Are you sure you want to Quit?
          </h1>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                closeQuitModal();
              }}
              themeColor={themeColor}
            >
              Cancel
            </Button>
            <Button onClick={quit} themeColor={themeColor}>
              Yes
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        isModalOpen={isGameWonModalOpen}
        closeModal={closeGameWonModal}
        themeColor={themeColor}
      >
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold" style={{ color: themeColor }}>
            {"Game Won!!! 🎉"}
          </h1>
          <Button onClick={replay} themeColor={themeColor}>
            Play again
          </Button>
        </div>
      </Modal>

      <div className="flex flex-col gap-4 w-[90%] max-w-[400px] items-center ">
        <nav
          className="w-full flex  justify-between border-b-gray-500/30 border-b-[1px] border-solid p-2 px-3 "
          style={{ color: themeColor }}
        >
          {/* menu */}

          <div className="flex gap-3">
            {gameState === "play" && (
              <button onClick={goBack}>
                <ArrowBackIos />
              </button>
            )}
            <button onClick={openSettingModal}>
              <Settings />
            </button>
          </div>

          {/* toggle theme mode */}
          <div className="flex-1 flex justify-end">
            <button
              className="p-1 rounded-full shadow-md dark:bg-slate-950 "
              onClick={() => {
                if (getTheme === "dark") {
                  configTheme("light");
                } else {
                  configTheme("dark");
                }
              }}
            >
              {getTheme === "dark" ? <LightMode /> : <DarkMode />}
            </button>
          </div>
        </nav>

        <main className="flex-col justify-center items-center w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
