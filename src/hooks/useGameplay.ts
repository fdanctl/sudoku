import { useEffect, useState } from "react";
import { BoardTypes, emptyCell, ICoords } from "@/models/models";

export function useGameplay(baseBoard: BoardTypes.Board) {
  const [currentGame, setCurrentGame] = useState(baseBoard);
  const [currentCoords, setCurrentCoords] = useState<ICoords>({
    row: 0,
    col: 0,
  });
  const [candidateMode, setCandidateMode] = useState(false);
  const [candidates, setCandidates] = useState(
    baseBoard.map((row) => row.map((e) => Array(9).fill(false))),
  );

  const currentNum = currentGame[currentCoords.row][currentCoords.col];

  const handleClick = (row: number, col: number) => {
    setCurrentCoords({ row: row, col: col });
  };


  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Shift") {
        console.log("up")
        setCandidateMode(false);
      }
    };

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
        case "shift":
          setCandidateMode(true);
          break;
        case "backspace":
        case "delete":
          setCurrentGame((ps) =>
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
              event.code.match(/[1-9]/)
          ) {
            console.log(event.code)
            if (candidateMode) {
              setCandidates((ps) =>
                ps.map((row, i) =>
                  row.map((e, j) =>
                    i === currentCoords.row && j === currentCoords.col
                      ? e.map((bool, x) => x === Number(event.code.replace(/[a-zA-Z]/g, "")) - 1 ? !bool : bool)
                      : e,
                  )))
          } else {
            setCurrentGame((ps) =>
              ps.map((row, i) =>
                row.map((e, j) =>
                  i === currentCoords.row && j === currentCoords.col
                    ? Number(event.code.replace(/[a-zA-Z]/g,""))
                    : e,
                ),
              ),
            );
          }
      }
      break;
    }
  };

  document.addEventListener("keyup", handleKeyUp);
  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("keyup", handleKeyUp);
    document.removeEventListener("keydown", handleKeyDown);
  };
}, [currentCoords, candidateMode, candidates]);

return {
  currentGame,
  setCurrentGame,
  currentCoords,
  candidates,
  handleClick,
};
}
