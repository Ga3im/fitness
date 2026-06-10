import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { router } from "./router";
import { useEffect, useState } from "react";
import type { exercisesType, ModeTypes, workoutType } from "../types/types";
import { exercises } from "../data";
import { BottomBtn } from "../components/BottomBtn";
import { Exercise } from "../components/Exercise";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setWorkouts } from "../store/features/workoutSlice";
import { FilterExercise } from "../components/FilterExercise";
import { ModeWorkouts } from "../components/Workout/ModeWorkouts";
import { BackBtn } from "../components/BackBtn";

export const CreateWorkout = () => {
  const { workouts, emptyExerciseReps } = useAppSelector(
    (state) => state.workoutSlice
  );
  const dispatch = useAppDispatch();
  const [isSelectedName, setIsSelectedName] = useState<boolean>(true);
  const [isSelectedExercise, setIsSelectedExercise] = useState<boolean>(true);
  const [displayedExercises, setDisplayedExercisess] = useState<
    exercisesType[]
  >([]);
  const [search, setSearch] = useState<string>("");
  const [filteredExercises, setFilteredExercises] = useState<
    exercisesType[] | []
  >([]);
  const [workout, setWorkout] = useState<workoutType>({
    id: "",
    description: "",
    mode: "свободное",
    order: workouts.length,
    img: "",
    nameRU: "",
    nameEN: "",
    exercises: [],
    custom: true,
  });
  const { theme } = useAppSelector((state) => state.setting);

  const navigate = useNavigate();

  useEffect(() => {
    const arr: exercisesType[] = [];

    exercises.map((i: exercisesType | undefined) => {
      if (i !== undefined) {
        if (i.name.toLowerCase()?.includes(search.toLowerCase())) {
          arr.push(i);
        }
      }
    });
    setFilteredExercises(arr);
  }, [search]);

  useEffect(() => {
    const arr: exercisesType[] = [];
    for (let index = 0; index <= 5; index++) {
      const element: exercisesType | undefined = exercises[index];
      if (element !== undefined) {
        arr.push(element);
      }
    }
    setDisplayedExercisess(arr);
  }, []);

  useEffect(() => {
    setWorkout({
      ...workout,
      id: Math.random().toString(32),
      img: "/img/custom.jpg",
    });
  }, []);

  useEffect(() => {
    if (workout.nameRU !== "") {
      setIsSelectedName(true);
    }
    if (workout.exercises.length !== 0) {
      setIsSelectedExercise(true);
    }
  }, [workout]);

  const backBtn = () => {
    navigate(-1);
  };

  let previewUrl;

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files instanceof FileList) {
      const file = e.target.files[0];
      if (file) {
        previewUrl = URL.createObjectURL(file);
        setWorkout({ ...workout, img: previewUrl });
      }
    }
  };

  const deletePhoto = () => {
    previewUrl = null;
    setWorkout({ ...workout, img: "" });
  };

  const hideExercisesBtn = () => {
    const arr: exercisesType[] = [];

    for (let i = 0; i < 6; i++) {
      const element = displayedExercises[i];
      arr.push(element);
    }
    setDisplayedExercisess(arr);
  };

  const handleModeChange = (value: ModeTypes) => {
    if (!workout) return;
    setWorkout({ ...workout, mode: value });
  };

  const moreExercisesBtn = () => {
    const arr: exercisesType[] = [];
    for (
      let i = displayedExercises.length;
      i < displayedExercises.length + 10;
      i++
    ) {
      const element: exercisesType | undefined = exercises[i];
      if (element !== undefined) {
        arr.push(element);
      }
    }
    setDisplayedExercisess([...displayedExercises, ...arr]);
  };

  const createWorkoutBtn = () => {
    if (workout.nameRU === "") {
      setIsSelectedName(false);
    }
    if (workout.exercises.length === 0) {
      setIsSelectedExercise(false);
    }
    const errRepsH: string[] = [];
    workout.exercises.map((i: exercisesType) => {
      if (i.reps === 0 || i.reps == null) {
        {
          errRepsH.push(i.id);
        }
      }
    });

    if (
      workout.nameRU !== "" &&
      workout.exercises.length !== 0 &&
      emptyExerciseReps.length === 0
    ) {
      dispatch(setWorkouts([...workouts, workout]));
      navigate(router.main);
      localStorage.removeItem("workout");
    }
  };
  return (
    <>
      <Header />
      <div
        className={
          theme === "night"
            ? "px-[16px] pb-[20px] bg-[#000] text-[#ffffff] transition-all duration-500"
            : "px-[16px] pb-[20px] text-[#000] transition-all duration-500"
        }
      >
        <BackBtn onClick={backBtn} />
        <h1 className="text-[20px] font-medium leading-none mb-[10px]">
          Создайте свою тренировку
        </h1>
        <div className="flex flex-col gap-[10px] pb-[10px]">
          <p className="text-[16px]">Название тренировки:</p>
          <input
            onChange={(e) => setWorkout({ ...workout, nameRU: e.target.value })}
            className={
              isSelectedName
                ? theme === "night"
                  ? "border-[1px] border-[#fff] px-[16px] py-[5px] rounded-[10px] placeholder-gray-400"
                  : "border-[1px] border-[#000000] px-[16px] py-[5px] rounded-[10px] placeholder-gray-400"
                : "border-[2px] border-[red] px-[16px] py-[5px] rounded-[10px]"
            }
            type="text"
            placeholder="Введите назвавние тренировки"
          />
        </div>
        <div className="text-center mt-[10px] text-[#000] text-[14px] w-full rounded-[45px] bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-[#A0B000] active:text-[white] px-[16px] py-[5px] mb-[10px]">
          <label htmlFor="mainWorkoutPhoto">
            {previewUrl ? "Обновить фото" : "Загрузить фото тренировки"}
          </label>
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
              onClick={deletePhoto}
              className="underline text-center cursor-pointer"
            >
              Удалить фото
            </p>
          </>
        )}
        <textarea
          onChange={(e) =>
            setWorkout({ ...workout, description: e.target.value })
          }
          className="resize-none w-full mt-[10px] px-[10px] py-[5px] border-1 rounded-[10px] placeholder-gray-400"
          name=""
          placeholder="Добавить описание"
          id=""
        ></textarea>

        <div
          className={
            !isSelectedExercise
              ? "border-2 border-[red] rounded-[10px] p-[10px]"
              : ""
          }
        >
          <ModeWorkouts
            handleModeChange={handleModeChange}
            currentMode={workout.mode || "свободное"}
          />
          <p className="text-[20px] pb-[10px]">Упражнения:</p>
          <FilterExercise
            search={search}
            setSearch={setSearch}
            array={exercises.filter((e): e is exercisesType => !!e)}
            setFilteredArray={setFilteredExercises}
          />
          <div className="flex pt-[20px] flex-wrap gap-[20px] justify-center">
            {search === ""
              ? displayedExercises.map((ex: exercisesType) => (
                  <Exercise
                    workout={workout}
                    setWorkout={setWorkout}
                    exercise={ex}
                  />
                ))
              : filteredExercises.map((ex: exercisesType) => (
                  <Exercise
                    workout={workout}
                    setWorkout={setWorkout}
                    exercise={ex}
                  />
                ))}

            {exercises.length === displayedExercises.length ? (
              <div
                onClick={hideExercisesBtn}
                className={
                  theme === "night"
                    ? "h-[25px] w-full bg-[#323232] flex justify-center shadow-[0px_0px_20px_10px_#d1d1d1] rounded-[5px]"
                    : "h-[25px] w-full bg-[#d1d1d1] flex justify-center shadow-[0px_0px_20px_10px_#d1d1d1] rounded-[5px]"
                }
              >
                <div className="w-[20px] mt-[10px] h-[20px] border-l-2 border-b-2 rotate-[135deg]"></div>
              </div>
            ) : (
              <div
                onClick={moreExercisesBtn}
  className={
                  theme === "night"
                    ? "h-[25px] w-full bg-[#323232] flex justify-center rounded-[5px]"
                    : "h-[25px] w-full bg-[#d1d1d1] flex justify-center rounded-[5px]"
                }              >
                <div className="w-[20px] h-[20px] border-l-2 border-b-2 rotate-[-45deg]"></div>
              </div>
            )}
          </div>
        </div>
        <BottomBtn onClick={createWorkoutBtn} btnText={"Создать"} />
      </div>
    </>
  );
};
