import { useContext, useEffect, useRef, useState } from "react";
import { SetContext } from "../context/context";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { router } from "./router";
import type { exercisesType, workoutType } from "../types/types";
import { BottomBtn } from "../components/BottomBtn";
import { Stopwatch } from "../components/Stopwatch";
import { StartTimeBtn } from "../components/StartTimeBtn";
import { timeHHMMSS } from "../utils/functions";

export default function WorkoutPage() {
  let {
    isAuth,
    user,
    changeUser,
    startedWorkout,
    changeStartededWorkout,
    changeWorkouts,
    workouts,
    favoriteWorkoutId,
    additionalSetting,
    time,
    setTime,
    viewWorkout,
    changeViewWorkout,
  } = useContext(SetContext);
  const repsRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const [doneWorkout, setDoneWorkout] = useState<boolean>(false);
  const [userWeight, setUserWeight] = useState<number | null>(null);
  const [isEnteringWeight, setIsEnteringWeight] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  let doneExerciseCount: number = 0;
  let wakeLock: WakeLockSentinel | null = null;

  const requestWakeLock = async () => {
    try {
      // Запрос блокировки экрана
      wakeLock = await navigator.wakeLock.request("screen");
      console.log("Экран не выключится");
    } catch (err) {
      console.error(err);
    }
  };

  const releaseWakeLock = async () => {
    try {
      await wakeLock?.release();
      console.log("Cнятие блокировки");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    return () => {
      releaseWakeLock();
    };
  }, []);

  useEffect(() => {
    const savedViewWorkout = localStorage.getItem("viewWorkout");
    if (savedViewWorkout) {
      changeViewWorkout(JSON.parse(savedViewWorkout));
    }
  }, []);
  let displayWorkout = viewWorkout; // объект с тренировками для отображения на странице

  // событие на завершение тренировки
  useEffect(() => {
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
    if (userWeight && startedWorkout) {
      let reps = Math.ceil(5000 / userWeight);
      startedWorkout?.exercises.map((i: exercisesType) => {
        i.reps = reps;
      });
      changeStartededWorkout({ ...startedWorkout, needWeight: false });

      setIsEnteringWeight(false);
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
    if (user.myWorkouts.length === 0) {
      changeUser({
        ...user,
        myWorkouts: [...user.myWorkouts, startedWorkout],
      });
    } else {
      user.myWorkouts.map((i: workoutType) => {
        if (i.id === startedWorkout.id) {
          changeUser({
            ...user,
            myWorkouts: user.myWorkouts.filter(
              (i: exercisesType) => i.id !== startedWorkout.id
            ),
          });
        } else {
          changeUser({
            ...user,
            myWorkouts: [...user.myWorkouts, startedWorkout],
          });
        }
      });
    }
  };

  const addRepsBtn = (exercise: exercisesType, currentReps: string) => {
    if (exercise.doneReps === undefined) {
      exercise.doneReps = Number(currentReps);
      exercise.table = [currentReps];
    } else {
      exercise.doneReps = exercise.doneReps + Number(currentReps);
      exercise.table.push(currentReps);
    }

    if (exercise.sets * exercise.reps <= exercise.doneReps) {
      exercise.done = true;
    }
    changeStartededWorkout({
      ...startedWorkout,
    });
    !exercise.static &&
      (repsRef.current[displayWorkout.exercises.indexOf(exercise)].value = "");
  };

  const editWeightBtn = () => {
    setIsEnteringWeight(true);
  };

  const startWorkout = () => {
    requestWakeLock();
    if (displayWorkout && displayWorkout.needWeight) {
      setIsEnteringWeight(true);
    } else {
      changeStartededWorkout({
        ...displayWorkout,
        exercises: displayWorkout.exercises,
      });
    }
  };

  const returnToMain = () => {
    localStorage.removeItem("viewWorkout");
    localStorage.removeItem("startedWorkout");
    changeStartededWorkout(null);
    navigate(router.main);
  };

  const finishWorkout = () => {
    setIsConfirm(false);
    releaseWakeLock();
    changeStartededWorkout(null);
    setTime(0);
  };

  const deleteWorkout = () => {
    changeStartededWorkout(null);
    changeWorkouts(
      workouts.filter((i: workoutType) => i.id !== displayWorkout?.id)
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
            <div className="flex justify-between">
              <button
                onClick={cancelWeightBtn}
                className="mt-[10px] text-[16px] rounded-[45px] bg-[white] border-1 px-[16px] py-[8px] hover:bg-[#C6FF00] hover:cursor-pointer"
              >
                Отмена
              </button>

              <button
                onClick={confirmWeightBtn}
                className="mt-[10px] text-[16px] rounded-[45px] border-1 border-[#BCEC30] bg-[#BCEC30] px-[16px] py-[8px] hover:bg-[#C6FF00] hover:cursor-pointer"
              >
                Далее
              </button>
            </div>
          </div>
        </div>
      )}
      {isConfirm && (
        <div className=" fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-3 bg-[white] rounded-[10px] p-[20px] shadow-[0px_0px_25px_-5px]">
          <div className="w-[300px] flex flex-col gap-[20px]">
            <p className="text-[20px]">Вы хотите завершить тренировку?</p>
            <div className="flex justify-between">
              <button
                onClick={() => setIsConfirm(false)}
                className="mt-[10px] text-[16px] rounded-[45px] bg-[white] border-1 px-[16px] py-[8px] hover:bg-[#C6FF00] hover:cursor-pointer"
              >
                Нет
              </button>

              <button
                onClick={finishWorkout}
                className="mt-[10px] text-[16px] rounded-[45px] border-1 border-[#BCEC30] bg-[#BCEC30] px-[16px] py-[8px] hover:bg-[#C6FF00] hover:cursor-pointer"
              >
                Да
              </button>
            </div>
          </div>
        </div>
      )}
      <Header />
      <div className="px-[16px] pb-[20px]">
        <div
          onClick={backBtn}
          className="text-[24px] opacity-[0.7] pb-[10px] hover:underline cursor-pointer"
        >
          &laquo; Назад
        </div>
        <h1 className="text-[32px] pl-[25px] pb-[20px] font-600">
          {displayWorkout?.nameRU}
        </h1>
        <div className="flex flex-col md:flex-row md:gap-[20px] place-items-center  md:items-center justify-center">
          <div className="relative w-[300px]">
            {isAuth && displayWorkout ? (
              favoriteWorkoutId.includes(displayWorkout.id) ? (
                <div
                  title="Удалить из избранных"
                  onClick={(e) => addFavoriteWorkout(e)}
                  className="bg-[red] z-1 shadow-[0px_0px_20px_0px_white] place-self-end relative top-[45px] right-[15px] hover:scale-[1.3] hover:border-[#000000] hover:border-[1px] transition-[0.3s] w-[27px] h-[27px] rounded-[100%] relative"
                >
                  <div className="h-[3px] w-[15px] bg-[white] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"></div>
                </div>
              ) : (
                <div
                  title="Добавить в избранные"
                  onClick={(e) => addFavoriteWorkout(e)}
                  className="bg-[green] z-1 shadow-[0px_0px_20px_0px_white] place-self-end relative top-[45px] right-[15px]  hover:scale-[1.3] top-[10px] hover:border-[#000000] hover:border-[1px] transition-[0.3s] w-[27px] h-[27px] rounded-[100%] relative"
                >
                  <div className="h-[15px] w-[3px] bg-[white] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"></div>
                  <div className="h-[3px] w-[15px] bg-[white] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"></div>
                </div>
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
        <p className="text-[24px] pb-[20px] pl-[10px]">Упражнения:</p>

        <div className="flex flex-wrap gap-[10px] justify-center p-[30px] mb-[10px] bg-white rounded-[30px] w-full shadow-[0px_0px_10px_-7px]">
          {displayWorkout?.exercises.map(
            (exercise: exercisesType, index: number) => (
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
                        {additionalSetting.noSets.includes(exercise.id) ? ( // подходы и повторения
                          <div className="pb-[10px]">
                            <span>Подходы:</span>
                            <span> {exercise.sets}</span>
                            <br />
                          </div>
                        ) : (
                          exercise.sets * exercise.reps !==
                            exercise.doneReps?.length && (
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
                                {exercise.static
                                  ? timeHHMMSS(exercise.reps) + " мин"
                                  : exercise.reps}
                              </span>
                            </div>
                          )
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
                                <span className="text-center w-[50%]">{i}</span>
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

                        {exercise.reps * exercise.sets <= exercise.doneReps ? (
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
                                    ref={(el) => (repsRef.current[index] = el)}
                                    min={0}
                                    className="w-full textfield rounded-tl-[5px] rounded-bl-[5px] py-[5px] px-[10px] border-t-1 border-l-1 border-b-1 focus: outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    type="number"
                                    placeholder="Количество повторений"
                                  />
                                  <button
                                    onClick={() =>
                                      addRepsBtn(
                                        exercise,
                                        repsRef.current[
                                          displayWorkout.exercises.indexOf(
                                            exercise
                                          )
                                        ]?.value
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

              <span className="font-medium pl-[5px]">{timeHHMMSS(time)}</span>

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
              Время тренировки: <Stopwatch time={time} setTime={setTime} />{" "}
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
    </>
  );
}
