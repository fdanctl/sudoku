import { emptyCell, charMap } from "@/constants/constants";
import { BoardTypes, ICoords, ISettings } from "@/models/models";

export function Board({
  style,
  baseBoard,
  currentGame,
  currentCoords,
  candidates,
  conflicts,
  onClick,
  settings,
}: {
  style?: string;
  baseBoard: BoardTypes.Board;
  currentGame: BoardTypes.Board;
  currentCoords: ICoords;
  candidates: boolean[][][];
  conflicts: number[][][];
  onClick: (row: number, col: number) => void;
  settings: ISettings;
}) {
  const currentNum = currentGame[currentCoords.row][currentCoords.col];

  const styleTail = (e: BoardTypes.Cell, row: number, col: number) => {
    const textColor =
      e !== emptyCell && conflicts[row][col].includes(e) && settings.togles.highlightConflicts
        ? "text-conflict "
        : "";
    const backgroundColor =
      row === currentCoords.row && col === currentCoords.col
        ? "bg-selected" // selected
        : e === currentNum &&
          e !== emptyCell &&
          settings.togles.highlightIdenticalNumbers
          ? "bg-identical" // same number as selected house
          : (settings.togles.highlightRow && row === currentCoords.row) ||
            (settings.togles.highlightCol && col === currentCoords.col) ||
            (settings.togles.highlightBox &&
              Math.floor(row / 3) === Math.floor(currentCoords.row / 3) &&
              Math.floor(col / 3) === Math.floor(currentCoords.col / 3))
            ? "bg-highlight" // same row, same col or same block
            : e === baseBoard[row][col] && e !== emptyCell
              ? "bg-disabled" // disabled color
              : "bg-default"; // default

    const borderRightWidth =
      col !== 8 && (col + 1) % 3 === 0 ? "border-r-[4px]" : "border-r-[1px]";
    const borderBottomWidth =
      row !== 8 && (row + 1) % 3 === 0 ? "border-b-[4px]" : "border-b-[1px]";

    const display = e === emptyCell ? "grid " : "";

    return `${display}${textColor}${backgroundColor} ${borderRightWidth} ${borderBottomWidth}`;
  };

  return (
    <div
      className={`w-[32rem] h-[32rem] grid grid-cols-9 border-6 border-outerBorderColor rounded-sm gap-0 select-none ${style}`}
    >
      {currentGame.map((row, iRow) =>
        row.map((e, iCol) => (
          <div
            onClick={() => onClick(iRow, iCol)}
            key={`${iRow}${iCol}`}
            className={`flex items-center justify-center text-3xl font-bold border-innerBorderColor grid-cols-3 grid-rows-3 ${styleTail(e, iRow, iCol)}`}
          >
            {e !== emptyCell
              ? charMap.get(settings.chars)?.get(e)
              : candidates[iRow][iCol].map((bool, i) => (
                <p
                  key={`${iRow}${iCol}${i}`}
                  className="text-[0.6rem] flex items-center justify-center"
                >
                  {bool ? charMap.get(settings.chars)?.get(i + 1) : emptyCell}
                </p>
              ))}
          </div>
        )),
      )}
    </div>
  );
}
