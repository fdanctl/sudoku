import { useEffect, useState } from "react";
import { BoardTypes, emptyCell, ICoords } from "@/models/models";

export function useGameplay(baseBoard: BoardTypes.Board) {
  const [game, setGame] = useState(baseBoard);
  const [currentCoords, setCurrentCoords] = useState<ICoords>({
    row: 0,
    col: 0,
  });

  const currentNum = game[currentCoords.row][currentCoords.col];

  const handleClick = (row: number, col: number) => {
    setCurrentCoords({ row: row, col: col });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(event.key.toLowerCase());
      switch (event.key.toLowerCase()) {
        case "w":
        case "arrowup":
        case "k":
          setCurrentCoords((ps) => ({ ...ps, row: Math.max(0, ps.row - 1) }));
          break;
        case "s":
        case "arrowdown":
        case "j":
          setCurrentCoords((ps) => ({ ...ps, row: Math.min(8, ps.row + 1) }));
          break;
        case "a":
        case "arrowleft":
        case "h":
          setCurrentCoords((ps) => ({ ...ps, col: Math.max(0, ps.col - 1) }));
          break;
        case "d":
        case "arrowright":
        case "l":
          setCurrentCoords((ps) => ({ ...ps, col: Math.min(8, ps.col + 1) }));
          break;
        case "backspace":
        case "delete":
          setGame((ps) =>
            ps.map((row, i) =>
              row.map((e, j) =>
                i === currentCoords.row && j === currentCoords.col
                  ? emptyCell
                  : e,
              ),
            ),
          );

        default:
          if (
            (currentNum === emptyCell ||
              currentNum !== baseBoard[currentCoords.row][currentCoords.col]) &&
            /[1-9]/.test(event.key)
          ) {
            console.log(currentCoords);
            setGame((ps) =>
              ps.map((row, i) =>
                row.map((e, j) =>
                  i === currentCoords.row && j === currentCoords.col
                    ? Number(event.key)
                    : e,
                ),
              ),
            );
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentCoords]);

  return {
    game,
    currentCoords,
    handleClick,
  };
}
