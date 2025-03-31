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

  return (
    <>
      <h1>Sudoku</h1>
      <div className="w-[32rem] h-[32rem] grid grid-cols-9 border-2 border-[#7D909A] rounded-sm gap-0">
        {game.map((row, iRow) =>
          row.map((e, iCol) => (
            <div
              key={`${iRow}${iCol}`}
              className="flex items-center justify-center text-3xl border-[#9DB4C0] focus:border-red-50"
              style={{
                fontWeight:
                  e === tabuleiro[iRow][iCol] && e !== casaVazia
                    ? "bold"
                    : "normal",
                color:
                  e === tabuleiro[iRow][iCol] && e !== casaVazia
                    ? "white"
                    : "black",
                background:
                  iRow === currentCoords.row && iCol === currentCoords.col
                    ? "#265569" // selected
                    : iRow === currentCoords.row || iCol === currentCoords.col
                      ? "#C2DFE3" // same row or same col
                      : e === tabuleiro[iRow][iCol] && e !== casaVazia
                        ? "#5C6B73" // disabled color
                        : "#E0FBFC", // default
                borderLeftWidth: iCol % 3 === 0 ? "2px" : "1px",
                borderLeftColor: iCol % 3 === 0 ? "#7D909A" : "#9DB4C0",
                borderRightWidth: (iCol + 1) % 3 === 0 ? "2px" : "1px",
                borderRightColor: (iCol + 1) % 3 === 0 ? "#7D909A" : "#9DB4C0",
                borderTopWidth: iRow % 3 === 0 ? "2px" : "1px",
                borderTopColor: iRow % 3 === 0 ? "#7D909A" : "#9DB4C0",
                borderBottomWidth: (iRow + 1) % 3 === 0 ? "2px" : "1px",
                borderBottomColor: (iRow + 1) % 3 === 0 ? "#7D909A" : "#9DB4C0",
                borderColor:
                  iRow === currentCoords.row && iCol === currentCoords.col
                    ? "#00B2FF"
                    : "",
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
