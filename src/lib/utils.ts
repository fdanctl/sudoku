import { emptyCell } from "@/constants/constants";
import { BoardTypes, ICoords } from "@/models/models";

export const seeConflicts = (board: BoardTypes.Board, coords: ICoords) => {
  // collumn
  const collumn = [];
  for (let i = 0; i < 9; i++) {
    if (i !== coords.row) {
      collumn.push(board[i][coords.col]);
    }
  }

  // block
  const startRow = Math.floor(coords.row / 3) * 3;
  const startCol = Math.floor(coords.col / 3) * 3;

  const block = [];

  for (let row = startRow; row < startRow + 3; row++) {
    for (let col = startCol; col < startCol + 3; col++) {
      if (row !== coords.row || col !== coords.col) {
        block.push(board[row][col]);
      }
    }
  }

  return board[coords.row]
    .filter((_, i) => i !== coords.col)
    .concat(collumn as BoardTypes.Cell[])
    .concat(block as BoardTypes.Cell[])
    .filter((e) => e !== emptyCell);
};

export const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const camelCaseToTitleCase = (string: string) => {
  return capitalize(string.replaceAll(/[A-Z]/g, " $&"));
};

export const secondsToHMS = (seconds: number) => {
  const doubleDigitsOption = {
    minimumIntegerDigits: 2,
    useGrouping: false,
  };
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds - 3600 * h) / 60);
  const s = (seconds - h * 3600 - 60 * m).toLocaleString(
    "en-US",
    doubleDigitsOption,
  );

  return `${h > 0 ? h + ":" : ""}${h > 0 ? m.toLocaleString("en-US", doubleDigitsOption) : m}:${s}`;
};
