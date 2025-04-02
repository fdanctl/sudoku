"use client";
import { emptyCell } from "@/models/models";

import { useGameplay } from "@/hooks/useGameplay";
import { Board } from "@/components/Board";
import { Button } from "@/components/Button";

const tabuleiro = [
  [5, 3, emptyCell, emptyCell, 7, emptyCell, emptyCell, emptyCell, emptyCell],
  [6, emptyCell, emptyCell, 1, 9, 5, emptyCell, emptyCell, emptyCell],
  [emptyCell, 9, 8, emptyCell, emptyCell, emptyCell, emptyCell, 6, emptyCell],
  [8, emptyCell, emptyCell, emptyCell, 6, emptyCell, emptyCell, emptyCell, 3],
  [4, emptyCell, emptyCell, 8, emptyCell, 3, emptyCell, emptyCell, 1],
  [7, emptyCell, emptyCell, emptyCell, 2, emptyCell, emptyCell, emptyCell, 6],
  [emptyCell, 6, emptyCell, emptyCell, emptyCell, emptyCell, 2, 8, emptyCell],
  [emptyCell, emptyCell, emptyCell, 4, 1, 9, emptyCell, emptyCell, 5],
  [emptyCell, emptyCell, emptyCell, emptyCell, 8, emptyCell, emptyCell, 7, 9],
];

export default function Home() {
  const { game, currentCoords } = useGameplay(tabuleiro);

  return (
    <>
      <h1 className="text-pink-200 text-4xl">Sudoku</h1>
      <div className="flex">
        <Board
          baseBoard={tabuleiro}
          currentGame={game}
          currentCoords={currentCoords}
        />
        <div>
          <p>Settings</p>
          <input type="checkbox" name="highlightConflicts" id="highlightConflicts" />
          <label htmlFor="highlightConflicts">Highlight Conflicts</label>
        </div>
        <Button text="Reset" onClick={() => console.log("reset")} />
        <Button text="Show Answer" onClick={() => console.log("show")} />
      </div>
    </>
  );
}
