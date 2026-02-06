import { useEffect } from "react";
import type { StopwatchropType } from "../types/types";

export const Stopwatch = ({ time, setTime }: StopwatchropType) => {
  let interval: number;
  const timeHHMMSS = (time: number): string => {
    let hour;
    let HH;
    if (time >= 3600) {
      hour = Math.floor(time / 3600);
      HH = hour.toString().padStart(2, "0");
    }
    let min = Math.floor((time / 60) % 60);
    let sec = time % 60;

    let MM = min.toString().padStart(2, "0");
    let SS = sec.toString().padStart(2, "0");
    return time >= 3600 ? `${HH}:${MM}:${SS}` : `${MM}:${SS}`;
  };

  useEffect(() => {
    interval = setInterval(() => {
      setTime(time++);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return <p>{timeHHMMSS(time)}</p>;
};
