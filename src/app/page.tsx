"use client";

import { KeyboardEvent, useEffect, useState } from "react";

const casaVazia = "";
const tabuleiro = [
  [5, 3, casaVazia, casaVazia, 7, casaVazia, casaVazia, casaVazia, casaVazia],
  [6, casaVazia, casaVazia, 1, 9, 5, casaVazia, casaVazia, casaVazia],
  [casaVazia, 9, 8, casaVazia, casaVazia, casaVazia, casaVazia, 6, casaVazia],
  [8, casaVazia, casaVazia, casaVazia, 6, casaVazia, casaVazia, casaVazia, 3],
  [4, casaVazia, casaVazia, 8, casaVazia, 3, casaVazia, casaVazia, 1],
  [7, casaVazia, casaVazia, casaVazia, 2, casaVazia, casaVazia, casaVazia, 6],
  [casaVazia, 6, casaVazia, casaVazia, casaVazia, casaVazia, 2, 8, casaVazia],
  [casaVazia, casaVazia, casaVazia, 4, 1, 9, casaVazia, casaVazia, 5],
  [casaVazia, casaVazia, casaVazia, casaVazia, 8, casaVazia, casaVazia, 7, 9],
];

export default function Home() {
  const [game, setGame] = useState(tabuleiro);
  const [currentCoords, setCurrentCoords] = useState({ row: 0, col: 0 });

  const currentNum = game[currentCoords.row][currentCoords.col];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(event.key.toLowerCase())
      switch (event.key.toLowerCase()) {
        case "w":
        case "arrowup":
        case "k":
          setCurrentCoords((ps) => ({ ...ps, row: Math.max(0, ps.row - 1) }));
          break;
        case "s":
        case "arrowdown":
        case "j":
          setCurrentCoords((ps) => ({ ...ps, row: Math.min(8, ps.row + 1) }));
          break;
        case "a":
        case "arrowleft":
        case "h":
          setCurrentCoords((ps) => ({ ...ps, col: Math.max(0, ps.col - 1) }));
          break;
        case "d":
        case "arrowright":
        case "l":
          setCurrentCoords((ps) => ({ ...ps, col: Math.min(8, ps.col + 1) }));
          break;

        case "backspace":
        case "delete":
            setGame((ps) =>
              ps.map((row, i) =>
                row.map((e, j) =>
                  i === currentCoords.row && j === currentCoords.col
                    ? casaVazia
                    : e,
                ),
              ),
            );
            break;
        default:
          if (
            (currentNum === casaVazia ||
              currentNum !== tabuleiro[currentCoords.row][currentCoords.col]) &&
            /[1-9]/.test(event.key)
          ) {
            console.log(currentCoords);
            setGame((ps) =>
              ps.map((row, i) =>
                row.map((e, j) =>
                  i === currentCoords.row && j === currentCoords.col
                    ? event.key
                    : e,
                ),
              ),
            );
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentCoords]);

  return (
    <>
      <h1 className="text-pink-200 text-4xl">Sudoku</h1>
      <div className="w-[32rem] h-[32rem] grid grid-cols-9 border-3 border-[#C2DFE3] rounded-sm gap-0">
        {game.map((row, iRow) =>
          row.map((e, iCol) => (
            <div
              key={`${iRow}${iCol}`}
              className="flex items-center justify-center text-3xl font-bold border-[#C2DFE3] focus:border-red-50"
              style={{
                background:
                  iRow === currentCoords.row && iCol === currentCoords.col
                    ? "#265569" // selected
                    : e === currentNum && e !== casaVazia
                      ? "#2A6F8C" // same number as selected house
                      : iRow === currentCoords.row ||
                        iCol === currentCoords.col ||
                        (Math.floor(iRow / 3) ===
                          Math.floor(currentCoords.row / 3) &&
                          Math.floor(iCol / 3) ===
                          Math.floor(currentCoords.col / 3))
                        ? "#637F8C" // same row or same col
                        : e === tabuleiro[iRow][iCol] && e !== casaVazia
                          ? "#5C6B73" // disabled color
                          : "#9DB4C0", // default
                borderLeftWidth: iCol % 3 === 0 ? "3px" : "1px",
                borderRightWidth: (iCol + 1) % 3 === 0 ? "3px" : "1px",
                borderTopWidth: iRow % 3 === 0 ? "3px" : "1px",
                borderBottomWidth: (iRow + 1) % 3 === 0 ? "3px" : "1px",
              }}
            >
              {e}
            </div>
          )),
        )}
      </div>
    </>
  );
}
