import { useEffect, useState } from "react";
import { BoardTypes, emptyCell, ICoords, IGameHistory } from "@/models/models";
import { seeConflicts } from "@/lib/utils";

export function useGameplay(game: {
  board: BoardTypes.Board;
  solution: Number[][];
}) {
  const [currentGame, setCurrentGame] = useState<BoardTypes.Board>(game.board);
  const [currentCoords, setCurrentCoords] = useState<ICoords>({
    row: 0,
    col: 0,
  });
  const [candidates, setCandidates] = useState<boolean[][][]>(
    game.board.map((row) => row.map(() => Array(9).fill(false))),
  );

  const [conflicts, setConflicts] = useState<number[][][]>(
    currentGame.map((row, iRow) =>
      row.map((_, iCol) => seeConflicts(currentGame, { row: iRow, col: iCol })),
    ),
  );
  const [errorsCounter, setErrorsCounter] = useState<number>(0);
  const [gameHistory, setGameHistory] = useState<IGameHistory[]>([]);

  const currentNum = currentGame[currentCoords.row][currentCoords.col];

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
    setCurrentGame((ps) =>
      ps.map((row, i) =>
        row.map((e, j) =>
          i === currentCoords.row && j === currentCoords.col ? emptyCell : e,
        ),
      ),
    );
    setGameHistory((ps) => [
      {
        coords: currentCoords,
        previousCell: currentGame[currentCoords.row][currentCoords.col],
        newCell: emptyCell,
      },
      ...ps,
    ]);
  };

  useEffect(() => {
    setConflicts(
      currentGame.map((row, iRow) =>
        row.map((_, iCol) =>
          seeConflicts(currentGame, { row: iRow, col: iCol }),
        ),
      ),
    );
  }, [currentGame]);

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
          deleteCell();
          break;

        default:
          if (
            (event.key === "u" && gameHistory.length > 0) ||
            (event.ctrlKey && event.key === "z" && gameHistory.length > 0)
          ) {
            setCurrentCoords(gameHistory[0].coords);
            setCurrentGame((ps) =>
              ps.map((row, i) =>
                row.map((e, j) =>
                  i === gameHistory[0].coords.row &&
                    j === gameHistory[0].coords.col
                    ? gameHistory[0].previousCell
                    : e,
                ),
              ),
            );
            setGameHistory((ps) => [...ps].slice(1));
          }
          if (
            (currentNum === emptyCell ||
              currentNum !==
              game.board[currentCoords.row][currentCoords.col]) &&
            event.code.match(/[1-9]/) &&
            !event.code.match(/[fF]/)
          ) {
            console.log(event.code);
            const numberPressed = Number(event.code.replace(/[a-zA-Z]/g, ""));
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
            } else {
              setCurrentGame((ps) =>
                ps.map((row, i) =>
                  row.map((e, j) =>
                    i === currentCoords.row && j === currentCoords.col
                      ? numberPressed
                      : e,
                  ),
                ),
              );
              setGameHistory((ps) => [
                {
                  coords: currentCoords,
                  previousCell:
                    currentGame[currentCoords.row][currentCoords.col],
                  newCell: numberPressed,
                },
                ...ps,
              ]);
              // see if error
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
