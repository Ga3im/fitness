import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { router } from "./router";
import { useContext, useEffect, useState } from "react";
import { Filter } from "../components/Filter";
import { SetContext } from "../context/context";
import type { errInfoType, exercisesType } from "../types/types";
import { exercises } from "../data";
import { Exercese } from "../components/Exercese";

export const CreateWorkout = () => {
  const { changeWorkouts, workouts, workout, changeWorkout } =
    useContext(SetContext);
  const [errInfo, setErrInfo] = useState<errInfoType>({
    workoutName: false,
    exercise: false,
    reps: [],
  });

  const [displayedExercises, setDisplayedExercisess] = useState<
    exercisesType[]
  >([]);
  const [search, setSearch] = useState<string>("");
  const [filteredExercises, setFilteredExercises] = useState<[]>([]);
  const [scroll, setScroll] = useState(false);
  const [lowerPos, setLowerPos] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 100
      ) {
        setLowerPos(true);
      } else {
        setLowerPos(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const scrollChange = () => {
      if (window.scrollY > 200) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", scrollChange);
    return () => {
      window.removeEventListener("scroll", scrollChange);
    };
  }, []);

  useEffect(() => {
    const arr = [];
    exercises.map((i) => {
      if (i.name.toLowerCase().includes(search.toLowerCase())) {
        arr.push(i);
      }
    });
    setFilteredExercises(arr);
  }, [search]);

  useEffect(() => {
    const arr: exercisesType[] = [];
    for (let index = 0; index <= 5; index++) {
      const element: exercisesType = exercises[index];
      arr.push(element);
    }
    setDisplayedExercisess(arr);
  }, []);

  useEffect(() => {
    if (workout.nameRU !== "") {
      setErrInfo({ ...errInfo, workoutName: false });
    }
    if (workout.workouts.length !== 0) {
      setErrInfo({ ...errInfo, exercise: false });
    }
  }, [workout]);

  useEffect(() => {
    changeWorkout({
      ...workout,
      id: Math.random().toString(32),
      img: "/img/custom.jpg",
    });
  }, []);

  const backBtn = () => {
    navigate(router.profile);
  };

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files instanceof FileList) {
      const file = e.target.files[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        changeWorkout({ ...workout, img: previewUrl });
      }
    }
  };

  const moreExercisesBtn = () => {
    const arr: exercisesType[] = [];
    for (
      let i = displayedExercises.length;
      i < displayedExercises.length + 6;
      i++
    ) {
      const element = exercises[i];
      console.log(element);
      if (element !== undefined) {
        arr.push(element);
      }
    }
    setDisplayedExercisess([...displayedExercises, ...arr]);
  };

  const createWorkoutBtn = () => {
    if (workout.nameRU === "") {
      {
        setErrInfo({ ...errInfo, workoutName: true });
      }
    } else {
      setErrInfo({ ...errInfo, workoutName: false });
    }
    if (workout.workouts.length === 0) {
      {
        setErrInfo({ ...errInfo, exercise: true });
      }
    } else {
      setErrInfo({ ...errInfo, exercise: false });
    }
    const errRepsH: string[] = [];
    workout.workouts.map((i: exercisesType) => {
      if (i.reps === 0 || i.reps == null) {
        {
          errRepsH.push(i.id);
        }
      }
    });
    setErrInfo({ ...errInfo, reps: errRepsH });

    changeWorkout({ ...workout });
    if (
      errInfo.workoutName !== true &&
      errInfo.exercise !== true &&
      errInfo.reps.length === 0
    ) {
      changeWorkouts([...workouts, workout]);
      navigate(router.main);
      localStorage.removeItem("workout");
    }
  };
  return (
    <>
      <Header />

      <div className="px-[16px]">
        <div
          onClick={backBtn}
          className="text-[24px] opacity-[0.7] pb-[10px] hover:underline cursor-pointer"
        >
          &laquo; Назад
        </div>
        <h1 className="text-[32px] font-medium leading-none mb-[34px]">
          Создайте свою тренировку
        </h1>
        <div className="flex flex-col gap-[10px] pb-[20px]">
          <p className="text-[26px]">Название тренировки:</p>
          <input
            onChange={(e) =>
              changeWorkout({ ...workout, nameRU: e.target.value })
            }
            className={
              errInfo.workoutName
                ? "border-[2px] border-[red] px-[16px] py-[8px] rounded-[10px]"
                : "border-[1px] border-[#000000] px-[16px] py-[8px] rounded-[10px]"
            }
            type="text"
            placeholder="Введите назвавние тренировки"
          />
        </div>
        <div className="text-center mt-[10px] text-[18px] w-full rounded-[45px] bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-[#A0B000] active:text-[white] px-[16px] py-[8px] mb-[10px]">
          <label htmlFor="mainWorkoutPhoto">Загрузить фото тренировки</label>
          <input
            onChange={(e) => fileChange(e)}
            id="mainWorkoutPhoto"
            type="file"
            className="hidden"
          />
        </div>

        {workout.img === "" || workout.img === "/img/custom.jpg" ? null : (
          <>
            <img
              className="rounded-[10px] max-h-[200px] place-self-center"
              src={workout.img}
              alt=""
            />
            <p
              onClick={() => changeWorkout({ ...workout, img: "" })}
              className="underline text-center cursor-pointer"
            >
              Удалить фото
            </p>
          </>
        )}
        <textarea
          onChange={(e) =>
            changeWorkout({ ...workout, descreption: e.target.value })
          }
          className="resize-none w-full mt-[10px] px-[10px] py-[5px] border-1 rounded-[10px]"
          name=""
          placeholder="Добавить описание"
          id=""
        ></textarea>

        <div
          className={
            errInfo.exercise
              ? "pb-[20px] border-2 border-[red] rounded-[10px] p-[10px]"
              : "pb-[20px]"
          }
        >
          <p className="text-[20px] pb-[10px]">Упражнения:</p>
          <Filter
            search={search}
            setSearch={setSearch}
            array={exercises}
            setFilteredArray={setFilteredExercises}
          />
          <div className="flex pt-[20px] flex-wrap gap-[20px] justify-center">
            {search === ""
              ? displayedExercises.map((i) => (
                  <Exercese i={i} errInfo={errInfo} setErrInfo={setErrInfo} />
                ))
              : filteredExercises.map((i: exercisesType) => (
                  <Exercese i={i} errInfo={errInfo} setErrInfo={setErrInfo} />
                ))}

            <div
              onClick={moreExercisesBtn}
              className="h-[30px] w-full bg-[#d1d1d1] flex justify-center shadow-[0px_0px_20px_10px_#d1d1d1] rounded-[5px]"
            >
              <div className="w-[20px] h-[20px] border-l-2 border-b-2 rotate-[-45deg]"></div>
            </div>
          </div>
        </div>
        {scroll && !lowerPos ? (
          <button
            onClick={createWorkoutBtn}
            className={
              "fixed bottom-0 right-0 mt-[20px] mx-[16px] text-[18px] rounded-[45px] bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-[#A0B000] active:text-[white] px-[16px] py-[8px] mb-[10px]"
            }
          >
            Создать
          </button>
        ) : (
          <button
            onClick={createWorkoutBtn}
            className={
              "w-full mt-[20px] text-[18px] rounded-[45px] bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-[#A0B000] active:text-[white] px-[16px] py-[8px] mb-[10px]"
            }
          >
            Создать
          </button>
        )}
      </div>
    </>
  );
};
