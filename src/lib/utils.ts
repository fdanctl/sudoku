import { BoardTypes, emptyCell, ICoords } from "@/models/models";

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
