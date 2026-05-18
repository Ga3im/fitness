import { exercises } from "../../data";
import { useWorkout } from "../../hooks/Workout/useWorkout";
import { useAppDispatch, useAppSelector } from "../../store/features/store";
import type { exercisesType, ModeTypes, workoutType } from "../../types/types";
import { InputTime } from "../InputTime";
import { AddingExercise } from "./AddingExercise";
import { CloseIcon } from "../icons/CloseIcon";
import { BottomBtn } from "../BottomBtn";
import {
  deleteExercise,
  setEditWorkout,
  setCurrentWorkout,
} from "../../store/features/workoutSlice";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { MinusIcon } from "../icons/MinusIcon";
import { PlusIcon } from "../icons/PlusIcon";

type EdittingWorkoutProp = {
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

export const EdittingWorkout = ({ setIsEdit }: EdittingWorkoutProp) => {
  const { editWorkout } = useAppSelector((state) => state.workoutSlice);
  const [openMode, setOpenMode] = useState<boolean>(false);
  const [isAddingExercise, setIsAddingExercise] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const [editingWorkout, setEditingWorkout] = useState<workoutType | null>(
    editWorkout
  );

  const { exerciseQueue, setExerciseQueue } = useWorkout(editWorkout);

  useEffect(() => {
    if (!editingWorkout) return;
    const debounce = setTimeout(() => {
      dispatch(setEditWorkout(editingWorkout));
    }, 500);

    return () => clearTimeout(debounce);
  }, [editingWorkout, dispatch]);

  const openAddingExercise = () => {
    setIsAddingExercise(!isAddingExercise);
  };

  const handleModeChange = (value: ModeTypes) => {
    if (!editingWorkout) return;
    setEditingWorkout({ ...editingWorkout, mode: value });
  };

  const handleDeleteExercise = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    exercise: exercisesType
  ) => {
    e.stopPropagation();
    dispatch(deleteExercise(exercise));
  };

  const selectQueue = (exercise: exercisesType) => {
    if (exerciseQueue.some((ex) => ex.id === exercise.id)) {
      setExerciseQueue(exerciseQueue.filter((ex) => ex.id !== exercise.id));
    } else {
      setExerciseQueue([...exerciseQueue, exercise]);
    }
  };

  const handleExerciseChange = (
    newValue: number,
    exerciseId: string,
    field: string
  ) => {
    if (!editingWorkout) return;
    setEditingWorkout({
      ...editingWorkout,
      exercises: editingWorkout.exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, [field]: newValue } : ex
      ),
    });
  };

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    (e.target as HTMLElement).blur();
  };

  const saveEditedWorkout = () => {
    dispatch(setCurrentWorkout(editWorkout));
    setIsEdit(false);
  };

  console.log(editWorkout);

  return (
    <div className="flex flex-wrap gap-[10px] justify-center py-[30px] mb-[10px] bg-white w-full">
      <div className="flex flex-col gap-[8px]">
        <p
          onClick={openAddingExercise}
          className="text-[14px] font-medium text-[#00C1FF] hover:text-[#00a3d9] active:scale-95 flex items-center gap-[4px] cursor-pointer select-none transition-all w-fit"
        >
          {isAddingExercise ? <MinusIcon /> : <PlusIcon />}
          Добавить упражнение
        </p>
        <div
          onClick={() => setOpenMode(!openMode)}
          className="text-[14px] relative cursor-pointer select-none hover:opacity-90 transition-opacity"
        >
          Режим:{" "}
          <span className="bg-[#BCEC30] text-black font-semibold rounded-[6px] px-[8px] py-[2px] ml-[4px] shadow-sm inline-block">
            {editWorkout?.mode}
          </span>
          {openMode && (
            <div className="absolute z-20 p-[6px] left-[50px] top-[24px] bg-[#16171d] text-white rounded-[8px] border border-gray-700 shadow-lg min-w-[120px]">
              <p
                onClick={() => handleModeChange("свободное")}
                className="px-[8px] py-[4px] rounded-[4px] hover:bg-gray-700 cursor-pointer transition-colors"
              >
                свободное
              </p>
              <p
                onClick={() => handleModeChange("круговое")}
                className="px-[8px] py-[4px] rounded-[4px] hover:bg-gray-700 cursor-pointer transition-colors"
              >
                круговое
              </p>
              <p
                onClick={() => handleModeChange("поподходное")}
                className="px-[8px] py-[4px] rounded-[4px] hover:bg-gray-700 cursor-pointer transition-colors"
              >
                поподходное
              </p>
            </div>
          )}
        </div>
      </div>
      {isAddingExercise && (
        <AddingExercise
          displayWorkout={editWorkout}
          exercises={exercises.filter((ex): ex is exercisesType => !!ex)}
        />
      )}

      {editWorkout?.exercises.map((exercise: exercisesType) => (
        <div
          key={exercise.id}
          onClick={() => selectQueue(exercise)}
          className="w-[300px] p-[20px] border-[black] border-1 rounded-[20px] shadow-[0px_0px_15px_-10px]"
        >
          <div className="flex place-self-end gap-[10px]">
            {exerciseQueue.some((ex) => ex.id === exercise.id) ? (
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
            )}
            <button onClick={(e) => handleDeleteExercise(e, exercise)}>
              <CloseIcon />
            </button>
          </div>

          <div className="h-[250px] flex items-center">
            <img className="cursor-pointer w-full" src={exercise.img} alt="" />
          </div>
          <p className="text-[24px] h-auto">{exercise.name}</p>

          <div>
            {
              <div className="flex flex-col gap-[5px] pb-[10px]">
                {exercise.sets && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center"
                  >
                    <span>Подходы:</span>
                    <input
                      className="ml-[5px] border-[1px] border-[#000000] px-[10px] w-[100%] py-[5px] rounded-[10px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:margin-[0] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:margin-[0]"
                      type="number"
                      inputMode="numeric"
                      onWheel={handleWheel}
                      onChange={(e) => {
                        handleExerciseChange(
                          Number(e.target.value),
                          exercise.id,
                          "sets"
                        );
                      }}
                      defaultValue={exercise.sets}
                    />
                  </div>
                )}

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center"
                >
                  <div className="inline">
                    {exercise.static ? "Время: " : `Повторения: `}
                  </div>

                  <span>
                    {exercise.static ? (
                      <InputTime
                        value={Number(exercise.reps || 0)}
                        changeVal={(val) =>
                          handleExerciseChange(val, exercise.id, "reps")
                        }
                      />
                    ) : (
                      <input
                        className="border-[1px] border-[#000000] px-[10px] py-[5px] w-[100%] rounded-[10px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:margin-[0] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:margin-[0]"
                        type="number"
                        inputMode="numeric"
                        onWheel={handleWheel}
                        defaultValue={exercise.reps}
                        onChange={(e) => {
                          handleExerciseChange(
                            Number(e.target.value),
                            exercise.id,
                            "reps"
                          );
                        }}
                      />
                    )}
                  </span>
                </div>
                {exercise.timeBtwnSets && exercise.timeBtwnSets > 0 && (
                  <div>
                    <span>Отдых:</span>
                    <InputTime
                      value={Number(exercise.timeBtwnSets)}
                      changeVal={(val) =>
                        handleExerciseChange(val, exercise.id, "reps")
                      }
                    />
                  </div>
                )}
              </div>
            }
          </div>
        </div>
      ))}
      <BottomBtn onClick={saveEditedWorkout} btnText={"Сохранить"} />
    </div>
  );
};
