"use client";
import { emptyCell } from "@/models/models";
import { useGameplay } from "@/hooks/useGameplay";
import { Board } from "@/components/Board";
import { Button } from "@/components/Button";
import { useSettings } from "@/hooks/useSettings";

const game = {
  board: [
    [5, 3, emptyCell, emptyCell, 7, emptyCell, emptyCell, emptyCell, emptyCell],
    [6, emptyCell, emptyCell, 1, 9, 5, emptyCell, emptyCell, emptyCell],
    [emptyCell, 9, 8, emptyCell, emptyCell, emptyCell, emptyCell, 6, emptyCell],
    [8, emptyCell, emptyCell, emptyCell, 6, emptyCell, emptyCell, emptyCell, 3],
    [4, emptyCell, emptyCell, 8, emptyCell, 3, emptyCell, emptyCell, 1],
    [7, emptyCell, emptyCell, emptyCell, 2, emptyCell, emptyCell, emptyCell, 6],
    [emptyCell, 6, emptyCell, emptyCell, emptyCell, emptyCell, 2, 8, emptyCell],
    [emptyCell, emptyCell, emptyCell, 4, 1, 9, emptyCell, emptyCell, 5],
    [emptyCell, emptyCell, emptyCell, emptyCell, 8, emptyCell, emptyCell, 7, 9],
  ],
  solution: [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
  ],
};

export default function Home() {
  const { currentGame, setCurrentGame, currentCoords, handleClick } =
    useGameplay(game.board);
  const { settings, setSettings } = useSettings();

  return (
    <>
      <h1 className="text-pink-200 text-4xl">Sudoku</h1>
      <div className="flex">
        <Board
          baseBoard={game.board}
          currentGame={currentGame}
          currentCoords={currentCoords}
          onClick={handleClick}
          settings={settings}
        />
        <div>
          <p>Settings</p>
          <input
            type="checkbox"
            onChange={() => {
              console.log("yellow");
              setSettings((ps) => ({ ...ps, highlightBox: !ps.highlightBox }));
            }}
            checked={settings.highlightBox}
          />
        </div>
        <Button text="Reset" onClick={() => setCurrentGame(game.board)} />
        <Button text="check" onClick={() => console.log(settings)} />
        <Button
          text="Show Answer"
          onClick={() => setCurrentGame(game.solution)}
        />
      </div>
    </>
  );
}
