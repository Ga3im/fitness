import { useEffect, useState } from "react";
import type { StartTimeBtnProp } from "../types/types";
import useSound from "use-sound";
import boopSfx from "/sounds/notification.mp3";

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
  const [play, { stop }] = useSound(boopSfx, {
    volume: 0.5, 
    playbackRate: 1, 
    interrupt: true, 
  });

  // обратный отсчет
  useEffect(() => {
    if (isStarted) {
      timerInterval = setInterval(() => {
        setSecondsToStart(secondsToStart--);
        if (secondsToStart <= 2 && secondsToStart >= 0) {
          play();
        }
        if (secondsToStart < 0) {
          clearInterval(timerInterval);
          stop();
        }
      }, 900);

      return () => clearInterval(timerInterval);
    }
  }, [isStarted]);

  // таймер
  useEffect(() => {
    if (isStarted && secondsToStart === 0) {
      exerciseTimer = setInterval(() => {
        setTimer(timer--);
        if (timer <= 2 && timer >= 0) {
          play();
        }
        if (timer < 0) {
          clearInterval(exerciseTimer);
          stop();
          addRepsBtn(exercise, Number(exercise.reps));
          if (!exercise.done) {
            setTimer(time);
          }
          setIsStarted(false);
        }
      }, 1000);
    }
  }, [secondsToStart]);

  const startBtn = () => {
    setSecondsToStart(5);
    setIsStarted(!isStarted);
  };

  return (
    <>
      <button
        onClick={startBtn}
        className={
          "flex place-self-center place-content-center w-full mt-[10px] text-[18px] rounded-[45px] bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-[#A0B000] active:text-[white] px-[16px] py-[3px] mb-[10px]"
        }
      >
        {isStarted ? (
          secondsToStart <= 0 ? (
            <span
              className={timer <= 3 ? "text-[24px] text-[red]" : "text-[24px]"}
            >
              {timeHHMMSS(timer)}
            </span>
          ) : (
            <span
              className={
                secondsToStart <= 3 ? "text-[24px] text-[red]" : "text-[24px]"
              }
            >
              {secondsToStart}
            </span>
          )
        ) : (
          "Старт"
        )}
      </button>
    </>
  );
};
