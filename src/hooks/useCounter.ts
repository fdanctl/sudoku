import { useEffect, useState } from "react";

export function useCounter() {
  const [counter, setCounter] = useState({ active: true, counter: 0 });

  const startStopCounter = () => {
    console.log(counter.active);
    setCounter((ps) => ({ ...ps, active: !ps.active }));
  };

  const resetCounter = () => {
    setCounter({ active: false, counter: 0 });
  };

  useEffect(() => {
    const plus = counter.active ? 1 : 0;
    const countSeconds = setInterval(() => {
      setCounter((ps) => ({ ...ps, counter: ps.counter + plus }));
    }, 1000);

    return () => clearInterval(countSeconds);
  }, [counter.active]);

  return {
    counter,
    startStopCounter,
    resetCounter,
  };
}
