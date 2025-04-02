import { useSettings } from "@/hooks/useSettings";
import { BoardTypes, emptyCell, ICoords, ISettings } from "@/models/models";

export function Board({
  baseBoard,
  currentGame,
  currentCoords,
  candidates,
  onClick,
  settings,
}: {
  baseBoard: BoardTypes.Board;
  currentGame: BoardTypes.Board;
  currentCoords: ICoords;
  candidates: boolean[][][];
  onClick: (row: number, col: number) => void;
  settings: ISettings;
}) {
  const currentNum = currentGame[currentCoords.row][currentCoords.col];

  return (
    <div className="w-[32rem] h-[32rem] grid grid-cols-9 border-3 border-[#C2DFE3] rounded-sm gap-0">
      {currentGame.map((row, iRow) =>
        row.map((e, iCol) => (
          <div
            onClick={() => onClick(iRow, iCol)}
            key={`${iRow}${iCol}`}
            className="flex items-center justify-center text-3xl font-bold border-[#C2DFE3] focus:border-red-50"
            style={{
              background:
                iRow === currentCoords.row && iCol === currentCoords.col
                  ? "#265569" // selected
                  : e === currentNum &&
                    e !== emptyCell &&
                    settings.highlightIdenticalNums
                    ? "#2A6F8C" // same number as selected house
                    : (settings.highlightRow && iRow === currentCoords.row) ||
                      (settings.highlightCol && iCol === currentCoords.col) ||
                      (settings.highlightBox &&
                        Math.floor(iRow / 3) ===
                        Math.floor(currentCoords.row / 3) &&
                        Math.floor(iCol / 3) ===
                        Math.floor(currentCoords.col / 3))
                      ? "#637F8C" // same row, same col or same block
                      : e === baseBoard[iRow][iCol] && e !== emptyCell
                        ? "#5C6B73" // disabled color
                        : "#9DB4C0", // default
              borderLeftWidth: iCol % 3 === 0 ? "3px" : "1px",
              borderRightWidth: (iCol + 1) % 3 === 0 ? "3px" : "1px",
              borderTopWidth: iRow % 3 === 0 ? "3px" : "1px",
              borderBottomWidth: (iRow + 1) % 3 === 0 ? "3px" : "1px",

              display: e === emptyCell ? "grid" : "flex",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(3, 1fr)",
            }}
          >
            {e !== emptyCell
              ? e
              : candidates[iRow][iCol].map((bool, i) => (
                <p className="text-[0.6rem] flex items-center justify-center">
                  {bool ? i + 1: emptyCell}
                </p>
              ))}
          </div>
        )),
      )}
    </div>
  );
}
