import { BoardTypes, ISettings } from "@/models/models";

export const emptyCell: BoardTypes.EmptyCell = "";

export const game = {
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

export const charMap = new Map([
  [
    "digits" as ISettings["chars"],
    new Map([
      [1, "1"],
      [2, "2"],
      [3, "3"],
      [4, "4"],
      [5, "5"],
      [6, "6"],
      [7, "7"],
      [8, "8"],
      [9, "9"],
    ]),
  ],
  [
    "kanji" as ISettings["chars"],
    new Map([
      [1, "一"],
      [2, "二"],
      [3, "三"],
      [4, "四"],
      [5, "五"],
      [6, "六"],
      [7, "七"],
      [8, "八"],
      [9, "九"],
    ]),
  ],
]);

export const themes = [
  "dark-green",
  "dark-orange",
  "blue-mono-light",
  "blue-mono-dark",
  "forest-green",
];
