import { useState } from "react";
import { exercises } from "../../data";
import { useWorkout } from "../../hooks/Workout/useWorkout";
import { useAppSelector } from "../../store/features/store";
import type { exercisesType, workoutType } from "../../types/types";
import { timeHHMMSS } from "../../utils/functions";
import { InputTime } from "../InputTime";
import { AddingExercise } from "./AddingExercise";
import { ResultTable } from "./ResultTable";
import { StartTimeBtn } from "./StartTimeBtn";

type ExerciseProccessProp = {
  displayWorkout: workoutType | null;
  addingQueue: boolean;
  isAddingExercise: boolean;
  isEdit: boolean;
};

export const ExerciseProccess = ({
  displayWorkout,
  addingQueue,
  isAddingExercise,
  isEdit,
}: ExerciseProccessProp) => {
  const { startedWorkout, restTimeSets } = useAppSelector(
    (state) => state.workoutSlice
  );
  const [editReps, setEditReps] = useState<number | null>(null);

  const {
    prossesingExercise,
    handleAddReps,
    setIsEnteringWeight,
    repsRef,
    exerciseQueue,
    setExerciseQueue,
  } = useWorkout(displayWorkout);

  const selectQueue = (exercise: exercisesType) => {
    if (exerciseQueue.some((ex) => ex.id === exercise.id)) {
      setExerciseQueue(exerciseQueue.filter((ex) => ex.id !== exercise.id));
    } else {
      setExerciseQueue([...exerciseQueue, exercise]);
    }
  };

  const editRepsFunc = (val: number) => {
    if (val > 0) {
      setEditReps(val);
    }
  };

  return (
    <div className="flex flex-wrap gap-[10px] justify-center py-[30px] mb-[10px] bg-white rounded-[30px] w-full shadow-[0px_0px_10px_-7px]">
      {isAddingExercise && (
        <AddingExercise
          displayWorkout={displayWorkout}
          exercises={exercises.filter((ex): ex is exercisesType => !!ex)}
        />
      )}
      {displayWorkout?.exercises.map(
        (exercise: exercisesType, index: number) => (
          <div
            onClick={() => selectQueue(exercise)}
            className="w-[300px] p-[20px] border-[black] border-1 rounded-[20px] shadow-[0px_0px_15px_-10px]"
          >
            {addingQueue &&
              isEdit &&
              (exerciseQueue.some((ex) => ex.id === exercise.id) ? (
                <div className="w-[25px] flex justify-center items-center font-medium text-[20px] text-[#1F2937] bg-[#BCEC30] h-[25px] border-1 border-[#000] place-self-end rounded-full">
                  <p>
                    {exerciseQueue.findIndex((ex) => ex.id === exercise.id) + 1}
                  </p>
                </div>
              ) : (
                <div
                  onClick={() => selectQueue(exercise)}
                  className="w-[25px] h-[25px] border-1 border-[#000] place-self-end rounded-full"
                ></div>
              ))}

            <div className="h-[250px] flex items-center">
              <img
                className="cursor-pointer w-full"
                src={exercise.img}
                alt=""
              />
            </div>
            <p className="text-[24px] h-auto">{exercise.name}</p>

            <div>
              {
                <>
                  <div className="flex flex-col gap-[5px] pb-[10px]">
                    {exercise.sets && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center"
                      >
                        <span>Подходы:</span>
                        {isEdit ? (
                          <input
                            className="ml-[5px] border-[1px] border-[#000000] px-[10px] w-[100%] py-[5px] rounded-[10px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:margin-[0] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:margin-[0]"
                            type="number"
                            // onChange={(e)=> setEditWorkout({...displayWorkout, exercises: })}
                            defaultValue={exercise.sets}
                          />
                        ) : (
                          <span className="ml-[3px]"> {exercise.sets}</span>
                        )}
                      </div>
                    )}

                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center"
                    >
                      <div className="inline">
                        {exercise.static ? (
                          "Время: "
                        ) : displayWorkout.needWeight ? (
                          <p
                            onClick={() => setIsEnteringWeight(true)}
                            className="cursor-pointer hover:font-bold"
                          >
                            Введите вес вашего тела
                          </p>
                        ) : (
                          `Повторения: `
                        )}
                      </div>

                      <span>
                        {exercise.static && exercise.reps !== undefined ? (
                          timeHHMMSS(exercise.reps) + " мин"
                        ) : isEdit ? (
                          <input
                            className="border-[1px] border-[#000000] px-[10px] py-[5px] w-[100%] rounded-[10px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:margin-[0] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:margin-[0]"
                            type="number"
                            defaultValue={exercise.reps}
                          />
                        ) : (
                          exercise.reps
                        )}
                      </span>
                    </div>
                    {exercise.timeBtwnSets && exercise.timeBtwnSets > 0 && (
                      <div>
                        <span>Отдых:</span>
                        {isEdit ? (
                          <InputTime
                            value={Number(exercise.timeBtwnSets)}
                            changeVal={editRepsFunc}
                          />
                        ) : (
                          <span>
                            {timeHHMMSS(Number(exercise.timeBtwnSets))}
                            мин
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  {exercise.doneReps !== undefined && ( // таблица
                    <ResultTable exercise={exercise} />
                  )}
                  {exercise.doneReps &&
                  (exercise.reps ?? 0) * (exercise.sets ?? 0) <=
                    exercise.doneReps ? (
                    <p className="text-[24px] text-shadow-[0px_0px_10px] text-center mt-[10px] text-[#00bd44]">
                      Сделано
                    </p>
                  ) : exercise.static ? (
                    <>
                      {startedWorkout !== null &&
                        startedWorkout.id === displayWorkout.id && (
                          <StartTimeBtn
                            exercise={exercise}
                            time={exercise.reps ?? 0}
                            displayWorkout={displayWorkout}
                          />
                        )}
                    </>
                  ) : (
                    <>
                      {prossesingExercise
                        ? prossesingExercise.id === exercise.id &&
                          startedWorkout && (
                            <div className="flex mt-[10px]">
                              <input
                                ref={(el) => {
                                  repsRef.current[index] = el;
                                }}
                                min={0}
                                className="w-full textfield rounded-tl-[5px] rounded-bl-[5px] py-[5px] px-[10px] border-t-1 border-l-1 border-b-1 focus: outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number"
                                placeholder="Количество повторений"
                              />
                              <button
                                onClick={() =>
                                  handleAddReps(
                                    exercise,
                                    Number(
                                      repsRef.current[
                                        displayWorkout.exercises.indexOf(
                                          exercise
                                        )
                                      ]?.value
                                    )
                                  )
                                }
                                className="border-t-1 border-b-1 border-r-1 hover:bg-[#C6FF00] cursor-pointer bg-[#BCEC30] w-[30px] rounded-tr-[5px] rounded-br-[5px] relative"
                              >
                                <div className="w-[10px] h-[10px] border-l-2 border-b-2 rotate-[225deg] absolute transform  top-[50%] left-[40%] translate-x-[-50%] translate-y-[-50%]"></div>
                              </button>
                            </div>
                          )
                        : startedWorkout &&
                          startedWorkout.id === displayWorkout.id &&
                          startedWorkout && (
                            <div className="flex mt-[10px]">
                              <input
                                ref={(el) => {
                                  repsRef.current[index] = el;
                                }}
                                min={0}
                                className="w-full textfield rounded-tl-[5px] rounded-bl-[5px] py-[5px] px-[10px] border-t-1 border-l-1 border-b-1 focus: outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number"
                                placeholder="Количество повторений"
                              />
                              <button
                                onClick={() =>
                                  handleAddReps(
                                    exercise,
                                    Number(
                                      repsRef.current[
                                        displayWorkout.exercises.indexOf(
                                          exercise
                                        )
                                      ]?.value
                                    )
                                  )
                                }
                                className="border-t-1 border-b-1 border-r-1 hover:bg-[#C6FF00] cursor-pointer bg-[#BCEC30] w-[30px] rounded-tr-[5px] rounded-br-[5px] relative"
                              >
                                <div className="w-[10px] h-[10px] border-l-2 border-b-2 rotate-[225deg] absolute transform  top-[50%] left-[40%] translate-x-[-50%] translate-y-[-50%]"></div>
                              </button>
                            </div>
                          )}
                    </>
                  )}
                  {exercise.timeBtwnSets &&
                    (restTimeSets < 0 &&
                    exercise.table &&
                    exercise.table?.length > 0 ? (
                      <p className="text-center pt-[10px]">
                        Пора делать подход
                      </p>
                    ) : (
                      startedWorkout &&
                      restTimeSets > 0 && (
                        <p className="text-center pt-[10px]">
                          {timeHHMMSS(restTimeSets)}
                        </p>
                      )
                    ))}
                </>
              }
            </div>
          </div>
        )
      )}
    </div>
  );
};
