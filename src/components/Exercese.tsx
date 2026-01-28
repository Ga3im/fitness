import { useContext, useState } from "react";
import type { additionalSettingType, exercisesType } from "../types/types";
import { SetContext } from "../context/context";

export const Exercese = ({ i, errInfo, setErrInfo }) => {
  const [additionalSetting, setAdditionalSetting] =
    useState<additionalSettingType>({
      isTimeReps: false,
      isTimeSets: false,
      noSets: false,
      noReps: false,
    });
  const [isAdditionalSetting, setIsAdditionalSetting] =
    useState<boolean>(false);
  const [exercesId, setExercesId] = useState<string[]>([]);
  const { workout, changeWorkout } = useContext(SetContext);

  const exerciseClick = (exercise: exercisesType) => {
    if (workout.workouts.length === 0) {
      setExercesId([...exercesId, exercise.id]);
      changeWorkout({ ...workout, workouts: [...workout.workouts, exercise] });
    } else {
      workout.workouts.map((i: exercisesType) => {
        if (i.id === exercise.id) {
          changeWorkout({
            ...workout,
            workouts: workout.workouts.filter(
              (item: exercisesType) => item.id !== exercise.id
            ),
          });
          setErrInfo({
            ...errInfo,
            reps: errInfo.reps.filter((i: string) => i !== exercise.id),
          });
        }
      });
      setExercesId(exercesId.filter((item) => item !== exercise.id));
      if (!exercesId.includes(exercise.id)) {
        setExercesId([...exercesId, exercise.id]);
        changeWorkout({
          ...workout,
          workouts: [...workout.workouts, exercise],
        });
      }
    }
  };

  const changeSets = (e, exercise) => {
    workout.workouts[workout.workouts.indexOf(exercise)].sets = Number(
      e.target.value
    );
  };

  const changeReps = (e, exercise) => {
    workout.workouts[workout.workouts.indexOf(exercise)].reps = Number(
      e.target.value
    );
    setErrInfo({
      ...errInfo,
      reps: errInfo.reps.filter((i: string) => i !== exercise.id),
    });
  };

  return (
    <>
      <div
        key={i.id}
        className={
          exercesId.includes(i.id)
            ? `w-[300px] p-[20px] border-[#00ff14] border-1 rounded-[20px] cursor-pointer shadow-[0px_0px_10px_0px_#00ff14]`
            : `w-[300px] p-[20px] border-1 rounded-[20px] cursor-pointer shadow-[0px_0px_10px_0px]`
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
        {exercesId.includes(i.id) ? (
          <div>
            <div
              onClick={() => exerciseClick(i)}
              className="h-[30px] w-full bg-[#f7f7f7] flex justify-center items-end shadow-[0px_0px_20px_-5px] rounded-[5px]"
            >
              <div className="w-[20px] h-[20px] border-l-2 border-b-2 rotate-[135deg]"></div>
            </div>

            {!additionalSetting.noSets && (
              <div className="flex flex-col gap-[5px] pb-[10px]">
                <p className="text-[20px] pt-[10px]">Подходы:</p>
                <input
                  onChange={(e) => changeSets(e, i)}
                  className="border-[1px] border-[#000000] px-[16px] py-[8px] rounded-[10px]"
                  type="number"
                  value="1"
                  placeholder="Количество подходов"
                />
              </div>
            )}

            {!additionalSetting.noReps && (
              <div className="flex flex-col gap-[5px] pb-[10px]">
                <p className="text-[20px]">Повторения:</p>
                <input
                  onChange={(e) => changeReps(e, i)}
                  className={
                    errInfo.reps.includes(i.id)
                      ? "border-[2px] border-[red] px-[16px] py-[8px] rounded-[10px]"
                      : "border-[1px] border-[#000000] px-[16px] py-[8px] rounded-[10px]"
                  }
                  type="number"
                  placeholder="Количество повторений"
                />
              </div>
            )}

            {additionalSetting.noReps && additionalSetting.noSets && (
              <>
                <div className="flex flex-col gap-[5px] pb-[10px]">
                  <p className="text-[20px] pt-[10px]">Подходы:</p>
                  <input
                    onChange={(e) => changeSets(e, i)}
                    className="border-[1px] border-[#000000] px-[16px] py-[8px] rounded-[10px]"
                    type="number"
                    placeholder="Количество подходов"
                  />
                </div>
                <div className="flex flex-col gap-[5px] pb-[10px]">
                  <p className="text-[20px]">Повторения:</p>
                  <input
                    onChange={(e) => changeReps(e, i)}
                    className={
                      errInfo.reps.includes(i.id)
                        ? "border-[2px] border-[red] px-[16px] py-[8px] rounded-[10px]"
                        : "border-[1px] border-[#000000] px-[16px] py-[8px] rounded-[10px]"
                    }
                    type="number"
                    placeholder="Количество повторений"
                  />
                </div>
              </>
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
                  <div className="flex items-start gap-[10px] pb-[!0px]">
                    <input
                      onChange={(e) =>
                        setAdditionalSetting({
                          ...additionalSetting,
                          noSets: e.target.checked,
                        })
                      }
                      checked={additionalSetting.noSets ? true : false}
                      className="relative top-[8px]"
                      type="checkbox"
                    />
                    <p>Учет по повторениям</p>
                  </div>
                  <div className="flex items-start gap-[10px] pb-[!0px]">
                    <input
                      onChange={(e) =>
                        setAdditionalSetting({
                          ...additionalSetting,
                          noReps: e.target.checked,
                        })
                      }
                      checked={additionalSetting.noReps ? true : false}
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
        ) : null}
      </div>
    </>
  );
};
