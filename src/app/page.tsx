"use client";

import { useState } from "react";

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

  return (
    <>
      <h1>Sudoku</h1>
      <div className="w-[32rem] h-[32rem] grid grid-cols-9 border-3 border-[#C2DFE3] rounded-sm gap-0">
        {game.map((row, iRow) =>
          row.map((e, iCol) => (
            <div
              key={`${iRow}${iCol}`}
              className="flex items-center justify-center text-3xl border-[#C2DFE3] focus:border-red-50"
              style={{
                fontWeight:
                  e === tabuleiro[iRow][iCol] && e !== casaVazia
                    ? "bold"
                    : "normal",
                background:
                  iRow === currentCoords.row && iCol === currentCoords.col
                    ? "#265569" // selected
                    : e === currentNum
                      ? "#2A6F8C" // same number as selected house
                      : iRow === currentCoords.row || iCol === currentCoords.col
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
