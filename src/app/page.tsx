"use client";
import { ISettings, IToggles } from "@/models/models";
import { useGameplay } from "@/hooks/useGameplay";
import { Board } from "@/components/Board";
import { Button } from "@/components/Button";
import { useSettings } from "@/hooks/useSettings";
import { useTimer } from "@/hooks/useTimer";
import { camelCaseToTitleCase, secondsToHMS } from "@/lib/utils";
import { InputWithLabel } from "@/components/InputWithLabel";
import { game } from "@/constants/constants";

export default function Home() {
  const {
    currentGame,
    currentCoords,
    candidates,
    conflicts,
    errorsCounter,
    handleClick,
    resetBoard,
    showSolution,
  } = useGameplay(game);
  const { settings, handleToggle, handleCharChange } = useSettings();
  const { timer, startStopTimer, resetTimer } = useTimer();

  return (
    <>
      <h1 className="text-pink-200 text-4xl">Sudoku</h1>
      <div className="flex">
        <Board
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
        <div>
          <p>Timer: {secondsToHMS(timer.timer)}</p>
          <p>Errors: {errorsCounter}</p>
          <button onClick={startStopTimer}>Start/Stop</button>
          <button onClick={resetTimer}>Reset</button>
          <div className="flex flex-col">
            <p>Settings</p>
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
              onChange={(e) =>
                handleCharChange(e.target.value as ISettings["chars"])
              }
            >
              <option value={"digits" as ISettings["chars"]}>Digits</option>
              <option value={"kanji" as ISettings["chars"]}>Kanji</option>
            </select>
          </div>
        </div>
        <Button text="Reset" onClick={resetBoard} />
        <Button
          text="check"
          onClick={() => console.log("I'm only a test button :(")}
        />
        <Button text="Show Answer" onClick={showSolution} />
      </div>
    </>
  );
}
