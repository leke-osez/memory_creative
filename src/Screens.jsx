import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import * as icons from "react-icons/gi";
import { Tile } from "./Tile";
import classNames from "classnames";
import useGameEngine, { numberOfTries } from "./hooks/useGameEngine";
import Button from "./components/Button";
import { RestartAlt } from "@mui/icons-material";
import flipFile2 from './assets/sound/flipFile2.wav';
import useSound from 'use-sound'

export const possibleTileContents = [
  icons.GiHearts,
  icons.GiWaterDrop,
  icons.GiDiceSixFacesFive,
  icons.GiUmbrella,
  icons.GiCube,
  icons.GiBeachBall,
  icons.GiDragonfly,
  icons.GiHummingbird,
  icons.GiFlowerEmblem,
  icons.GiOpenBook,
];

export function StartScreen({ start, themeColor }) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full aspect-square flex flex-col items-center justify-center gap-4 rounded-md" style={{backgroundColor: `${themeColor}10`}}>
        <h1 className="text-pink-600/90 font-bold text-2xl">Memory</h1>
        <p className="text-pink-600/90 font-medium text-sm">
          flip over tiles looking for pairs
        </p>
        <button
          onClick={start}
          className="bg-gradient-to-b from-pink-600/50 to-pink-600 text-white p-1 rounded-full px-9 bg"
        >
          Play
        </button>
      </div>
    </div>
  );
}

export function PlayScreen({
  end,
  themeColor,
  gameDifficulty,
  handleGameOver,
  gameWon,
}) {
  const [tiles, setTiles] = useState(null);
  const [tryCount, setTryCount] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false)
  const { setGameOverCount, gameOverCount } = useGameEngine({
    handleGameOver,
    gameDifficulty,
    currentTries: tryCount,
    isGameWon
  });
  const [flipSound] = useSound(flipFile2);

  const getTiles = (tileCount) => {
    // Throw error if count is not even.
    if (tileCount % 2 !== 0) {
      throw new Error("The number of tiles must be even.");
    }

    // Use the existing list if it exists.
    // if (tiles) return tiles;

    const pairCount = tileCount / 2;

    // Take only the items we need from the list of possibilities.
    const usedTileContents = possibleTileContents.slice(0, pairCount);

    // Double the array and shuffle it.
    const shuffledContents = usedTileContents
      .concat(usedTileContents)
      .sort(() => Math.random() - 0.5)
      .map((content) => ({ content, state: "start" }));

    console.log("start");
    setTiles(shuffledContents);
    // return shuffledContents;
  };

  const flip = (i) => {
    // Is the tile already flipped? We don’t allow flipping it back.
    if (tiles[i].state === "flipped") return;

    flipSound()

    // How many tiles are currently flipped?
    const flippedTiles = tiles.filter((tile) => tile.state === "flipped");
    const flippedCount = flippedTiles.length;

    // Don't allow more than 2 tiles to be flipped at once.
    if (flippedCount === 2) return;

    // On the second flip, check if the tiles match.
    if (flippedCount === 1) {
      setTryCount((c) => c + 1);

      const alreadyFlippedTile = flippedTiles[0];
      const justFlippedTile = tiles[i];

      let newState = "start";

      if (alreadyFlippedTile.content === justFlippedTile.content) {
        confetti({
          ticks: 100,
        });
        newState = "matched";
      }

      // After a delay, either flip the tiles back or mark them as matched.
      setTimeout(() => {
        setTiles((prevTiles) => {
          const newTiles = prevTiles.map((tile) => ({
            ...tile,
            state: tile.state === "flipped" ? newState : tile.state,
          }));

          // If all tiles are matched, the game is over.
          if (newTiles.every((tile) => tile.state === "matched")) {
            setIsGameWon(true)
            setTimeout(end, 0);
          }

          return newTiles;
        });
      }, 1000);
    }

    setTiles((prevTiles) => {
      return prevTiles.map((tile, index) => ({
        ...tile,
        state: i === index ? "flipped" : tile.state,
      }));
    });
  };

  const resetGame = () => {
    setGameOverCount(numberOfTries(gameDifficulty));
    setTryCount(0);
    getTiles(16);
  };

  useEffect(() => {
    resetGame();
  }, [gameDifficulty, handleGameOver]);

  useEffect(() => {
    getTiles(16);
  }, []);

  return (
    <div className="w-full flex flex-col gap-3 items-center justify-center ">
      <div className="w-full flex gap-3 items-center">
        <p style={{ color: themeColor }} className=" font-medium">
          Mode
        </p>
        <div
          style={{
            backgroundColor: `${themeColor}40`,
            color: themeColor,
            borderColor: themeColor,
          }}
          className="  h-7 py-[2px] px-[3px] flex items-center justify-center text-sm border-[0.3px] rounded-md capitalize"
        >
          <p>{gameDifficulty}</p>
        </div>
      </div>
      <div className="w-full flex gap-3 items-center">
        <p style={{ color: themeColor }} className="font-semibold text-lg">
          Number of tries Left
        </p>
        <p
          style={{
            backgroundColor: `${themeColor}40`,
            color: themeColor,
            borderColor: themeColor,
          }}
          className="  h-7 py-[2px] px-[3px] flex items-center justify-center text-sm border-[0.3px] rounded-md capitalize"
        >
          {gameOverCount === Infinity ? "Unlimited" : gameOverCount}
        </p>
      </div>

      {/* tries */}
      <div className="flex gap-2">
        <p style={{ color: themeColor }} className=" font-medium">
          {"Tries"}
        </p>
        <p
          style={{
            backgroundColor: `${themeColor}40`,
            color: themeColor,
            borderColor: themeColor,
          }}
          className=" h-7 py-[2px] px-[3px] flex items-center justify-center text-sm border-[0.3px] aspect-square rounded-md"
        >
          {tryCount}
        </p>
      </div>

      {/* tiles */}
      <div
        style={{ backgroundColor: `${themeColor}20` }}
        className="relative w-full grid grid-cols-4 gap-3  p-3 aspect-square rounded-md "
      >
        {tiles?.map((tile, i) => (
          <Tile
            key={i}
            flip={() => flip(i)}
            {...tile}
            themeColor={themeColor}
          />
        ))}
      </div>

      <div>
        <Button
          className="w-full flex gap-3"
          onClick={resetGame}
          themeColor={themeColor}
        >
          <p>Restart</p>
          <RestartAlt />
        </Button>
      </div>
    </div>
  );
}
