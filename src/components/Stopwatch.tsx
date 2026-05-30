import { useAppSelector } from "../store/store";
import { timeHHMMSS } from "../utils/functions";

export const Stopwatch = () => {
  const { workoutTime } = useAppSelector((state) => state.workoutSlice);
  return <p>{timeHHMMSS(workoutTime)}</p>;
};
