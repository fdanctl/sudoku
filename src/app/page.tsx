"use client";
import { ISettings, IToggles } from "@/models/models";
import { useGameplay } from "@/hooks/useGameplay";
import { Board } from "@/components/Board";
import { Button } from "@/components/Button";
import { useSettings } from "@/hooks/useSettings";
import { useTimer } from "@/hooks/useTimer";
import { camelCaseToTitleCase, changeTheme, secondsToHMS } from "@/lib/utils";
import { InputWithLabel } from "@/components/InputWithLabel";
import { game, themes } from "@/constants/constants";
import { useEffect } from "react";

export default function Home() {
  const { settings, handleToggle, handleCharChange } = useSettings();
  const { timer, startStopTimer, resetTimer } = useTimer();
  const {
    currentGame,
    currentCoords,
    candidates,
    conflicts,
    errorsCounter,
    resetErrors,
    handleClick,
    resetBoard,
    showSolution,
  } = useGameplay(timer.active, game);

  useEffect(() => {
    if (JSON.stringify(currentGame) === JSON.stringify(game.solution)) {
      startStopTimer();
    }
  }, [currentGame]);

  return (
    <>
      <div className="flex items-top justify-center gap-4">
        <div className="relative">
          <h1 className="text-center text-bold text-4xl">Sudoku</h1>
          {(JSON.stringify(currentGame) === JSON.stringify(game.solution) && (
            <div className="z-50 absolute w-[32rem] h-[32rem] bg-background opacity-90 flex items-center justify-center rounded-sm">
              <div className="w-60 h-24 rounded-xs flex flex-col justify-center items-center text-center">
                <p className="text-bold text-3xl">You win!</p>
              </div>
            </div>
          )) ||
            (!timer.active && (
              <div className="z-50 absolute w-[32rem] h-[32rem] bg-background opacity-85 flex items-center justify-center rounded-sm">
                <div className="w-60 h-24 rounded-xs flex flex-col justify-center items-center text-center">
                  <p>Game is paused</p>
                  <p
                    className="cursor-pointer mt-3 font-bold"
                    onClick={startStopTimer}
                  >
                    Resume
                  </p>
                </div>
              </div>
            ))}
          <Board
            style={`${!timer.active ? "blur-xs" : ""}`}
            baseBoard={game.board}
            currentGame={currentGame}
            currentCoords={currentCoords}
            candidates={
              settings.togles.autoCandidate
                ? conflicts.map((row) =>
                  row.map((e) =>
                    Array(9)
                      .fill(true)
                      .map((_, i) => !e.includes(i + 1)),
                  ),
                )
                : candidates
            }
            conflicts={conflicts}
            onClick={handleClick}
            settings={settings}
          />
          <div className="text-center text-outerBorderColor text-xs mt-1.5">
            <p>Movement: wasd, arrows keys or hjkl</p>
            <p>Insert Candidate: shift + number</p>
            <p>Undo: ctrl+z or u</p>
          </div>
        </div>
        <div className="mt-9">
          <div className="grid grid-cols-2 w-fit gap-x-1 h-12">
            <p
              className={`font-bold ${settings.togles.showTimer ? "" : "hidden"}`}
            >
              Timer:
            </p>
            <p className={`${settings.togles.showTimer ? "" : "hidden"}`}>
              {secondsToHMS(timer.timer)}
            </p>
            <p
              className={`font-bold ${settings.togles.showErrorCounter ? "" : "hidden"}`}
            >
              Errors:
            </p>
            <p
              className={`${settings.togles.showErrorCounter ? "" : "hidden"}`}
            >
              {errorsCounter}
            </p>
          </div>
          <div className="flex flex-col mt-3">
            <p className="font-bold mb-1.5">Settings</p>
            {Object.keys(settings.togles).map((key) => (
              <InputWithLabel
                key={key}
                checked={settings.togles[key as keyof IToggles]}
                id={key}
                name={key}
                labelText={camelCaseToTitleCase(key)}
                onChange={() => handleToggle(key as keyof IToggles)}
              />
            ))}
            <select
              className="bg-background"
              onChange={(e) =>
                handleCharChange(e.target.value as ISettings["chars"])
              }
              value={settings.chars}
            >
              <option value={"digits" as ISettings["chars"]}>Digits</option>
              <option value={"kanji" as ISettings["chars"]}>Kanji</option>
            </select>
            <select
              className="bg-background"
              onChange={(e) => changeTheme(e.target.value)}
              value={document.documentElement.className}
            >
              {themes.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
            <div className="flex mt-10 gap-1">
              <Button
                text="Reset"
                onClick={() => {
                  resetBoard();
                  resetTimer();
                  resetErrors();
                }}
              />
              <Button
                text={timer.active ? "Pause" : "Resume"}
                onClick={startStopTimer}
              />
            </div>
            <div className="mt-1">
              <Button
                style="w-full"
                text="Show Answer"
                onClick={showSolution}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
