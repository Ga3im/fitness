import { exercises } from "../../data";
import { useWorkout } from "../../hooks/Workout/useWorkout";
import { useAppDispatch, useAppSelector } from "../../store/store";
import type { exercisesType, ModeTypes, workoutType } from "../../types/types";
import { InputTime } from "../InputTime";
import { CloseIcon } from "../icons/CloseIcon";
import { BottomBtn } from "../BottomBtn";
import {
  deleteExercise,
  setEditWorkout,
  setCurrentWorkout,
  setWorkouts,
} from "../../store/features/workoutSlice";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { MinusIcon } from "../icons/MinusIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { AddingExercise } from "./AddingExercise";
import { ModeWorkouts } from "./ModeWorkouts";

type EdittingWorkoutProp = {
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  editingWorkout: workoutType | null;
  setEditingWorkout: Dispatch<SetStateAction<workoutType | null>>;
};

export const EdittingWorkout = ({
  setIsEdit,
  editingWorkout,
  setEditingWorkout,
}: EdittingWorkoutProp) => {
  const { editWorkout, workouts } = useAppSelector(
    (state) => state.workoutSlice
  );
  const { theme } = useAppSelector((state) => state.setting);
  const [isAddingExercise, setIsAddingExercise] = useState<boolean>(false);

  const dispatch = useAppDispatch();

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
    if (!editWorkout) return;
    const updatedWorkouts = workouts.map((w) =>
      w.id === editWorkout.id ? editWorkout : w
    );
    dispatch(setWorkouts(updatedWorkouts));
    dispatch(setCurrentWorkout(editWorkout));
    setIsEdit(false);
  };

  return (
    <div
      className={
        theme === "night"
          ? "bg-[#000] flex flex-wrap gap-[10px] justify-center py-[30px] mb-[10px] w-full"
          : "flex flex-wrap gap-[10px] justify-center py-[30px] mb-[10px] bg-white w-full"
      }
    >
      <div className="flex flex-col items-center justify-center w-full gap-[8px]">
        <p
          onClick={openAddingExercise}
          className="text-[14px] font-medium text-[#00C1FF] hover:text-[#00a3d9] active:scale-95 flex items-center gap-[4px] cursor-pointer select-none transition-all w-fit"
        >
          {isAddingExercise ? <MinusIcon /> : <PlusIcon />}
          Добавить упражнение
        </p>
        <ModeWorkouts
          handleModeChange={handleModeChange}
          currentMode={editWorkout?.mode || "свободное"}
        />
      </div>
      {isAddingExercise && (
        <AddingExercise
          editWorkout={editWorkout}
          exercises={exercises.filter((ex): ex is exercisesType => !!ex)}
        />
      )}

      {editWorkout?.exercises.map((exercise: exercisesType) => (
        <div
          key={exercise.id}
          onClick={() => selectQueue(exercise)}
          className={
            theme === "night"
              ? "w-[300px] p-[20px] border-[black] border-1 rounded-[20px] shadow-[0px_0px_20px_-10px] bg-[#0f172a]"
              : "w-[300px] p-[20px] border-[black] border-1 rounded-[20px] shadow-[0px_0px_15px_-10px] bg-white"
          }
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
                className={
                  theme === "night"
                    ? "w-[25px] h-[25px] border-1 border-[#fff] place-self-end rounded-full"
                    : "w-[25px] h-[25px] border-1 border-[#000] place-self-end rounded-full"
                }
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
                {!!exercise.timeBtwnSets && exercise.timeBtwnSets > 0 && (
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
