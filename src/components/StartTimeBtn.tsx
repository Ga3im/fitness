import { useEffect, useState } from "react";
import type { StartTimeBtnProp } from "../types/types";

export const StartTimeBtn = ({
  addRepsBtn,
  exercise,
  time,
}: StartTimeBtnProp) => {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  let [timer, setTimer] = useState<number>(time);
  let [secondsToStart, setSecondsToStart] = useState<number>(5);

  let timerInterval: number;
  let exerciseTimer: number;

  useEffect(() => {
    if (isStarted) {
      timerInterval = setInterval(() => {
        setSecondsToStart(secondsToStart--);
        if (secondsToStart < 0) {
          clearInterval(timerInterval);
        }
      }, 900);

      return () => clearInterval(timerInterval);
    }
  }, [isStarted]);

  useEffect(() => {
    if (isStarted && secondsToStart === 0) {
      exerciseTimer = setInterval(() => {
        setTimer(timer--);
        if (timer < 0) {
          clearInterval(exerciseTimer);
          addRepsBtn(exercise, exercise.reps);
          setIsStarted(false);
          setTimer(time);
        }
      }, 1000);
    }
  }, [secondsToStart]);

  const startBtn = () => {
    setSecondsToStart(5);
    setIsStarted(!isStarted);
  };

  return (
    <button
      onClick={startBtn}
      className={
        secondsToStart <= 3
          ? "text-[red] text-[24px] flex place-self-center place-content-center w-full mt-[10px] text-[18px] rounded-[45px] bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-[#A0B000] active:text-[white] px-[16px] py-[8px] mb-[10px]"
          : "flex place-self-center text-[24px] place-content-center w-full mt-[10px] text-[18px] rounded-[45px] bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-[#A0B000] active:text-[white] px-[16px] py-[8px] mb-[10px]"
      }
    >
      {isStarted ? (secondsToStart <= 0 ? timer : secondsToStart) : "Старт"}
    </button>
  );
};
