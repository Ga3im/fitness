import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { router } from "./router";
import { useContext, useEffect, useState } from "react";
import { exercises, type exercisesType } from "../data";
import { SetContext, type workoutType } from "../context/context";

export const CreateWorkout = () => {
  const { changeCourses, courses, workout, setWorkout } =
    useContext(SetContext);
  const [isTimeReps, setIsTimeReps] = useState<boolean>(false);
  const [isTimeSets, setIsTimeSets] = useState<boolean>(false);
  const [errName, setErrName] = useState(false);
  const [errSelected, setErrSelected] = useState(false);
  const [errReps, setErrReps] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleExerciseClick = (exercise: exercisesType) => {
    if (selectedExercise.length === 0) {
      setSelectedExercise([...selectedExercise, exercise.id]);
    } else {
      setSelectedExercise(
        selectedExercise.filter((item) => item !== exercise.id)
      );
      if (selectedExercise.includes(exercise.id)) {
      } else {
        setSelectedExercise([...selectedExercise, exercise.id]);
      }
    }
  };
  console.log(selectedExercise);

  const handleMoreExercisesClick = () => {};

  const handleBackBtn = () => {
    navigate(router.profile);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setWorkout({ ...workout, img: previewUrl });
    }
  };

  const handleAddTimeSets = () => {
    setIsTimeSets(!isTimeSets);
  };

  const handleAddTimeReps = () => {
    setIsTimeReps(!isTimeReps);
  };

  const handleCreateWorkout = () => {
    if (workout.nameRU === "") {
      {
        setErrName(true);
      }
    } else {
      setErrName(false);
    }
    if (typeof workout.selectedExercise === "object") {
      {
        setErrSelected(true);
      }
    } else {
      setErrSelected(false);
    }
    if (workout.reps === 0) {
      {
        setErrReps(true);
      }
    } else {
      setErrReps(false);
    }
    let customWorkout = courses.push(workout);
    console.log(customWorkout);
    // changeCourses(customWorkout);
    // navigate(router.main);
  };
  return (
    <>
      <Header />

      <div className="px-[16px]">
        <div
          onClick={handleBackBtn}
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
            onChange={(e) => setWorkout({ ...workout, nameRU: e.target.value })}
            className={
              errName
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
            onChange={(e) => handleFileChange(e)}
            id="mainWorkoutPhoto"
            type="file"
            className="hidden"
          />
        </div>
        {workout.img === "" ? (
          ""
        ) : (
          <>
            <img
              className="rounded-[10px] max-h-[200px] place-self-center"
              src={workout.img}
              alt=""
            />
            <p
              onClick={() => setWorkout({ ...workout, img: "" })}
              className="underline text-center cursor-pointer"
            >
              Удалить фото
            </p>
          </>
        )}

        <div
          className={
            errSelected
              ? "pb-[20px] border-2 border-[red] rounded-[10px] p-[10px]"
              : "pb-[20px]"
          }
        >
          <p className="text-[20px] pb-[10px]">Упражнения:</p>
          <div className="flex flex-wrap gap-[20px] justify-center">
            {exercises.map((i) => (
              <div
                onClick={() => handleExerciseClick(i)}
                key={i.id}
                className={
                  selectedExercise.includes(i.id)
                    ? `p-[20px] border-[red] border-1 rounded-[20px] cursor-pointer shadow-[0px_0px_10px_0px_red]`
                    : `p-[20px] border-1 rounded-[20px] cursor-pointer shadow-[0px_0px_10px_0px]`
                }
              >
                <img className="w-[100px] mb-[10px]" src={i.img} />
                <p>{i.name}</p>
              </div>
            ))}
            <div
              onClick={handleMoreExercisesClick}
              className="h-[30px] w-full bg-[#d1d1d1] flex justify-center shadow-[0px_0px_20px_10px_#d1d1d1] rounded-[5px]"
            >
              <div className="w-[20px] h-[20px] border-l-2 border-b-2 rotate-[-45deg]"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] pb-[10px]">
          <p className="text-[20px]">Подходы:</p>
          <input
            onChange={(e) =>
              setWorkout({ ...workout, sets: Number(e.target.value) })
            }
            className="border-[1px] border-[#000000] px-[16px] py-[8px] rounded-[10px]"
            type="number"
            placeholder="Количество подходов"
          />
        </div>
        <div className="pb-[20px]" onClick={handleAddTimeSets}>
          <input
            className="mr-[5px]"
            type="checkbox"
            checked={isTimeSets ? true : false}
          />
          <span>Добавить время между походами</span>
        </div>
        {isTimeSets && (
          <div className="flex flex-col gap-[10px] pb-[20px]">
            <p className="text-[20px]">Отдых между подходами:</p>
            <input
              onChange={(e) =>
                setWorkout({ ...workout, setsTime: Number(e.target.value) })
              }
              className="border-[1px] border-[#000000] px-[16px] py-[8px] rounded-[10px]"
              type="number"
              placeholder=""
            />
          </div>
        )}
        <div className="flex flex-col gap-[10px] pb-[10px]">
          <p className="text-[20px]">Повторения:</p>
          <input
            className={
              errReps
                ? "border-[2px] border-[red] px-[16px] py-[8px] rounded-[10px]"
                : "border-[1px] border-[#000000] px-[16px] py-[8px] rounded-[10px]"
            }
            type="number"
            placeholder="Количество повторений"
          />
        </div>
        <div className="pb-[20px]" onClick={handleAddTimeReps}>
          <input
            onChange={(e) =>
              setWorkout({ ...workout, repsTime: Number(e.target.value) })
            }
            className="mr-[5px]"
            type="checkbox"
            checked={isTimeReps ? true : false}
          />
          <span>Добавить время между походами</span>
        </div>
        {isTimeReps && (
          <div className="flex flex-col gap-[10px] pb-[20px]">
            <p className="text-[20px]">Отдых между повторами:</p>
            <input
              className="border-[1px] border-[#000000] px-[16px] py-[8px] rounded-[10px]"
              type="number"
              placeholder="Количество подходов"
            />
          </div>
        )}
        <button
          onClick={handleCreateWorkout}
          className={
            "mt-[20px] text-[18px] w-full rounded-[45px] bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-[#A0B000] active:text-[white] px-[16px] py-[8px] mb-[10px]"
          }
        >
          Создать
        </button>
      </div>
    </>
  );
};
