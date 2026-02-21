import { useEffect, useRef, useState } from "react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { router } from "./router";
import type { exercisesType, workoutType } from "../types/types";
import { BottomBtn } from "../components/BottomBtn";
import { Stopwatch } from "../components/Stopwatch";
import { StartTimeBtn } from "../components/StartTimeBtn";
import { timeHHMMSS } from "../utils/functions";
import { Exercise } from "../components/Exercise";
import { exercises } from "../data";
import { Confirm } from "../components/Confirm";
import { useAppDispatch, useAppSelector } from "../store/features/store";
import {
  setStartedWorkout,
  setViewWorkout,
  setWorkouts,
  setWorkoutTime,
  setEmptyExerciseReps,
  setFavoriteWorkoutsId,
} from "../store/features/workoutSlice";
import { setUser } from "../store/features/authSlice";

export default function WorkoutPage() {
  const {
    workouts,
    viewWorkout,
    startedWorkout,
    favoriteWorkoutsId,
    workoutTime,
    emptyExerciseReps,
    additionalSetting,
  } = useAppSelector((state) => state.workoutSlice);
  const { isAuth, user } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const repsRef = useRef<HTMLInputElement[]>([]);
  const btnRef = useRef<(HTMLInputElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [doneWorkout, setDoneWorkout] = useState<boolean>(false);
  const [userWeight, setUserWeight] = useState<number | null>(null);
  const [isEnteringWeight, setIsEnteringWeight] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [isAddingExercise, setIsAddingExercise] = useState<boolean>(false);

  let doneExerciseCount: number = 0;
  let lastOrder: number | null = sessionStorage.getItem("lastOrder")
    ? Number(sessionStorage.getItem("lastOrder"))
    : null;
  let wakeLock: WakeLockSentinel | null = null;
  const [selectedExercisesId, setSelectedExercisesId] = useState<string[]>([]);

  // const stopTimer = () => {
  //   if (intervalId) {
  //     clearInterval(intervalId); // Остановка по ID
  //     console.log("Интервал остановлен");
  //   }
  // };

  const requestWakeLock = async () => {
    try {
      // Запрос блокировки экрана
      wakeLock = await navigator.wakeLock.request("screen");
      // console.log("Экран не выключится");
    } catch (err) {
      console.error(err);
    }
  };

  const releaseWakeLock = async () => {
    try {
      await wakeLock?.release();
      // console.log("Cнятие блокировки");
    } catch (error) {
      console.error(error);
    }
  };

  const changeViewWorkout = (workout: workoutType) => {
    dispatch(setViewWorkout(workout));
  };

  useEffect(() => {
    return () => {
      releaseWakeLock();
    };
  }, []);

  // useEffect(() => {
  //   const savedViewWorkout = localStorage.getItem("viewWorkout");
  //   if (savedViewWorkout) {
  //     viewWorkout(JSON.parse(savedViewWorkout));
  //   }
  // }, []);
  let displayWorkout: workoutType | null = viewWorkout; // объект с тренировками для отображения на странице
  // событие на завершение тренировки
  useEffect(() => {
    // stopTimer();
    startedWorkout?.exercises.map((i: exercisesType) => {
      if (i.done) {
        doneExerciseCount++;
      }
      if (doneExerciseCount === startedWorkout?.exercises.length) {
        setDoneWorkout(true);
      }
    });
  }, [startedWorkout]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
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
      startedWorkout?.exercises.map((i: exercisesType) => {
        i.reps = reps;
      });
      if (startedWorkout) {
        dispatch(setStartedWorkout({ ...startedWorkout, needWeight: false }));
      }
      setIsEnteringWeight(false);
      dispatch(setStartedWorkout(displayWorkout));
    }
  };

  const backBtn = () => {
    releaseWakeLock();
    localStorage.removeItem("viewWorkout");
    navigate(router.main);
  };

  const addFavoriteWorkout = (
    e: React.MouseEvent<HTMLDivElement | SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (user && displayWorkout && user.myWorkouts.length === 0) {
      dispatch(
        setUser({
          ...user,
          myWorkouts: [...user.myWorkouts, displayWorkout],
        })
      );
      dispatch(
        setFavoriteWorkoutsId([...favoriteWorkoutsId, displayWorkout.id])
      );
    } else {
      user &&
        displayWorkout &&
        user.myWorkouts.map((i: workoutType) => {
          if (i.id === displayWorkout.id) {
            dispatch(
              setUser({
                ...user,
                myWorkouts: user.myWorkouts.filter(
                  (i) => i.id !== displayWorkout.id
                ),
              })
            );
            dispatch(
              setFavoriteWorkoutsId(
                favoriteWorkoutsId.filter((i) => i !== displayWorkout.id)
              )
            );
          } else {
            dispatch(
              setUser({
                ...user,
                myWorkouts: [...user.myWorkouts, displayWorkout],
              })
            );
            dispatch(
              setFavoriteWorkoutsId([...favoriteWorkoutsId, displayWorkout.id])
            );
          }
        });
    }
  };

  const backExerciseBtn = () => {
    if (innerWidth <= 600) {
      containerRef.current?.scrollBy({ left: -330, behavior: "smooth" });
    } else {
      containerRef.current?.scrollBy({ left: -660, behavior: "smooth" });
    }
  };

  const nextExerciseBtn = () => {
    if (innerWidth <= 600) {
      containerRef.current?.scrollBy({ left: 330, behavior: "smooth" });
    } else {
      containerRef.current?.scrollBy({ left: 660, behavior: "smooth" });
    }
  };

  const openAddingExercise = () => {
    setIsAddingExercise(true);
    displayWorkout?.exercises.map((i: exercisesType) => {
      selectedExercisesId.push(i.id);
    });
  };

  const exerciseClick = (e: HTMLElement) => {
    if (e) {
      e.scrollIntoView({ inline: "center", behavior: "smooth" });
    }
  };

  const addRepsBtn = (exercise: exercisesType, currentReps: number) => {
    if (exercise.doneReps === undefined) {
      exercise.doneReps = currentReps;
      exercise.table = [currentReps];
    } else {
      exercise.doneReps = exercise.doneReps + currentReps;
      if (exercise.table !== undefined) {
        exercise.table.push(currentReps);
      }
    }

    if (
      exercise.sets &&
      exercise.reps &&
      exercise.sets * exercise.reps <= exercise.doneReps
    ) {
      exercise.done = true;
    }
    dispatch(setStartedWorkout(startedWorkout));
    !exercise.static &&
      (repsRef.current && displayWorkout
        ? (repsRef.current[displayWorkout.exercises.indexOf(exercise)].value =
            "")
        : null);
  };

  const editWeightBtn = () => {
    setIsEnteringWeight(true);
  };

  const startWorkout = () => {
    requestWakeLock();
    if (displayWorkout && displayWorkout.needWeight) {
      setIsEnteringWeight(true);
    } else {
      if (displayWorkout) {
        dispatch(
          setStartedWorkout({
            ...displayWorkout,
            exercises: displayWorkout.exercises,
          })
        );
      }

      workouts.map((i) => {
        if (i.id === displayWorkout?.id) {
          lastOrder = displayWorkout.order;
          sessionStorage.setItem("lastOrder", String(lastOrder));
        }
      });
      dispatch(setWorkouts([...workouts]));
    }
  };

  const returnToMain = () => {
    localStorage.removeItem("viewWorkout");
    localStorage.removeItem("startedWorkout");
    dispatch(setStartedWorkout(null));
    navigate(router.main);
  };

  const finishWorkout = () => {
    // stopTimer();
    setIsConfirm(false);
    releaseWakeLock();
    dispatch(setStartedWorkout(null));
    sessionStorage.removeItem("lastOrder");
    dispatch(setWorkouts([...workouts]));
    dispatch(setWorkoutTime(0));
  };

  const deleteWorkout = () => {
    dispatch(setStartedWorkout(null));
    dispatch(
      setWorkouts(
        workouts.filter((i: workoutType) => i.id !== displayWorkout?.id)
      )
    );

    navigate(router.main);
  };

  return (
    <>
      {isEnteringWeight && (
        <div className=" fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-3 bg-[white] rounded-[10px] p-[20px] shadow-[0px_0px_25px_-5px]">
          <div className="w-[300px] flex flex-col gap-[20px]">
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
          yesBtn={finishWorkout}
        />
      )}
      <Header />
      {
        <div className="px-[16px] pb-[20px]">
          <div
            onClick={backBtn}
            className="text-[24px] opacity-[0.7] pb-[10px] hover:underline cursor-pointer"
          >
            &laquo; Назад
          </div>
          <h1 className="text-[32px] pl-[25px] pb-[20px] font-600">
            {displayWorkout && displayWorkout.nameRU}
          </h1>
          <div className="flex flex-col md:flex-row md:gap-[20px] place-items-center  md:items-center justify-center">
            <div className="relative w-[300px]">
              {isAuth && displayWorkout ? (
                favoriteWorkoutsId.includes(displayWorkout.id) ? (
                  <svg
                    xlinkTitle="Удалить из избранных"
                    onClick={(e) => addFavoriteWorkout(e)}
                    className="relative top-[35px] place-self-end right-[10px]"
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
                    className="relative top-[35px] place-self-end right-[10px]"
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
              <img
                className="rounded-[30px] flex place-self-center mb-[40px]"
                src={displayWorkout?.img}
                alt={displayWorkout?.nameEN}
              />
            </div>
            {displayWorkout?.description && (
              <div className="relative p-[30px] mb-[10px] bg-white rounded-[30px] w-full shadow-[0px_0px_10px_-7px]">
                <p className="text-justify">
                  <span className="text-[18px] font-[600]"></span>
                  {displayWorkout.description}
                </p>
              </div>
            )}
          </div>
          <p className="text-[24px] pl-[10px]">Упражнения:</p>
          {isAddingExercise ? (
            <div>
              <div
                onClick={() => setIsAddingExercise(false)}
                className="bg-[red] z-1 top-[65px] right-[10px] w-[30px] h-[30px] place-self-end rounded-full relative cursor-pointer"
              >
                <div className="h-[3px] w-[20px] bg-[white] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"></div>
              </div>
              <div className="flex justify-center top-[40px] relative gap-[10px]">
                <button onClick={backExerciseBtn}>Back</button>
                <button onClick={nextExerciseBtn}>Next</button>
              </div>

              <div
                ref={containerRef}
                className="flex overflow-x-auto overflow-y-hidden gap-[30px] pt-[60px] flex-row border-1 rounded-[10px] p-[20px] shadow-[0px_0px_15px_-5px] w-full"
              >
                {exercises.map((addExercise, index) => (
                  <>
                    {addExercise &&
                    selectedExercisesId.includes(addExercise.id) ? null : (
                      <div
                        ref={(el) => (btnRef.current[index] = el)}
                        onClick={() => exerciseClick(btnRef.current[index])}
                      >
                        <Exercise
                          workout={displayWorkout}
                          setWorkout={changeViewWorkout}
                          i={addExercise}
                          emptyReps={emptyExerciseReps}
                          setEmptyReps={setEmptyExerciseReps}
                        />
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
          ) : (
            <div
              onClick={openAddingExercise}
              className="bg-[#BCEC30] top-[60px] right-[10px] w-[30px] h-[30px] place-self-end rounded-full relative cursor-pointer"
            >
              <div className="h-[20px] w-[3px] bg-[white] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"></div>
              <div className="h-[3px] w-[20px] bg-[white] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"></div>
            </div>
          )}

          <div className="flex flex-wrap gap-[10px] justify-center py-[30px] mb-[10px] bg-white rounded-[30px] w-full shadow-[0px_0px_10px_-7px]">
            {displayWorkout?.exercises.map(
              (exercise: exercisesType, index: number) => (
                <>
                  {exercise.reps && exercise.sets && (
                    <div>
                      <div className="w-[300px] p-[20px] border-[black] border-1 rounded-[20px] shadow-[0px_0px_15px_-10px]">
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
                              {additionalSetting.noSets.includes(
                                exercise.id
                              ) ? ( // подходы и повторения
                                <div className="pb-[10px]">
                                  <span>Повторения:</span>
                                  <span> {exercise.reps}</span>
                                  <br />
                                </div>
                              ) : (
                                <div className="pb-[10px]">
                                  {exercise.sets && (
                                    <>
                                      <span>Подходы:</span>
                                      <span> {exercise.sets}</span>
                                      <br />
                                    </>
                                  )}
                                  <span>
                                    {exercise.static ? "Время:" : "Повторения:"}
                                  </span>
                                  <span>
                                    {" "}
                                    {exercise.static &&
                                    exercise.reps !== undefined
                                      ? timeHHMMSS(exercise.reps) + " мин"
                                      : exercise.reps}
                                  </span>
                                </div>
                              )}

                              {exercise.doneReps !== undefined && ( // таблица
                                <div>
                                  <div className="flex justify-around">
                                    <span>Подходы </span>
                                    <span>
                                      {exercise.static ? "Время" : "Повторения"}{" "}
                                    </span>
                                  </div>
                                  {exercise.table?.map((i, index) => (
                                    <div className="flex border-t-1 border-l-1 border-r-1 last:border-b-1">
                                      <p className="border-r-1 w-[50%] text-center">
                                        {index + 1}
                                      </p>
                                      <span className="text-center w-[50%]">
                                        {i}
                                      </span>
                                      <br />
                                    </div>
                                  ))}
                                  <div className="flex border-1 font-[500]">
                                    <span className="w-[50%] border-r-1 text-center">
                                      Всего:
                                    </span>
                                    <span className="w-[50%] text-center">
                                      {exercise.static
                                        ? timeHHMMSS(exercise.doneReps)
                                        : exercise.doneReps}
                                    </span>
                                  </div>

                                  <progress
                                    className="w-full pt-[10px] [&::-webkit-progress-bar]:rounded-[50px] [&::-webkit-progress-bar]:h-[6px] [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:bg-[#00C1FF] [&::-webkit-progress-value]:rounded-[50px] "
                                    value={exercise.doneReps}
                                    max={exercise.reps * exercise.sets}
                                  ></progress>
                                </div>
                              )}

                              {exercise.reps * exercise.sets <=
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
                                  {startedWorkout !== null &&
                                    startedWorkout.id === displayWorkout.id && (
                                      <div className="flex mt-[10px]">
                                        <input
                                          ref={(el) =>
                                            (repsRef.current[index] = el)
                                          }
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
                            </>
                          }
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )
            )}
          </div>

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
            startedWorkout.id === displayWorkout.id ? (
            <>
              <div className="text-center text-[20px]">
                Время тренировки: <Stopwatch time={workoutTime} />{" "}
              </div>

              <button
                onClick={() => setIsConfirm(true)}
                className={
                  "mt-[28px] text-[#fff] text-[16px] w-full rounded-[45px] bg-[#ec3030] px-[16px] py-[8px] hover:bg-[#C6FF00] hover:cursor-pointer"
                }
              >
                Закончить тренировку
              </button>
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
              startedWorkout.id !== displayWorkout.id ? null : (
                <BottomBtn
                  onClick={startWorkout}
                  btnText={"Начать тренировку"}
                />
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
      }
    </>
  );
}
