import { emptyCell, charMap } from "@/constants/constants";
import { BoardTypes, ICoords, ISettings } from "@/models/models";

export function Board({
  baseBoard,
  currentGame,
  currentCoords,
  candidates,
  conflicts,
  onClick,
  settings,
}: {
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
      e !== emptyCell && conflicts[row][col].includes(e)
        ? "text-conflict "
        : "";
    const backgroundColor =
      row === currentCoords.row && col === currentCoords.col
        ? "bg-selected" // selected
        : e === currentNum &&
            e !== emptyCell &&
            settings.togles.highlightIdenticalNums
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

    const borderLeftWidth = col % 3 === 0 ? "border-l-[3px]" : "border-l-[1px]";
    const borderRightWidth =
      (col + 1) % 3 === 0 ? "border-r-[3px]" : "border-r-[1px]";
    const borderTopWidth = row % 3 === 0 ? "border-t-[3px]" : "border-t-[1px]";
    const borderBottomWidth =
      (row + 1) % 3 === 0 ? "border-b-[3px]" : "border-b-[1px]";
    const display = e === emptyCell ? "grid " : "";

    return `${display}${textColor}${backgroundColor} ${borderLeftWidth} ${borderRightWidth} ${borderTopWidth} ${borderBottomWidth}`;
  };

  return (
    <div className="w-[32rem] h-[32rem] grid grid-cols-9 border-3 border-outerBorderColor rounded-sm gap-0 select-none">
      {currentGame.map((row, iRow) =>
        row.map((e, iCol) => (
          <div
            onClick={() => onClick(iRow, iCol)}
            key={`${iRow}${iCol}`}
            className={`flex items-center justify-center text-3xl font-bold border-innerBorderColor grid-cols-3 grid-rows-3 ${styleTail(e, iRow, iCol)}`}
            //          style={{
            //            color:
            //              e !== emptyCell && conflicts[iRow][iCol].includes(e)
            //                ? "red"
            //                : "",
            //            background:
            //              iRow === currentCoords.row && iCol === currentCoords.col
            //                ? "#265569" // selected
            //                : e === currentNum &&
            //                  e !== emptyCell &&
            //                  settings.togles.highlightIdenticalNums
            //                  ? "#2A6F8C" // same number as selected house
            //                  : (settings.togles.highlightRow &&
            //                    iRow === currentCoords.row) ||
            //                    (settings.togles.highlightCol &&
            //                      iCol === currentCoords.col) ||
            //                    (settings.togles.highlightBox &&
            //                      Math.floor(iRow / 3) ===
            //                      Math.floor(currentCoords.row / 3) &&
            //                      Math.floor(iCol / 3) ===
            //                      Math.floor(currentCoords.col / 3))
            //                    ? "#637F8C" // same row, same col or same block
            //                    : e === baseBoard[iRow][iCol] && e !== emptyCell
            //                      ? "#5C6B73" // disabled color
            //                      : "#9DB4C0", // default
            //            borderLeftWidth: iCol % 3 === 0 ? "3px" : "1px",
            //            borderRightWidth: (iCol + 1) % 3 === 0 ? "3px" : "1px",
            //            borderTopWidth: iRow % 3 === 0 ? "3px" : "1px",
            //            borderBottomWidth: (iRow + 1) % 3 === 0 ? "3px" : "1px",

            //            display: e === emptyCell ? "grid" : "flex",
            //          }}
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
