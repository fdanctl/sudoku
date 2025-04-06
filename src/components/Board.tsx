import { BoardTypes, emptyCell, ICoords, ISettings } from "@/models/models";

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
  const charMap = new Map([
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
  const currentNum = currentGame[currentCoords.row][currentCoords.col];

  return (
    <div className="w-[32rem] h-[32rem] grid grid-cols-9 border-3 border-[#C2DFE3] rounded-sm gap-0 select-none">
      {currentGame.map((row, iRow) =>
        row.map((e, iCol) => (
          <div
            onClick={() => onClick(iRow, iCol)}
            key={`${iRow}${iCol}`}
            className="flex items-center justify-center text-3xl font-bold border-[#C2DFE3] focus:border-red-50"
            style={{
              color:
                e !== emptyCell && conflicts[iRow][iCol].includes(e)
                  ? "red"
                  : "",
              background:
                iRow === currentCoords.row && iCol === currentCoords.col
                  ? "#265569" // selected
                  : e === currentNum &&
                    e !== emptyCell &&
                    settings.togles.highlightIdenticalNums
                    ? "#2A6F8C" // same number as selected house
                    : (settings.togles.highlightRow &&
                      iRow === currentCoords.row) ||
                      (settings.togles.highlightCol &&
                        iCol === currentCoords.col) ||
                      (settings.togles.highlightBox &&
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
