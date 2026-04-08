import type { Dispatch, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../../store/features/store";
import type { workoutType } from "../../types/types";
import { timeHHMMSS } from "../../utils/functions";
import { BottomBtn } from "../BottomBtn";
import { Stopwatch } from "../Stopwatch";
import {
  setCompleteWorkout,
  setStartWorkout,
  setTimeSets,
  setWorkouts,
} from "../../store/features/workoutSlice";
import { useNavigate } from "react-router-dom";
import { router } from "../../pages/router";
import { Button } from "../Button";
import { useWakeLock } from "../../hooks/useWakeLock";
import { useWorkout } from "../../hooks/Workout/useWorkout";

type DoneWorkoutType = {
  isEdit: boolean;
  displayWorkout: workoutType | null;
  userWeight: number | null;
  setIsConfirm: Dispatch<SetStateAction<boolean>>;
  setIsEnteringWeight: Dispatch<SetStateAction<boolean>>;
};

export const DoneWorkout = ({
  isEdit,
  displayWorkout,
  userWeight,
  setIsConfirm,
  setIsEnteringWeight,
}: DoneWorkoutType) => {
  const { workouts, workoutTime, startedWorkout } = useAppSelector(
    (state) => state.workoutSlice
  );
  const { requestWakeLock } = useWakeLock();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { doneWorkout } = useWorkout(displayWorkout);

  const editWeightBtn = () => {
    setIsEnteringWeight(true);
  };

  const saveEdittedWorkout = () => {};

  const startWorkout = () => {
    dispatch(setTimeSets(0));
    if (!displayWorkout) return;
    requestWakeLock();
    if (displayWorkout.needWeight) {
      setIsEnteringWeight(true);
    } else {
      dispatch(setStartWorkout(displayWorkout));
    }
  };

  const returnToMain = () => {
    dispatch(setCompleteWorkout({ id: displayWorkout?.id }));
    navigate(router.main);
  };

  const deleteWorkout = () => {
    dispatch(setWorkouts(workouts.filter((i) => i.id !== displayWorkout?.id)));
    navigate(router.main);
  };

  return (
    <div className="mx-[20px] mb-[10px]">
      {doneWorkout ? (
        <div>
          <p className="text-[24px] text-shadow-[0px_0px_10px] text-center mt-[10px] text-[#00bd44]">
            Тренировка закончена
          </p>
          <div className="flex justify-center items-center">
            <svg viewBox="0 0 32 32" width="20px" height="20px">
              <path d="M 16 4 C 9.382813 4 4 9.382813 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z M 16 6 C 21.535156 6 26 10.464844 26 16 C 26 21.535156 21.535156 26 16 26 C 10.464844 26 6 21.535156 6 16 C 6 10.464844 10.464844 6 16 6 Z M 15 8 L 15 17 L 22 17 L 22 15 L 17 15 L 17 8 Z" />
            </svg>

            <span className="font-medium pl-[5px]">
              {timeHHMMSS(workoutTime)}
            </span>

            {displayWorkout?.timeLimit && (
              <p>
                /{" "}
                <span className="font-medium">
                  {timeHHMMSS(displayWorkout.timeLimit)}
                </span>{" "}
                мин
              </p>
            )}
          </div>
          <button
            onClick={returnToMain}
            className="mt-[10px] text-[16px] w-full rounded-[45px] bg-[#BCEC30] px-[16px] py-[8px] hover:bg-[#C6FF00] hover:cursor-pointer"
          >
            Вернуться на главное
          </button>
        </div>
      ) : startedWorkout !== null &&
        displayWorkout &&
        startedWorkout.id === displayWorkout.id ? (
        <>
          <div className="text-center text-[20px] pb-[10px]">
            Время тренировки: <Stopwatch time={workoutTime} />{" "}
          </div>

          <Button onClick={() => setIsConfirm(true)} color="#ec3030">
            Завершить тренировку
          </Button>
        </>
      ) : (
        <>
          {displayWorkout?.timeLimit && (
            <>
              <div className="flex justify-center text-[20px]">
                Время на тренировку:
                <span className="pl-[5px]">
                  {timeHHMMSS(displayWorkout.timeLimit)} мин
                </span>
              </div>
              {userWeight && (
                <div
                  className="text-center mt-[10px] text-[18px]"
                  onClick={editWeightBtn}
                >
                  Ваш вес: {userWeight} кг
                </div>
              )}
            </>
          )}
          {startedWorkout !== null &&
          displayWorkout &&
          startedWorkout.id !== displayWorkout.id ? null : isEdit ? (
            <BottomBtn onClick={saveEdittedWorkout} btnText={"Сохранить"} />
          ) : (
            <BottomBtn onClick={startWorkout} btnText={"Начать тренировку"} />
          )}
          {displayWorkout && displayWorkout.custom && (
            <p
              onClick={deleteWorkout}
              className="mt-[30px] text-center cursor-pointer hover:underline text-[red]"
            >
              Удалить тренировку
            </p>
          )}
        </>
      )}
    </div>
  );
};
