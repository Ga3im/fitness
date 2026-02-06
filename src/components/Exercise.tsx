import { useContext, useState } from "react";
import type { ExercisePropType, exercisesType } from "../types/types";
import { SetContext } from "../context/context";
import { InputTime } from "./InputTime";

export const Exercise = ({ i, emptyReps, setEmptyReps }: ExercisePropType) => {
  const [isAdditionalSetting, setIsAdditionalSetting] =
    useState<boolean>(false);
  const [isSetting, setIsSetting] = useState<boolean>(false);
  const [exercisesId, setExercisesId] = useState<string[]>([]);
  const { workout, changeWorkout, additionalSetting, setAdditionalSetting } =
    useContext(SetContext);

  const exerciseClick = (exercise: exercisesType) => {
    if (exercisesId.includes(exercise.id)) {
      workout.exercises.map((i: exercisesType) => {
        if (i.id === exercise.id) {
          delete exercise.reps;
          changeWorkout({
            ...workout,
            exercises: workout.exercises.filter(
              (item: exercisesType) => item.id !== exercise.id
            ),
          });
        }
      });
      setExercisesId([...exercisesId.filter((i) => i !== exercise.id)]);
      setIsSetting(false);
    } else {
      exercise.sets = 1;
      changeWorkout({
        ...workout,
        exercises: [...workout.exercises, exercise],
      });

      setExercisesId([...exercisesId, exercise.id]);
      setIsSetting(true);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    (e.target as HTMLElement).blur();
  };

  const changeReps = (val: string, exercise: exercisesType) => {
    if (Number(val) > 0) {
      workout.exercises[workout.exercises.indexOf(exercise)].reps = Number(val);
      setEmptyReps(emptyReps.filter((i: string) => i !== exercise.id));
    }
  };

  const changeSets = (
    e: React.ChangeEvent<HTMLInputElement>,
    exercise: exercisesType
  ) => {
    if (Number(e.target.value) > 0) {
      workout.exercises[workout.exercises.indexOf(exercise)].sets = Number(
        e.target.value
      );
    }
  };

  const accountingBySets = (exercise: exercisesType) => {
    if (additionalSetting.noSets.includes(exercise.id)) {
      setAdditionalSetting({
        ...additionalSetting,
        noSets: [
          additionalSetting.noSets.filter((i: string) => i !== exercise.id),
        ],
      });
    } else {
      setAdditionalSetting({
        ...additionalSetting,
        noSets: [...additionalSetting.noSets, exercise.id],
      });
    }
  };

  return (
    <>
      <div
        key={i.id}
        className={
          exercisesId.includes(i.id)
            ? `w-[300px] p-[20px] border-[#00ff14] border-1 rounded-[20px] shadow-[0px_0px_10px_0px_#00ff14]`
            : `w-[300px] p-[20px] border-1 rounded-[20px] shadow-[0px_0px_10px_0px]`
        }
      >
        <img
          onClick={() => exerciseClick(i)}
          className="mb-[10px]"
          src={i.img}
        />
        <p onClick={() => exerciseClick(i)} className="text-[24px] pb-[20px]">
          {i.name}
        </p>

        <div
          onClick={() => setIsSetting(!isSetting)}
          className="h-[30px] w-full bg-[#f7f7f7] flex justify-center items-end shadow-[0px_0px_14px_-10px] rounded-[5px]"
        >
          <div
            className={
              isSetting
                ? "w-[15px] mb-[3px] h-[15px] border-l-2 border-b-2 rotate-[135deg]"
                : "w-[15px] mb-[12px] h-[15px] border-l-2 border-b-2 rotate-[-45deg]"
            }
          ></div>
        </div>
        {isSetting && (
          <div>
            <div className="flex flex-col gap-[5px] pb-[10px]">
              <p className="text-[20px] pt-[10px]">Подходы:</p>
              <input
                onWheel={(e) => handleWheel(e)}
                onChange={(e) => changeSets(e, i)}
                className="border-[1px] border-[#000000] px-[16px] py-[8px] rounded-[10px]"
                type="number"
                defaultValue="1"
                placeholder="Количество подходов"
              />
            </div>

            {!additionalSetting.noSets.includes(i.id) && i.static ? (
              <div className="flex flex-col gap-[5px] pb-[10px]">
                <p className="text-[20px]">Время:</p>
                <InputTime i={i} changeReps={changeReps} />
              </div>
            ) : (
              <div className="flex flex-col gap-[5px] pb-[10px]">
                <p className="text-[20px]">Повторения:</p>
                <input
                  onWheel={handleWheel}
                  onChange={(e) => changeReps(e.target.value, i)}
                  className={
                    emptyReps.includes(i.id)
                      ? "border-[2px] border-[red] px-[16px] py-[8px] rounded-[10px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:margin-[0] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:margin-[0]"
                      : "border-[1px] border-[#000000] px-[16px] py-[8px] rounded-[10px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:margin-[0] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:margin-[0]"
                  }
                  type="number"
                  placeholder="Количество повторений"
                  value={i.reps}
                />
              </div>
            )}

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
                <div className="pt-[10px]">
                  <div
                    onClick={() => accountingBySets(i)}
                    className="flex items-start gap-[10px] pb-[!0px]"
                  >
                    <input
                      checked={additionalSetting.noSets.includes(i.id)}
                      className="relative top-[8px]"
                      type="checkbox"
                    />
                    <p>Учет по подходам</p>
                  </div>

                  <div className="flex flex-col gap-[5px] pt-[10px] pb-[10px]">
                    <p className="text-[20px]">Отдых между подходами:</p>
                    <input
                      className="border-[1px] border-[#000000] px-[16px] py-[8px] rounded-[10px]"
                      type="number"
                      placeholder="Отдых между подходами"
                    />
                  </div>
                  <div className="flex flex-col gap-[5px] pb-[20px]">
                    <p className="text-[20px]">Отдых между повторами:</p>
                    <input
                      className="border-[1px] border-[#000000] px-[16px] py-[8px] rounded-[10px]"
                      type="number"
                      placeholder="Отдых между повторениями"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
