import { useEffect, useRef, useState } from "react";
import { InputTime } from "./InputTime";
import type { exercisesType, workoutType } from "../types/types";

type ExercisePropType = {
  exercise: exercisesType;
  workout: workoutType;
  setWorkout: (workout: workoutType) => void;
};

export const Exercise = ({
  exercise,
  workout,
  setWorkout,
}: ExercisePropType) => {
  const currentExercise = workout.exercises.find((ex) => ex.id === exercise.id);
  const isSelectedExercise = !!currentExercise;

  const [sets, setSets] = useState<number>(currentExercise?.sets || 1);
  const [reps, setReps] = useState<number | null>(
    currentExercise?.reps || null
  );
  const [timebtwmSets, setTimebtwmSets] = useState<number>(
    currentExercise?.timeBtwnSets || 0
  );

  const [isAdditionalSetting, setIsAdditionalSetting] =
    useState<boolean>(false);
  const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Синхронизируем локальные стейты, если карточку добавили/удалили внешним кликом
  useEffect(() => {
    if (currentExercise) {
      setSets(currentExercise.sets || 1);
      setReps(currentExercise.reps || null);
      setTimebtwmSets(currentExercise.timeBtwnSets || 0);
    }
  }, [currentExercise?.id]);

  // Дебаунс для плавной отправки данных наверх без лагов при вводе цифр
  const updateWorkoutDebounced = (newExercises: exercisesType[]) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setWorkout({
        ...workout,
        exercises: newExercises,
      });
    }, 300);
  };

  useEffect(() => {
    if (!isSelectedExercise) return;

    const validReps = reps === null || reps === undefined ? 0 : reps;
    if (sets <= 0) return;

    const newExercise: exercisesType[] = workout.exercises.map((ex) => {
      if (ex.id === exercise.id) {
        return {
          ...ex,
          reps: validReps,
          sets: sets,
          timeBtwnSets: timebtwmSets,
        };
      }
      return ex;
    });

    updateWorkoutDebounced(newExercise);
  }, [sets, reps, timebtwmSets, isSelectedExercise]);

  const exerciseClick = (exercise: exercisesType) => {
    if (isSelectedExercise) {
      setWorkout({
        ...workout,
        exercises: workout.exercises.filter((ex) => ex.id !== exercise.id),
      });
      setIsOpenSettings(false);
    } else {
      setWorkout({
        ...workout,
        exercises: [
          ...workout.exercises,
          { ...exercise, sets: 1, reps: undefined },
        ],
      });
      setIsOpenSettings(true);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    (e.target as HTMLElement).blur();
  };

  const changeSets = (val: number) => {
    if (val > 0) setSets(val);
  };

  const changeReps = (val: number) => {
    if (val > 0) setReps(val);
  };

  const changeTimeSets = (val: number) => {
    if (val >= 0) setTimebtwmSets(val);
  };

  const isEmptySets = sets > 0;
  const isEmptyReps = reps !== null && reps > 0;

  return (
    <div
      className={
        isSelectedExercise
          ? `w-[250px] p-[20px] border-[#00ff14] border-1 rounded-[20px] shadow-[0px_0px_10px_0px_#00ff14]`
          : `w-[250px] p-[20px] border-1 rounded-[20px] shadow-[0px_0px_10px_0px]`
      }
    >
      <div className="h-[200px] content-center">
        <img
          loading="lazy"
          onClick={() => exerciseClick(exercise)}
          className="mb-[10px] cursor-pointer"
          src={exercise.img}
          alt={exercise.name}
        />
      </div>
      <p
        onClick={() => exerciseClick(exercise)}
        className="text-[18px] pb-[20px] cursor-pointer"
      >
        {exercise.name}
      </p>

      <div
        onClick={() => setIsOpenSettings(!isOpenSettings)}
        className="h-[20px] w-full bg-[#f7f7f7] flex justify-center items-end shadow-[0px_0px_14px_-10px] rounded-[5px] cursor-pointer"
      >
        <div
          className={
            isOpenSettings
              ? "w-[15px] mb-[0px] h-[15px] border-l-2 border-b-2 rotate-[135deg] transition-transform"
              : "w-[15px] mb-[7px] h-[15px] border-l-2 border-b-2 rotate-[-45deg] transition-transform"
          }
        ></div>
      </div>

      {isOpenSettings && (
        <div>
          {/* ПОДХОДЫ */}
          <div className="flex flex-col gap-[5px] pb-[10px]">
            <p className="text-[16px] pt-[10px]">Подходы:</p>
            <input
              onWheel={handleWheel}
              onChange={(e) => changeSets(Number(e.target.value))}
              defaultValue={sets > 0 ? sets : ""}
              type="number"
              placeholder="Количество подходов"
              className={
                !isEmptySets
                  ? "border-[2px] border-[red] px-[10px] py-[5px] rounded-[10px] focus:outline-none"
                  : "border-[1px] border-[#000000] px-[10px] py-[5px] rounded-[10px] focus:outline-none"
              }
            />
          </div>

          {/* ПОВТОРЕНИЯ */}
          {exercise.static ? (
            <InputTime
              value={reps && reps > 0 ? reps : 0}
              changeVal={changeReps}
            />
          ) : (
            <div className="flex flex-col gap-[5px] pb-[10px]">
              <p className="text-[16px]">Повторения:</p>
              <input
                onWheel={handleWheel}
                onChange={(e) => changeReps(Number(e.target.value) || 0)}
                defaultValue={reps !== null && reps > 0 ? reps : ""}
                type="number"
                placeholder="Количество повторений"
                className={
                  !isEmptyReps
                    ? "border-[2px] border-[red] px-[10px] py-[5px] rounded-[10px] focus:outline-none"
                    : "border-[1px] border-[#000000] px-[10px] py-[5px] rounded-[10px] focus:outline-none"
                }
              />
            </div>
          )}

          <div>
            <p
              onClick={() => setIsAdditionalSetting(!isAdditionalSetting)}
              className={
                isAdditionalSetting
                  ? "text-center pt-[10px] cursor-pointer underline select-none"
                  : "text-center pt-[10px] cursor-pointer select-none"
              }
            >
              Дополнительные настройки
            </p>
            {isAdditionalSetting && (
              <div className="flex flex-col gap-[5px] pt-[10px] pb-[10px]">
                <p className="text-[16px]">Отдых между подходами:</p>
                <InputTime value={timebtwmSets} changeVal={changeTimeSets} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
