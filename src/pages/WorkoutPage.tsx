import { useEffect, useRef, useState } from "react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { router } from "./router";
import type { exercisesType, workoutType } from "../types/types";

import { StartTimeBtn } from "../components/StartTimeBtn";
import { timeHHMMSS } from "../utils/functions";
import { exercises } from "../data";
import { Confirm } from "../components/Confirm";
import { useAppDispatch, useAppSelector } from "../store/features/store";
import {
  setConfirmWeight,
  setAddExerciseRep,
  setBreakWorkout,
  setTickTime,
  setViewWorkout,
  setRestTimeSets,
  setTimeSets,
} from "../store/features/workoutSlice";
import { setUser } from "../store/features/userSlice";
import { AddingExercise } from "../components/AddingExercise";
import { ResultTable } from "../components/ResultTable";
import { DoneWorkout } from "../components/DoneWorkout";
import { InputTime } from "../components/InputTime";

export default function WorkoutPage() {
  const { viewWorkout, startedWorkout, restTimeSets } = useAppSelector(
    (state) => state.workoutSlice
  );
  const { isAuth, user } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();

  const repsRef = useRef<(HTMLInputElement | null)[]>([]);
  const editBtnRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const [doneWorkout, setDoneWorkout] = useState<boolean>(false);
  const [userWeight, setUserWeight] = useState<number | null>(null);
  const [isEnteringWeight, setIsEnteringWeight] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [isAddingExercise, setIsAddingExercise] = useState<boolean>(false);
  const [addingQueue, setAddingQueue] = useState<boolean>(false);
  const [exerciseQueue, setExerciseQueue] = useState<exercisesType[]>([]);
  const [openMode, setOpenMode] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editReps, setEditReps] = useState<number | null>(null);
  const [editWorkout, setEditWorkout] = useState<workoutType | null>(null);
  const [exerciseMode, setExerciseMode] = useState<string>("свободное");
  const [prossesingExercise, setProssesingExercise] =
    useState<exercisesType | null>(null);

  const displayWorkout =
    startedWorkout?.id === viewWorkout?.id ? startedWorkout : viewWorkout;

  let doneExerciseCount: number = 0;

  let wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const isFillAddingQueueRef = useRef(false);

  if (isFillAddingQueueRef) {
    isFillAddingQueueRef.current =
      displayWorkout?.exercises.length === exerciseQueue.length;
  }

  useEffect(() => {
    if (isFillAddingQueueRef.current) {
      if (viewWorkout) {
        dispatch(setViewWorkout({ ...viewWorkout, exercises: exerciseQueue }));
      }
      setAddingQueue(false);
    }
  }, [isFillAddingQueueRef.current]);

  useEffect(() => {
    if (exerciseMode === "свободное") {
      setProssesingExercise(null);
    }
    if (exerciseMode === "поподходное" && displayWorkout) {
      setProssesingExercise(displayWorkout?.exercises[0]);
    }
    if (exerciseMode === "круговое" && displayWorkout) {
      setProssesingExercise(displayWorkout?.exercises[0]);
    }
  }, [exerciseMode]);

  useEffect(() => {
    if (prossesingExercise) {
      let currentEx = displayWorkout?.exercises.find(
        (ex) => ex.id === prossesingExercise.id
      );

      if (
        exerciseMode === "поподходное" &&
        currentEx.doneReps >= prossesingExercise.sets * prossesingExercise.reps
      ) {
        if (displayWorkout) {
          let index = displayWorkout?.exercises.findIndex(
            (ex) => ex.id === prossesingExercise.id
          );
          setProssesingExercise(displayWorkout?.exercises[index + 1]);
        }
      }

      if (exerciseMode === "круговое") {
        if (displayWorkout) {
          let index = displayWorkout?.exercises.findIndex(
            (ex) => ex.id === prossesingExercise.id
          );
          if (index + 1 < displayWorkout.exercises.length) {
            setProssesingExercise(displayWorkout?.exercises[index + 1]);
          } else {
            index = 0;
            setProssesingExercise(displayWorkout?.exercises[index]);
          }
        }
      }
    }
  }, [displayWorkout?.exercises]);

  const releaseWakeLock = async () => {
    try {
      await wakeLockRef.current?.release();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    return () => {
      releaseWakeLock();
    };
  }, []);

  // событие на завершение тренировки
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    if (startedWorkout) {
      intervalId = setInterval(() => {
        dispatch(setTickTime());
      }, 1000);
    }

    displayWorkout?.exercises.map((i: exercisesType) => {
      if (i.done) {
        doneExerciseCount++;
      }
      if (
        doneExerciseCount === displayWorkout?.exercises.length &&
        intervalId
      ) {
        clearInterval(intervalId);
        setDoneWorkout(true);
      }
    });

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [startedWorkout]);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    intervalId = setInterval(() => {
      dispatch(setRestTimeSets());
    }, 1000);

    if (restTimeSets < 0) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    (e.target as HTMLElement).blur();
  };

  const cancelWeightBtn = () => {
    setIsEnteringWeight(false);
  };

  const confirmWeightBtn = () => {
    if (userWeight) {
      let reps = Math.ceil(5000 / userWeight);
      dispatch(setConfirmWeight({ reps }));
      setIsEnteringWeight(false);
    }
  };

  const breakWorkout = () => {
    setIsConfirm(false);
    releaseWakeLock();
    dispatch(setBreakWorkout({ id: displayWorkout?.id }));
  };

  const backBtn = () => {
    releaseWakeLock();
    navigate(-1);
  };

  const addFavoriteWorkout = (
    e: React.MouseEvent<HTMLDivElement | SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (!user) return;
    const isExist = user.myWorkouts.some((w) => w.id === displayWorkout?.id);
    if (displayWorkout) {
      if (isExist) {
        dispatch(
          setUser({
            ...user,
            myWorkouts: user.myWorkouts.filter(
              (i) => i.id !== displayWorkout?.id
            ),
          })
        );
      } else {
        dispatch(
          setUser({
            ...user,
            myWorkouts: [...user.myWorkouts, displayWorkout],
          })
        );
      }
    }
  };

  const selectQueue = (exercise: exercisesType) => {
    if (exerciseQueue.some((ex) => ex.id === exercise.id)) {
      setExerciseQueue(exerciseQueue.filter((ex) => ex.id !== exercise.id));
    } else {
      setExerciseQueue([...exerciseQueue, exercise]);
    }
  };

  const openAddingExercise = () => {
    setIsAddingExercise(!isAddingExercise);
  };

  const editWorkoutBtn = () => {
    setIsEdit(!isEdit);
    setExerciseQueue([]);
    setEditWorkout(displayWorkout);
    setAddingQueue(true);
  };

  const addRepsBtn = (exercise: exercisesType, currentReps: number) => {
    console.log(exercise);
    if (exercise.timeBtwnSets > 0) {
      dispatch(setTimeSets(exercise.timeBtwnSets));
    }
    dispatch(
      setAddExerciseRep({ exerciseId: exercise.id, currentReps: currentReps })
    );

    //очистка поле ввода
    if (exercise.static) return;
    const index = displayWorkout?.exercises.findIndex(
      (ex) => ex.id === exercise.id
    );
    if (index !== undefined && index !== -1 && repsRef.current[index]) {
      repsRef.current[index]!.value = "";
    }
  };

  const editRepsFunc = (val: number) => {
    if (val > 0) {
      setEditReps(val);
    }
  };

  const isFavorite = user?.myWorkouts.some((w) => w.id === displayWorkout?.id);

  return (
    <>
      {isEnteringWeight && (
        <div className=" fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-3 bg-[white] rounded-[10px] p-[20px] shadow-[0px_0px_25px_-5px]">
          <div className="w-[250px] flex flex-col gap-[20px]">
            <p className="text-[20px]">Введите массу вашего тела</p>
            <div className="border-2 border-[#9c9c9c] rounded-[10px] px-[10px] py-[5px] group focus-within:border-[#000000]">
              <input
                className="focus:outline-none focus:group-focus:border-2 focus:group-focus:border-[red]  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:margin-[0] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:margin-[0]"
                onWheel={handleWheel}
                onChange={(e) => setUserWeight(Number(e.target.value))}
                type="number"
                placeholder="Вес в кг"
                name=""
                id=""
              />
            </div>
            <div className="flex justify-between gap-[20px]">
              <button
                onClick={cancelWeightBtn}
                className="w-full mt-[10px] text-[16px] rounded-[45px] bg-[white] border-1 px-[16px] py-[8px] hover:bg-[#C6FF00] hover:cursor-pointer"
              >
                Отмена
              </button>

              <button
                onClick={confirmWeightBtn}
                className="w-full mt-[10px] text-[16px] rounded-[45px] border-1 border-[#BCEC30] bg-[#BCEC30] px-[16px] py-[8px] hover:bg-[#C6FF00] hover:cursor-pointer"
              >
                Далее
              </button>
            </div>
          </div>
        </div>
      )}
      {isConfirm && (
        <Confirm
          text={"Вы хотите завершить тренировку?"}
          noBtn={() => setIsConfirm(false)}
          yesBtn={breakWorkout}
        />
      )}
      <Header />
      {
        <div className="sm:px-[16px] px-[0px] pb-[10px]">
          <div
            onClick={backBtn}
            className="text-[16px] pl-[20px] opacity-[0.7] pb-[5px] hover:underline cursor-pointer"
          >
            &laquo; Назад
          </div>
          <h1 className="text-[24px] text-center sm:text-start font-600">
            {displayWorkout && displayWorkout.nameRU}
          </h1>
          <div className="flex flex-col md:flex-row md:gap-[20px] place-items-center  md:items-center justify-center">
            <div className="w-full">
              {isAuth && displayWorkout ? (
                isFavorite ? (
                  <svg
                    xlinkTitle="Удалить из избранных"
                    onClick={(e) => addFavoriteWorkout(e)}
                    className="relative place-self-end right-[10px]"
                    width="30"
                    height="30"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <rect width="64" height="64" fill="url(#pattern0_7_4)" />
                    <defs>
                      <pattern
                        id="pattern0_7_4"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlinkHref="#image0_7_4"
                          transform="scale(0.015625)"
                        />
                      </pattern>
                      <image
                        id="image0_7_4"
                        width="64"
                        height="64"
                        preserveAspectRatio="none"
                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxAAAAsQAa0jvXUAAAGHaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj48dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPjwvcmRmOkRlc2NyaXB0aW9uPjwvcmRmOlJERj48L3g6eG1wbWV0YT4NCjw/eHBhY2tldCBlbmQ9J3cnPz4slJgLAAACXElEQVR4Xu2ZsU7cQBRFz6x3CaSkQ4IOagq+IPmDKPxlpPxBpHxBirSUSFEaKAMJLDfF2pL1PF6v7Rl7154j0dyH5HfPji28QCKRSCQSiURinjgb7Egm6dWGPpxzK2Cn3/WwkvTPhj6cc0tgbfMm2go4kfQH4PHiys68nN7fwWbBM+C3nddwJukX3a5zAjzbeR1tBNxK+rLrQpbSgsfAXzvPeSfpmRbFLaf3dzjnPgNf7czHLgIWktb0WKpMvuAH4LsZfZT0LdQ12MheALLzMk0CFpLWIZYqYxZE0huBBJfJZWfAm50VbBUgSaGXKlOIiH0N51xtz4UNStzaIDSPF1dRy5f4ZIOCOjPHkp4GWi46+Sl4DzzZmVdA7KM/BnW3gu8WyGwwISp9K0am+OkX+E5BxcjcSAJsMDeSABvMjSTABnMjCbCBc+6oeEubEvkfQUc2rwgAXmwwISrdfAImdwryT39lc+oEAC/OuespSMjL39R9M10nAOCnDQ6YHzYoqLwNWg757dD39mfZdgJg8zxYHuKtkJdf2tzSKABYH5qE0kOv8T9FW4+HIZP0uu+3Q6m896FnaSOAfZfQtjwdBLCvErqUp6MA9k1C1/L0EMC+SOhTnp4CGFtC3/IEEMBYEkKUJ5AAhpYQqjwBBTCUhJDlCSyA2BJClyeCAGJJiFGeSAIILSFWeSIKIJSEmOWJLIC+EmKXZwABdJUwRHkGEkBbCUOVZ0AB7CphyPIMLIAmCUOXZwQB1EkYo/yYZJL0cH6ph/NLSRLQ+AXm1MiUM8fyBVn+k0gkEokx+A9KljoEt6jSJAAAAABJRU5ErkJggg=="
                      />
                    </defs>
                  </svg>
                ) : (
                  <svg
                    onClick={(e) => addFavoriteWorkout(e)}
                    xlinkTitle="Добавить в избранное"
                    className="relative place-self-end right-[10px]"
                    width="30"
                    height="30"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <rect width="64" height="64" fill="url(#pattern0_8_5)" />
                    <defs>
                      <pattern
                        id="pattern0_8_5"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlinkHref="#image0_8_5"
                          transform="scale(0.015625)"
                        />
                      </pattern>
                      <image
                        id="image0_8_5"
                        width="64"
                        height="64"
                        preserveAspectRatio="none"
                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxAAAAsQAa0jvXUAAAGHaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj48dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPjwvcmRmOkRlc2NyaXB0aW9uPjwvcmRmOlJERj48L3g6eG1wbWV0YT4NCjw/eHBhY2tldCBlbmQ9J3cnPz4slJgLAAADXElEQVR4Xu2Zy24TMRhGT5q00E25eIcMRGDYwaIbkHgGBBLiRXkIoEgIiR3FBSEZWBkKSFzEJSwyJe0f2/FMZiaDOkeKVJ1JJ/4+e5xJAj09PT09PT09PceTgRSZrHltfksZQjl7BtiXPpPTXpuPUoZQzg6BP9IvomwBJ7w236UEYDCAyUTafyhnt4Fn0kfY9to8lTIH5exJ4If0MbIL8NrE05VAOXsOeC99wTmvzVspq6Cczcq2JkWAQXb4wew1Y6/utXkH3JMeuF9XeGYTFhvGPxY9YeC1KX1d5XIwS9kFV0A5uwZEz58sIDWwzM1ty2vzScoyKGdPAZ+lFyQ3y9TlED0QC6+cvQE8kX4BZ702XsoUytmzQDRUhBtem8dSkightgeckILpSS5WCA/wQTk7UM7elQckytk7xWDLhgfYUc6OpSzYkILYCgjNvnL2JrAjfQWuem1eSMn0Na4CL6WvwE2vzSMpQ6tgbgWEwhfUER5gt9g/jqCcPV1TeIDgZRDKOydChAa8JPuHz1n8vdRmKSn2kCOE7l6zCsjY7auwr5w9r5w939D5s/aQ3AKawhWPlbHqAlZOX4AUx42+ACmOG7kFzL2n/gdclyLE3K0hsOm1+Spl6Dayy4TuaJWzW8CXwy60Ar5JUXBbiq4SCl9wJDyRAlDObkrntXkAXJG+g1yTgtnszxEsAPiunL0lpddmF4h93OwCY6/NcykL5mafRAEAD6VgWsJr4JL0HeBCMbY5UvtXqoDoP3pt9jq2EsZemzdSMs2QzJg8yPQEQ+mYrYQulDBOzPww9YUokbfBENFvh5Wzl4FX0rfEhcTMZ/1SlFsAHSxh6fCULIAOlVBLeHL2AMEksSfstfTukAo/KhOeCivggOivww2vhEXhg2NKUbUAVlBC7eGpcAkc5k+Ll0Mq/HrV8CxZAEUJIympt4RF4X9JX4ZlLoHDDL02wYEseTk0Gp4aC6CBEhoPT80FUGMJrYSngQKooYTWwtNQASxRQqvhabAAKpTQengaLoASJawkPC0UQEYJv1YVnpYKABh5bX5KmaKN8LRYAKmVIGkrPC0XQE4JbYanhs8CZfkd++zANPxGm+FZwQo4YG5PaHvmu8DQazMpfsZalwePC6Pi0dPT09OzCv4CplJ65wfIVNcAAAAASUVORK5CYII="
                      />
                    </defs>
                  </svg>
                )
              ) : null}
              <div className="relative place-self-center w-[150px]">
                <img
                  className="rounded-[30px] flex place-self-center mb-[40px]"
                  src={displayWorkout?.img}
                  alt={displayWorkout?.nameEN}
                />
              </div>
            </div>

            {displayWorkout?.description && (
              <div>
                <p className="text-[18px] pl-[10px] place-self-start">
                  Описание:
                </p>
                <div className="relative p-[20px] mb-[10px] bg-white rounded-[30px] w-full shadow-[0px_0px_10px_-7px]">
                  <p className="text-justify">
                    <span className="text-[18px] font-[600]"></span>
                    {displayWorkout.description}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between ">
            <div>
              <p className="text-[18px] pl-[10px]">Упражнения:</p>

              {isEdit && (
                <div className="pl-[20px]">
                  <p className="text-[14px]" onClick={openAddingExercise}>
                    Добавить упражнение
                  </p>
                  <div
                    onClick={() => setOpenMode(!openMode)}
                    className="text-[14px] relative"
                  >
                    Режим: {exerciseMode}
                    {openMode && (
                      <div className="absolute p-[3px] left-[50px] bg-[#fff] shadow-[0px_0px_10px_-5px]">
                        <p onClick={() => setExerciseMode("свободное")}>
                          свободное
                        </p>
                        <p onClick={() => setExerciseMode("круговое")}>
                          круговое
                        </p>
                        <p onClick={() => setExerciseMode("поподходное")}>
                          поподходное
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col items-end relative">
              {!startedWorkout && (
                <div
                  ref={editBtnRef}
                  onClick={editWorkoutBtn}
                  className="flex justify-center items-center w-[30px] h-[30px] mr-[10px] active:bg-[#A0B000] rounded-[10px] bg-[#BCEC30] px-[5px]"
                >
                  <svg
                    xmlns="http://www.w3.org"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-[10px] justify-center py-[30px] mb-[10px] bg-white rounded-[30px] w-full shadow-[0px_0px_10px_-7px]">
            {isAddingExercise && (
              <AddingExercise
                displayWorkout={displayWorkout}
                exercises={exercises}
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
                          {exerciseQueue.findIndex(
                            (ex) => ex.id === exercise.id
                          ) + 1}
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
                                <span className="ml-[3px]">
                                  {" "}
                                  {exercise.sets}
                                </span>
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
                              {exercise.static &&
                              exercise.reps !== undefined ? (
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
                          {exercise.timeBtwnSets > 0 && (
                            <>
                              <br />
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

                              <br />
                            </>
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
                                  addRepsBtn={addRepsBtn}
                                  exercise={exercise}
                                  time={exercise.reps}
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
                                        addRepsBtn(
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
                                        addRepsBtn(
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
                        {!doneWorkout &&
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
          <DoneWorkout
            isEdit={isEdit}
            wakeLockRef={wakeLockRef}
            doneWorkout={doneWorkout}
            displayWorkout={displayWorkout}
            userWeight={userWeight}
            setIsConfirm={setIsConfirm}
            setIsEnteringWeight={setIsEnteringWeight}
          />
        </div>
      }
    </>
  );
}
