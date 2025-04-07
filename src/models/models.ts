export namespace BoardTypes {
  export type EmptyCell = "";
  export type Cell = EmptyCell | number;
  export type Board = Cell[][];
}

export interface ICoords {
  row: number;
  col: number;
}

export interface IToggles {
  highlightConflicts: boolean;
  highlightRow: boolean;
  highlightCol: boolean;
  highlightBox: boolean;
  highlightIdenticalNumbers: boolean;
  showTimer: boolean;
  showErrorCounter: boolean;
  autoCandidate: boolean;
}

export interface ISettings {
  togles: IToggles;
  chars: "digits" | "kanji";
}

export interface IGameHistory {
  coords: ICoords;
  previousCell: BoardTypes.Cell;
  newCell: BoardTypes.Cell;
}
