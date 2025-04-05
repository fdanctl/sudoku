import { useEffect, useState } from "react";
import { BoardTypes, emptyCell, ICoords, IGameHistory } from "@/models/models";
import { seeConflicts } from "@/lib/utils";

export function useGameplay(game: {
  board: BoardTypes.Board;
  solution: Number[][];
}) {
  // current game state
  const [currentGame, setCurrentGame] = useState<BoardTypes.Board>(game.board);

  // coordenates of the current cell
  const [currentCoords, setCurrentCoords] = useState<ICoords>({
    row: 0,
    col: 0,
  });

  // user unput candidates by cell [row][cell][candidate-1]
  // true is a candidate
  const [candidates, setCandidates] = useState<boolean[][][]>(
    game.board.map((row) => row.map(() => Array(9).fill(false))),
  );

  // set the conflicts a cell have
  const [conflicts, setConflicts] = useState<number[][][]>(
    currentGame.map((row, iRow) =>
      row.map((_, iCol) => seeConflicts(currentGame, { row: iRow, col: iCol })),
    ),
  );

  const [errorsCounter, setErrorsCounter] = useState<number>(0);

  // record users actions
  const [gameHistory, setGameHistory] = useState<IGameHistory[]>([]);

  const currentNum = currentGame[currentCoords.row][currentCoords.col];

  const handleChangeCell = (coords: ICoords, value: BoardTypes.Cell) => {
    setCurrentGame((ps) =>
      ps.map((row, i) =>
        row.map((e, j) =>
          i === coords.row && j === coords.col ? value : e,
        ),
      ),
    );
  }

  // mouse support
  const handleClick = (row: number, col: number) => {
    setCurrentCoords({ row: row, col: col });
  };

  const resetBoard = () => {
    setCurrentGame(game.board);
    setCandidates(game.board.map((row) => row.map(() => Array(9).fill(false))));
  };

  const showSolution = () => {
    setCurrentGame(game.solution as BoardTypes.Board);
  };

  const deleteCell = () => {
    handleChangeCell(currentCoords, emptyCell)
    setGameHistory((ps) => [
      {
        coords: currentCoords,
        previousCell: currentNum,
        newCell: emptyCell,
      },
      ...ps,
    ]);
  };

  // update conflicts everytime the game is updated
  useEffect(() => {
    setConflicts(
      currentGame.map((row, iRow) =>
        row.map((_, iCol) =>
          seeConflicts(currentGame, { row: iRow, col: iCol }),
        ),
      ),
    );
  }, [currentGame]);

  // key press listener
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // movement keys (arows, wasd, hjkl)
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

        // delete cell key backspace or delete
        case "backspace":
        case "delete":
          deleteCell();
          break;

        default:
          // undo, "u" or "ctrl+z"
          // gameHistory.length > 0 to avoid error
          if (
            (event.key === "u" && gameHistory.length > 0) ||
            (event.ctrlKey && event.key === "z" && gameHistory.length > 0)
          ) {
            // go to prev coords
            setCurrentCoords(gameHistory[0].coords);
            // set prev cell
            handleChangeCell(gameHistory[0].coords, gameHistory[0].previousCell)
            // remove last move from history
            setGameHistory((ps) => [...ps].slice(1));
          }

          // if (currentNum is "" or currentNum is diferent than game start)
          // and key have a number (Numpad1, Digit1,...) ignore F1, F2, ...
          // and ...
          if (
            (currentNum === emptyCell ||
              currentNum !==
                game.board[currentCoords.row][currentCoords.col]) &&
            event.code.match(/[1-9]/) &&
            !event.code.match(/[fF]/)
          ) {
            // regex to remove letter from event.code
            // Numpad1 = 1; Digit1 = 1; ...
            const numberPressed = Number(event.code.replace(/[a-zA-Z]/g, ""));
            // ... shiftKey is pressed, add candidate to cell
            if (event.shiftKey) {
              deleteCell();
              setCandidates((ps) =>
                ps.map((row, i) =>
                  row.map((e, j) =>
                    i === currentCoords.row && j === currentCoords.col
                      ? e.map((bool, x) =>
                          x === numberPressed - 1 ? !bool : bool,
                        )
                      : e,
                  ),
                ),
              );
            // ... shiftKey is not pressed, change cell
            } else {
              handleChangeCell(currentCoords, numberPressed)
              setGameHistory((ps) => [
                {
                  coords: currentCoords,
                  previousCell: currentNum,
                  newCell: numberPressed,
                },
                ...ps,
              ]);
              // check if the pressed number is a conflict
              // if true update errorCounter + 1
              if (
                conflicts[currentCoords.row][currentCoords.col].includes(
                  numberPressed,
                )
              ) {
                setErrorsCounter((ps) => ps + 1);
              }
            }
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // removeEventListener on umounting when the effect re-runs
    // to avoid multiple listeners run simultaneously
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentCoords, candidates, currentGame]);

  return {
    currentGame,
    currentCoords,
    candidates,
    conflicts,
    errorsCounter,
    handleClick,
    resetBoard,
    showSolution,
  };
}
