import { useEffect, useState } from "react";

export function useTimer() {
  const [timer, setTimer] = useState({ active: true, timer: 0 });

  const startStopTimer = () => {
    console.log(timer.active);
    setTimer((ps) => ({ ...ps, active: !ps.active }));
  };

  const resetTimer = () => {
    setTimer({ active: true, timer: 0 });
  };

  useEffect(() => {
    const plus = timer.active ? 1 : 0;
    const countSeconds = setInterval(() => {
      setTimer((ps) => ({ ...ps, timer: ps.timer + plus }));
    }, 1000);

    return () => clearInterval(countSeconds);
  }, [timer.active]);

  return {
    timer,
    startStopTimer,
    resetTimer,
  };
}
