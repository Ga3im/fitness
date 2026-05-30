import { useEffect, useRef, useState } from "react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Confirm } from "../components/Confirm";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  setEditWorkout,
  setRestTimeSets,
  setTickTime,
} from "../store/features/workoutSlice";
import { DoneWorkout } from "../components/Workout/DoneWorkout";
import { useWakeLock } from "../hooks/useWakeLock";
import { useWorkout } from "../hooks/Workout/useWorkout";
import { EnteringWeight } from "../components/Workout/EnteringWeight";
import { ExerciseProccess } from "../components/Workout/ExerciseProccess";
import { LikeIcon } from "../components/icons/LikeIcon";
import { FillLikeIcon } from "../components/icons/FillLikeIcon";
import { EdittingWorkout } from "../components/Workout/EdittingWorkout";
import type { workoutType } from "../types/types";
import { Button } from "../components/Button";

export default function WorkoutPage() {
  const { startedWorkout, currentWorkout, isEnteringWeight, favoriteWorkouts } =
    useAppSelector((state) => state.workoutSlice);
  const dispatch = useAppDispatch();

  const editBtnRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editingWorkout, setEditingWorkout] = useState<workoutType | null>(
    null
  );

  const { releaseWakeLock } = useWakeLock();

  const displayWorkout =
    startedWorkout === null ? currentWorkout : startedWorkout;

  const {
    setIsConfirm,
    isConfirm,
    breakWorkout,
    userWeight,
    doneWorkout,
    addFavoriteWorkout,
  } = useWorkout(displayWorkout);

  useEffect(() => {
    let mainInterval: ReturnType<typeof setInterval> | null = null;
    let restInterval: ReturnType<typeof setInterval> | null = null;

    if (startedWorkout && !doneWorkout) {
      mainInterval = setInterval(() => {
        dispatch(setTickTime());
      }, 1000);
      restInterval = setInterval(() => {
        dispatch(setRestTimeSets());
      }, 1000);
    }

    return () => {
      if (mainInterval) clearInterval(mainInterval);
      if (restInterval) clearInterval(restInterval);
    };
  }, [startedWorkout, dispatch]);

  useEffect(() => {
    if (!editingWorkout) return;
    const debounce = setTimeout(() => {
      dispatch(setEditWorkout(editingWorkout));
    }, 500);

    return () => clearTimeout(debounce);
  }, [editingWorkout, dispatch]);

  const backBtn = () => {
    if (startedWorkout) {
      setIsConfirm(true);
    } else {
      releaseWakeLock();
      navigate(-1);
    }
  };

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files instanceof FileList) {
      const file = e.target.files[0];
      if (file) {
        previewUrl = URL.createObjectURL(file);
        if (!editingWorkout) return;
        setEditingWorkout({ ...editingWorkout, img: previewUrl });
      }
    }
  };

  const handleDeletePhoto = () => {
    if (!editingWorkout) return;
    setEditingWorkout({ ...editingWorkout, img: "/img/custom.jpg" });
  };

  const editWorkoutBtn = () => {
    setIsEdit(!isEdit);
    dispatch(setEditWorkout(displayWorkout));
    setEditingWorkout(displayWorkout);
  };

  const isFavorite = favoriteWorkouts?.some((w) => w.id === displayWorkout?.id);
  let previewUrl;

  return (
    <>
      {isEnteringWeight && <EnteringWeight displayWorkout={displayWorkout} />}
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
            <div className="max-w-[300px] w-full">
              { displayWorkout ? (
                isFavorite ? (
                  <button
                    className="flex relative place-self-end right-[10px]"
                    onClick={(e) => addFavoriteWorkout(e)}
                  >
                    <FillLikeIcon />
                  </button>
                ) : (
                  <button
                    className="flex relative place-self-end right-[10px]"
                    onClick={(e) => addFavoriteWorkout(e)}
                  >
                    <LikeIcon />
                  </button>
                )
              ) : null}
              <div className="relative place-self-center w-[150px]">
                <img
                  className="rounded-[30px] flex place-self-center"
                  src={
                    isEdit && editingWorkout?.img !== "/img/custom.jpg"
                      ? editingWorkout?.img
                      : displayWorkout?.img
                  }
                  alt={displayWorkout?.nameEN}
                />
                {isEdit && editingWorkout?.custom && (
                  <div className="text-center mt-[10px] text-[14px] w-full rounded-[45px] bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-[#A0B000] active:text-[white] px-[16px] py-[5px] mb-[10px]">
                    <label htmlFor="mainWorkoutPhoto">
                      {previewUrl ? "Обновить фото" : "Изменить фото"}
                    </label>
                    <input
                      onChange={(e) => fileChange(e)}
                      id="mainWorkoutPhoto"
                      type="file"
                      className="hidden"
                    />
                  </div>
                )}
                {isEdit && editingWorkout?.img !== "/img/custom.jpg" && (
                  <Button onClick={handleDeletePhoto} color="bg-[#BCEC30]">
                    Удалить фото
                  </Button>
                )}
              </div>
            </div>

            {displayWorkout?.description && (
              <div className="w-full p-[20px]">
                <p className="text-[18px] pl-[10px] place-self-start">
                  Описание:
                </p>
                {isEdit ? (
                  <textarea
                    onChange={(e) => {
                      if (!editingWorkout) return;
                      setEditingWorkout({
                        ...editingWorkout,
                        description: e.target.value,
                      });
                    }}
                    className="h-[180px] resize-none appearance-none border-0 bg-transparent outline-none ring-0 w-full p-[20px] mb-[10px] bg-white rounded-[30px] shadow-[0px_0px_10px_-7px]"
                    name=""
                    defaultValue={displayWorkout.description}
                    id=""
                  ></textarea>
                ) : (
                  <div className="relative p-[20px] mb-[10px] bg-white rounded-[30px] w-full shadow-[0px_0px_10px_-7px]">
                    <p className="text-justify">
                      <span className="text-[18px] font-[600]"></span>
                      {displayWorkout.description}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-between ">
            <div>
              <p className="text-[18px] pl-[10px]">Упражнения:</p>
              <p className="pl-[10px]">Режим: {displayWorkout?.mode}</p>
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
          {isEdit ? (
            <EdittingWorkout
              setIsEdit={setIsEdit}
              editingWorkout={editingWorkout}
              setEditingWorkout={setEditingWorkout}
            />
          ) : (
            <>
              <ExerciseProccess displayWorkout={displayWorkout} />
              <DoneWorkout
                displayWorkout={displayWorkout}
                userWeight={userWeight}
                setIsConfirm={setIsConfirm}
              />
            </>
          )}
        </div>
      }
    </>
  );
}
