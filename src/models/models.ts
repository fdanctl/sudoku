export namespace BoardTypes {
  export type EmptyCell = "";
  export type Cell = EmptyCell | number;
  export type Board = Cell[][];
}

export interface ICoords {
  row: number,
  col: number,
}

export const emptyCell: BoardTypes.EmptyCell = "";
