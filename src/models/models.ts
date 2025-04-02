export namespace BoardTypes {
  export type EmptyCell = "";
  export type Cell = EmptyCell | number;
  export type Board = Cell[][];
}

export interface ICoords {
  row: number,
  col: number,
}

export interface ISettings {
  highlightConflicts: boolean,
  highlightRow: boolean,
  highlightCol: boolean,
  highlightBox: boolean,
  highlightIdenticalNums: boolean,
  showTimer: boolean,
  showErrorCounter: boolean,
}

export const emptyCell: BoardTypes.EmptyCell = "";
