import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { exercisesType, workoutType } from "../types/types";
import { InputTime } from "./InputTime";

type ExercisePropType = {
  exercise: exercisesType;
  workout: workoutType;
  setWorkout: Dispatch<SetStateAction<workoutType>>;
};

export const Exercise = ({
  exercise,
  workout,
  setWorkout,
}: ExercisePropType) => {
  const [isAdditionalSetting, setIsAdditionalSetting] =
    useState<boolean>(false);
  const [reps, setReps] = useState<number | null>(null);
  const [timebtwmSets, setTimebtwmSets] = useState<number>(0);
  const [sets, setSets] = useState<number>(1);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const updateWorkoutDebounced = (newExercises: exercisesType[]) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setWorkout({
        ...workout,
        exercises: newExercises,
      });
    }, 500);
  };

  useEffect(() => {
    const newExercise: exercisesType[] = workout.exercises.map((ex) => {
      if (ex.id === exercise.id) {
        return {
          ...ex,
          reps: reps,
          sets: sets,
          timeBtwnSets: timebtwmSets,
        };
      }
      return ex;
    });
    updateWorkoutDebounced(newExercise);
  }, [sets, reps, timebtwmSets]);

  const exerciseClick = (exercise: exercisesType) => {
    if (isSelected) {
      setWorkout({
        ...workout,
        exercises: workout.exercises.filter((ex) => ex.id !== exercise.id),
      });

      setIsSelected(false);
    } else {
      setWorkout({
        ...workout,
        exercises: [...workout.exercises, { ...exercise, sets: 1 }],
      });

      setIsSelected(true);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    (e.target as HTMLElement).blur();
  };

  const changeSets = (val: number) => {
    if (val > 0) {
      setSets(val);
    }
  };

  const changeReps = (val: number) => {
    if (val > 0) {
      setReps(val);
    }
  };

  const changeTimeSets = (val: number) => {
    if (val > 0) {
      setTimebtwmSets(val);
    }
  };

  const isSelectedExercise = workout.exercises.some(
    (ex) => ex.id === exercise.id
  );

  const isEmptySets = workout.exercises.some((ex) => (ex.sets ?? 0) > 0);
  const isEmptyReps = workout.exercises.some((ex) => (ex.reps ?? 0) > 0);
  const currentExercise = workout.exercises.find((ex) => ex.id === exercise.id);

  const repsValue = currentExercise?.reps || 0;
  const setsValue = currentExercise?.sets || 1;

  return (
    <>
      <div
        key={exercise.id}
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
            className="mb-[10px]"
            src={exercise.img}
          />
        </div>
        <p
          onClick={() => exerciseClick(exercise)}
          className="text-[18px] pb-[20px]"
        >
          {exercise.name}
        </p>

        <div
          onClick={() => setIsSelected(!isSelected)}
          className={
            "h-[20px] w-full bg-[#f7f7f7] flex justify-center items-end shadow-[0px_0px_14px_-10px] rounded-[5px]"
          }
        >
          <div
            className={
              isSelected
                ? "w-[15px] mb-[0px] h-[15px] border-l-2 border-b-2 rotate-[135deg]"
                : "w-[15px] mb-[7px] h-[15px] border-l-2 border-b-2 rotate-[-45deg]"
            }
          ></div>
        </div>
        {isSelected && (
          <div>
            <div className="flex flex-col gap-[5px] pb-[10px]">
              <p className="text-[16px] pt-[10px]">Подходы:</p>
              <input
                onWheel={(e) => handleWheel(e)}
                onChange={(e) => changeSets(Number(e.target.value))}
                className={
                  !isEmptySets
                    ? "border-[2px] border-[red] px-[10px] py-[5px] rounded-[10px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:margin-[0] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:margin-[0]"
                    : "border-[1px] border-[#000000] px-[10px] py-[5px] rounded-[10px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:margin-[0] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:margin-[0]"
                }
                type="number"
                defaultValue={setsValue}
                placeholder="Количество подходов"
              />
            </div>

            <div className="flex flex-col gap-[5px] pb-[10px]">
              <p className="text-[16px]">Повторения:</p>
              <input
                onWheel={handleWheel}
                onChange={(e) => changeReps(Number(e.target.value))}
                className={
                  !isEmptyReps
                    ? "border-[2px] border-[red] px-[10px] py-[5px] rounded-[10px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:margin-[0] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:margin-[0]"
                    : "border-[1px] border-[#000000] px-[10px] py-[5px] rounded-[10px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:margin-[0] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:margin-[0]"
                }
                type="number"
                placeholder="Количество повторений"
                defaultValue={repsValue}
              />
            </div>

            <div>
              <p
                onClick={() => setIsAdditionalSetting(!isAdditionalSetting)}
                className={
                  isAdditionalSetting
                    ? "text-center pt-[10px] cursor-pointer underline"
                    : "text-center pt-[10px] cursor-pointer"
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
        <button className="mt-[10px] text-[16px] w-full rounded-[45px] bg-[#BCEC30] px-[16px] hover:bg-[#C6FF00] hover:cursor-pointer">
          Добавить
        </button>
      </div>
    </>
  );
};
