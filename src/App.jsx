import { createContext, useEffect, useState } from "react";
import { StartScreen, PlayScreen } from "./Screens";
import Layout from "./Layout";
import useDisclosure from "./hooks/useDisclosure";
import useSound from "use-sound";
import suspense from "./assets/sound/suspense.wav";
import gameOver from "./assets/sound/gameOver.wav";
import changeScreen from "./assets/sound/changeScreen.wav";

function App() {
  const [gameState, setGameState] = useState("start");
  const [themeColor, setThemeColor] = useState("#5865f2");
  const [gameDifficulty, setGameDifficulty] = useState("easy");
  const [isGameOverModal, setIsGameOverModal] = useState(false);

  const [playGameOver] = useSound(gameOver);
  const [playChangeScreen] = useSound(changeScreen);

  const {
    isModalOpen: isSettingModalOpen,
    closeModal: closeSettingModal,
    openModal: openSettingModal,
  } = useDisclosure(false);
  const {
    isModalOpen: isGameOverModalOpen,
    closeModal: closeGameOverModal,
    openModal: openGameOverModal,
  } = useDisclosure(false);
  const {
    isModalOpen: isQuitModalOpen,
    closeModal: closeQuitModal,
    openModal: openQuitModal,
  } = useDisclosure(false);
  const {
    isModalOpen: isGameWonModalOpen,
    closeModal: closeGameWonModal,
    openModal: openGameWonModal,
  } = useDisclosure(false);

  const themeColors = ["#5865f2", "#DB2777", "#FF9900", "#0DD354", "#A020F0"];

  const handleThemeColor = (id) => {
    setThemeColor(id);
  };

  const goBack = () => {
    // setGameState("start");
    openQuitModal();
  };
  const handleGameOver = () => {
    playGameOver();
    openGameOverModal();
  };
  const gameWon = () => {
    openGameWonModal();
  };

  if (gameState === "start" || gameState === "play") {
    return (
      <Layout
        gameState={gameState}
        themeColors={themeColors}
        themeColor={themeColor}
        handleThemeColor={handleThemeColor}
        goBack={goBack}
        isSettingModalOpen={isSettingModalOpen}
        closeSettingModal={closeSettingModal}
        openSettingModal={openSettingModal}
        isGameOverModalOpen={isGameOverModalOpen}
        closeGameOverModal={closeGameOverModal}
        // openGameOveModal={openGameOveModal}
        isQuitModalOpen={isQuitModalOpen}
        closeQuitModal={closeQuitModal}
        // openQuitModal={openQuitModal}
        setGameState={setGameState}
        setGameDifficulty={setGameDifficulty}
        gameDifficulty={gameDifficulty}
        isGameWonModalOpen={isGameWonModalOpen}
        closeGameWonModal={closeGameWonModal}
      >
        {gameState === "start" ? (
          <StartScreen
            start={() => {
              playChangeScreen();
              setGameState("play");
            }}
            themeColor={themeColor}
          />
        ) : (
          <PlayScreen
            end={() => gameWon()}
            themeColor={themeColor}
            gameDifficulty={gameDifficulty}
            handleGameOver={handleGameOver}
          />
        )}
      </Layout>
    );
    // switch (gameState) {
    //   case "start":
    //     return (
    //       <Layout
    //       >
    //       </Layout>
    //     );
    //   case "play":
    //     return (
    //       <Layout
    //         gameState={gameState}
    //         themeColors={themeColors}
    //         handleThemeColor={handleThemeColor}
    //         themeColor={themeColor}
    //         goBack={goBack}
    //         isGameOverModal={isGameOverModal}
    //         open
    //       >
    //         <PlayScreen
    //           end={() => setGameState("start")}
    //           themeColor={themeColor}
    //           gameDifficulty={gameDifficulty}
    //           handleGameOver={handleGameOver}
    //         />
    //       </Layout>
    //     );
    // }
  } else {
    throw new Error("Invalid game state " + gameState);
  }
}

export default App;

const Foo = ({ children }) => {
  const GameContext = createContext();
  // states created

  const value = {};

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
