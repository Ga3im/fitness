import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { router } from "./router";
import { useContext, useEffect, useState } from "react";
import { Filter } from "../components/Filter";
import { SetContext } from "../context/context";
import type { exercisesType } from "../types/types";
import { exercises } from "../data";
import { BottomBtn } from "../components/BottomBtn";
import { Exercise } from "../components/Exercise";

export const CreateWorkout = () => {
  const { changeWorkouts, workouts, workout, changeWorkout, setIsOpenProfile } =
    useContext(SetContext);
  const [isSelectedName, setIsSelectedName] = useState<boolean>(true);
  const [isSelectedExercise, setIsSelectedExercise] = useState<boolean>(true);
  const [emptyReps, setEmptyReps] = useState<string[]>([]);

  const [displayedExercises, setDisplayedExercisess] = useState<
    exercisesType[]
  >([]);
  const [search, setSearch] = useState<string>("");
  const [filteredExercises, setFilteredExercises] = useState<[]>([]);

  const navigate = useNavigate();

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
    changeWorkout({
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
    navigate(router.profile);
  };

  let previewUrl;

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files instanceof FileList) {
      const file = e.target.files[0];
      if (file) {
        previewUrl = URL.createObjectURL(file);
        changeWorkout({ ...workout, img: previewUrl });
      }
    }
  };

  const deletePhoto = () => {
    previewUrl = null;
    changeWorkout({ ...workout, img: "" });
  };

  const hideExercisesBtn = () => {
    const arr: exercisesType[] = [];

    for (let i = 0; i < 6; i++) {
      const element = displayedExercises[i];
      arr.push(element);
    }
    setDisplayedExercisess(arr);
  };

  const moreExercisesBtn = () => {
    const arr: exercisesType[] = [];
    for (
      let i = displayedExercises.length;
      i < displayedExercises.length + 6;
      i++
    ) {
      const element: exercisesType = exercises[i];
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
    setEmptyReps(errRepsH);

    if (
      workout.nameRU !== "" &&
      workout.exercises.length !== 0 &&
      emptyReps.length === 0
    ) {
      changeWorkouts([...workouts, workout]);
      changeWorkout({
        ...workout,
        id: "",
        description: "",
        order: workouts.length,
        img: "",
        nameRU: "",
        nameEN: "",
        exercises: [],
        custom: true,
      });
      setEmptyReps([]);
      setIsOpenProfile(false);
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
              isSelectedName
                ? "border-[1px] border-[#000000] px-[16px] py-[8px] rounded-[10px]"
                : "border-[2px] border-[red] px-[16px] py-[8px] rounded-[10px]"
            }
            type="text"
            placeholder="Введите назвавние тренировки"
          />
        </div>
        <div className="text-center mt-[10px] text-[18px] w-full rounded-[45px] bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-[#A0B000] active:text-[white] px-[16px] py-[8px] mb-[10px]">
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
            changeWorkout({ ...workout, descreption: e.target.value })
          }
          className="resize-none w-full mt-[10px] px-[10px] py-[5px] border-1 rounded-[10px]"
          name=""
          placeholder="Добавить описание"
          id=""
        ></textarea>

        <div
          className={
            !isSelectedExercise
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
              ? displayedExercises.map((i: exercisesType) => (
                  <Exercise
                    i={i}
                    emptyReps={emptyReps}
                    setEmptyReps={setEmptyReps}
                  />
                ))
              : filteredExercises.map((i: exercisesType) => <Exercise i={i} />)}

            {exercises.length === displayedExercises.length ? (
              <div
                onClick={hideExercisesBtn}
                className="h-[30px] w-full bg-[#d1d1d1] flex justify-center shadow-[0px_0px_20px_10px_#d1d1d1] rounded-[5px]"
              >
                <div className="w-[20px] mt-[10px] h-[20px] border-l-2 border-b-2 rotate-[135deg]"></div>
              </div>
            ) : (
              <div
                onClick={moreExercisesBtn}
                className="h-[30px] w-full bg-[#d1d1d1] flex justify-center rounded-[5px]"
              >
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
