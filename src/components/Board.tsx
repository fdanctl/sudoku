import { BoardTypes, emptyCell, ICoords } from "@/models/models";

export function Board({
  baseBoard,
  currentGame,
  currentCoords,
}: {
  baseBoard: BoardTypes.Board;
  currentGame: BoardTypes.Board;
  currentCoords: ICoords;
}) {

  const currentNum = currentGame[currentCoords.row][currentCoords.col];

  return (
    <div className="w-[32rem] h-[32rem] grid grid-cols-9 border-3 border-[#C2DFE3] rounded-sm gap-0">
      {currentGame.map((row, iRow) =>
        row.map((e, iCol) => (
          <div
            key={`${iRow}${iCol}`}
            className="flex items-center justify-center text-3xl font-bold border-[#C2DFE3] focus:border-red-50"
            style={{
              background:
                iRow === currentCoords.row && iCol === currentCoords.col
                  ? "#265569" // selected
                  : e === currentNum && e !== emptyCell
                    ? "#2A6F8C" // same number as selected house
                    : iRow === currentCoords.row ||
                        iCol === currentCoords.col ||
                        (Math.floor(iRow / 3) ===
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
            }}
          >
            {e}
          </div>
        )),
      )}
    </div>
  );
}
