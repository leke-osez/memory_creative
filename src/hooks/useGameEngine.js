import React, { useEffect, useState } from "react";

export const numberOfTries = (gameDifficulty) => {
  return gameDifficulty === "hard"
    ? 13
    : gameDifficulty === "medium"
    ? 30
    : Infinity;
};

const useGameEngine = ({ handleGameOver, gameDifficulty, currentTries, isGameWon }) => {
  const maxNumberOfTries = numberOfTries(gameDifficulty);

  const [gameOverCount, setGameOverCount] = useState(maxNumberOfTries);

  useEffect(() => {
    if (gameOverCount === 0 ) {
      handleGameOver();
    } else {
      setGameOverCount(maxNumberOfTries - currentTries);
    }
  }, [gameOverCount, currentTries,]);

  return { setGameOverCount, gameOverCount };
};

export default useGameEngine;
