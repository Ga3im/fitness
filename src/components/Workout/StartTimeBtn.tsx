import { useEffect, useState } from "react";
import type { exercisesType, workoutType } from "../../types/types";
import useSound from "use-sound";
import boopSfx from "/sounds/notification.mp3";
import { useWorkout } from "../../hooks/Workout/useWorkout";

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

type StartTimeBtnProp = {
  exercise: exercisesType;
  time: number;
  displayWorkout: workoutType;
};

export const StartTimeBtn = ({
  exercise,
  time,
  displayWorkout,
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

  const { handleAddReps } = useWorkout(displayWorkout);

  useEffect(() => {
    if (isStarted && secondsToStart > 0) {
      timerInterval = setInterval(() => {
        setSecondsToStart((prev) => {
          const next = prev - 1;

          if (next <= 2 && next >= 0) {
            play();
          }

          if (next === 0) {
            clearInterval(timerInterval);
            stop();
          }

          return next;
        });
      }, 1000);
    }

    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [isStarted, secondsToStart]);

  // Основной таймер упражнения
  useEffect(() => {
    if (isStarted && secondsToStart === 0) {
      exerciseTimer = setInterval(() => {
        setTimer((prev) => {
          const next = prev - 1;

          if (next <= 2 && next >= 0) {
            play();
          }

          if (next < 0) {
            clearInterval(exerciseTimer);
            stop();

            setIsStarted((currentStarted) => {
              if (currentStarted) {
                handleAddReps(exercise, Number(exercise.reps));
                if (!exercise.done) {
                  setTimer(time); 
                }
              }
              return false; 
            });
          }

          return next;
        });
      }, 1000);
    }

    return () => {
      if (exerciseTimer) clearInterval(exerciseTimer);
    };
  }, [isStarted, secondsToStart, time, exercise]);

  // Функция клика по кнопке
  const startBtn = () => {
    if (isStarted) {
      setIsStarted(false);
      setTimer(time);
      setSecondsToStart(0);
      stop();
      console.log("stop");
    } else {
      setSecondsToStart(5);
      setIsStarted(true);
    }
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
