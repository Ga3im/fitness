import type { StopwatchropType } from "../types/types";
import { timeHHMMSS } from "../utils/functions";

export const Stopwatch = ({ time }: StopwatchropType) => {

  return <p>{timeHHMMSS(time)}</p>;
};
