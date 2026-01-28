import { useContext, useEffect, useRef, useState } from "react";
import { SetContext } from "../context/context";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { router } from "./router";
import type { exercisesType, workoutType } from "../types/types";

export default function WorkoutPage() {
  let {
    isAuth,
    user,
    selectedWorkout,
    changeSelectedWorkout,
    workoutsId,
    setWorkoutsId,
    isStartingWorkout,
    setIsStartingWorkout,
  } = useContext(SetContext);
  const repsRef = useRef<React.RefObject<(HTMLInputElement | null)[]>>([]);
  const navigate = useNavigate();
  const [doneWorkout, setDoneWorkout] = useState(false);
  let doneExerciseCount: number = 0;

  useEffect(() => {
    selectedWorkout.workouts.map((i) => {
      if (i.done) {
        doneExerciseCount++;
      }
      if (doneExerciseCount === selectedWorkout.workouts.length) {
        setDoneWorkout(true);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  if (selectedWorkout === null) {
    let savedSelectedWorkout = localStorage.getItem("selectedWorkout");
    if (savedSelectedWorkout) {
      selectedWorkout = JSON.parse(savedSelectedWorkout);
    }
  }

  const backBtn = () => {
    setIsStartingWorkout(false);
    localStorage.removeItem("selectedWorkout");
    navigate(router.main);
  };

  const addFavoriteWorkout = (
    e: React.MouseEvent<HTMLDivElement | SVGSVGElement, MouseEvent>,
    workout: workoutType
  ) => {
    e.stopPropagation();
    if (workoutsId.includes(workout.id)) {
      user.myWorkouts = user.myWorkouts?.filter(
        (i: workoutType) => i.id !== workout.id
      );
      setWorkoutsId(workoutsId.filter((i: string) => i !== workout.id));
    } else {
      user.myWorkouts = [...user.myWorkouts, workout];
      setWorkoutsId([...workoutsId, workout.id]);
    }
  };

  const addRepsBtn = (exercise: exercisesType) => {
    if (exercise.doneReps === undefined) {
      exercise.doneReps = [
        Number(
          repsRef.current[selectedWorkout.workouts.indexOf(exercise)].value
        ),
      ];
    } else {
      exercise.doneReps.push(
        Number(
          repsRef.current[selectedWorkout.workouts.indexOf(exercise)].value
        )
      );
    }
    if (
      exercise.sets * exercise.reps <=
      exercise.doneReps?.reduce((acc, cur) => acc + cur, 0)
    ) {
      exercise.done = true;
    }

    changeSelectedWorkout({
      ...selectedWorkout,
    });
    if (repsRef.current !== null) {
      repsRef.current[selectedWorkout.workouts.indexOf(exercise)].value = "";
    }
  };

const startOver = ()=>{
  console.log('Выйти')
}

  const startWorkout = () => {
    changeSelectedWorkout({
      ...selectedWorkout,
      workouts: selectedWorkout.workouts,
    });

    setIsStartingWorkout(!isStartingWorkout);
  };


  return (
    <>
      <Header />
      <div className="px-[16px] pb-[50px]">
        <div
          onClick={backBtn}
          className="text-[24px] opacity-[0.7] pb-[10px] hover:underline cursor-pointer"
        >
          &laquo; Назад
        </div>
        <h1 className="text-[32px] pl-[25px] pb-[20px] font-600">
          {selectedWorkout.nameRU}
        </h1>
        {isAuth ? (
          workoutsId.includes(selectedWorkout.id) ? (
            <div
              title="Удалить из избранных"
              onClick={(e) => addFavoriteWorkout(e, selectedWorkout)}
              className="bg-[red] shadow-[0px_0px_20px_0px_white] place-self-end relative top-[45px] right-[15px] hover:scale-[1.3] hover:border-[#000000] hover:border-[1px] transition-[0.3s] w-[27px] h-[27px] rounded-[100%] relative"
            >
              <div className="h-[3px] w-[15px] bg-[white] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"></div>
            </div>
          ) : (
            <div
              title="Добавить в избранные"
              onClick={(e) => addFavoriteWorkout(e, selectedWorkout)}
              className="bg-[green] shadow-[0px_0px_20px_0px_white] place-self-end relative top-[45px] right-[15px] hover:scale-[1.3] hover:border-[#000000] hover:border-[1px] transition-[0.3s] w-[27px] h-[27px] rounded-[100%] relative"
            >
              <div className="h-[15px] w-[3px] bg-[white] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"></div>
              <div className="h-[3px] w-[15px] bg-[white] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"></div>
            </div>
          )
        ) : null}
        <img
          className="rounded-[30px] flex place-self-center mb-[40px]"
          src={selectedWorkout.img}
          alt={selectedWorkout.nameEN}
        />

        {selectedWorkout.description && (
          <div className="relative p-[30px] mb-[10px] bg-white rounded-[30px] w-full shadow-[0px_0px_10px_-7px]">
            <p className="text-justify">
              <span className="text-[18px] font-[600]"></span>
              {selectedWorkout.description}
            </p>
          </div>
        )}
        <p className="text-[24px] pb-[20px] pl-[10px]">Упражнения:</p>

        <div className="flex flex-wrap gap-[10px] justify-center p-[30px] mb-[10px] bg-white rounded-[30px] w-full shadow-[0px_0px_10px_-7px]">
          {selectedWorkout.workouts.map(
            (exercise: exercisesType, index: number) => (
              <div>
                <div className="w-[300px] p-[20px] border-[black] border-1 rounded-[20px] shadow-[0px_0px_15px_-10px]">
                  <img className="cursor-pointer " src={exercise.img} alt="" />
                  <p className="text-[24px]">{exercise.name}</p>
                  <div>
                    {isStartingWorkout && (
                      <>
                        {exercise.sets !== exercise.doneReps?.length && (
                          <div className="pb-[10px]">
                            <span>Подходы:</span>
                            <span> {exercise.sets}</span>
                            <br />
                            <span>Повторения:</span>
                            <span> {exercise.reps}</span>
                          </div>
                        )}

                        {exercise.doneReps !== undefined && (
                          <div>
                            <div className="flex justify-around">
                              <span>Подходы </span>
                              <span>Повторения</span>
                            </div>
                            {exercise.doneReps.map((i, index) => (
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
                                {exercise.doneReps?.reduce(
                                  (acc, cur) => acc + cur,
                                  0
                                )}
                              </span>
                            </div>

                            <progress
                              className="w-full pt-[10px] [&::-webkit-progress-bar]:rounded-[50px] [&::-webkit-progress-bar]:h-[6px] [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:bg-[#00C1FF] [&::-webkit-progress-value]:rounded-[50px] "
                              value={exercise.doneReps?.reduce(
                                (acc, cur) => acc + cur,
                                0
                              )}
                              max={exercise.reps * exercise.sets}
                            ></progress>
                          </div>
                        )}

                        {exercise.reps * exercise.sets <=
                        exercise.doneReps?.reduce(
                          (acc, cur) => acc + cur,
                          0
                        ) ? (
                          <p className="text-[24px] text-shadow-[0px_0px_10px] text-center mt-[10px] text-[#00bd44]">
                            Сделано
                          </p>
                        ) : (
                          <>
                            <div className="flex mt-[10px]">
                              <input
                                ref={(el) => (repsRef.current[index] = el)}
                                min={0}
                                className="w-full textfield rounded-tl-[5px] rounded-bl-[5px] py-[5px] px-[10px] border-t-1 border-l-1 border-b-1 focus: outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number"
                                placeholder="Количество повторений"
                              />
                              <button
                                onClick={() => addRepsBtn(exercise)}
                                className="border-t-1 border-b-1 border-r-1 hover:bg-[#C6FF00] cursor-pointer bg-[#BCEC30] w-[30px] rounded-tr-[5px] rounded-br-[5px] relative"
                              >
                                <div className="w-[10px] h-[10px] border-l-2 border-b-2 rotate-[225deg] absolute transform  top-[50%] left-[40%] translate-x-[-50%] translate-y-[-50%]"></div>
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        {doneWorkout ? (
          <div>
            <button
              onClick={startOver}
              className="mt-[28px] text-[16px] w-full rounded-[45px] bg-[#fff] border-1 px-[16px] py-[8px] hover:bg-[#C6FF00] hover:cursor-pointer"
            >
              Начать заново
            </button>
            <button
              onClick={backBtn}
              className="mt-[10px] text-[16px] w-full rounded-[45px] bg-[#BCEC30] px-[16px] py-[8px] hover:bg-[#C6FF00] hover:cursor-pointer"
            >
              Вернуться на главное
            </button>
          </div>
        ) : (
          <button
            onClick={startWorkout}
            className={
              isStartingWorkout
                ? "mt-[28px] text-[#fff] text-[16px] w-full rounded-[45px] bg-[#ec3030] px-[16px] py-[8px] hover:bg-[#C6FF00] hover:cursor-pointer"
                : "mt-[28px] text-[16px] w-full rounded-[45px] bg-[#BCEC30] px-[16px] py-[8px] hover:bg-[#C6FF00] hover:cursor-pointer"
            }
          >
            {isStartingWorkout ? "Закончить тренировку" : " Начать тренировку"}
          </button>
        )}
      </div>
    </>
  );
}
