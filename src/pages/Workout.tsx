import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { router } from "./router";
import { useState } from "react";
import { SelectWorkout } from "../components/SelectWorkout";
import type { workoutType } from "../context/context";
import { Progress } from "../components/Progress";

export const Workout = () => {
  const [isSelectedWorkout, setIsSelectedWorkout] = useState<boolean>(true);
  const [isFillProgress, setIsFillProgress] = useState<boolean>(false);
  const [selectedWorkout, setSelectedWorkout] = useState<workoutType | null>(
    null
  );

  console.log(selectedWorkout);

  const navigate = useNavigate();
  const handleBackBtn = () => {
    navigate(router.main);
    localStorage.removeItem("selectedCourse");
  };

  let selectedCourse;
  let savedSelectedCourse = localStorage.getItem("selectedCourse");
  if (savedSelectedCourse) {
    selectedCourse = JSON.parse(savedSelectedCourse);
  }

  const handleFillProgress = () => {
    setIsFillProgress(true);
  };

  return (
    <>
      {isSelectedWorkout && (
        <SelectWorkout
          setIsSelectedWorkout={setIsSelectedWorkout}
          selectedWorkout={selectedWorkout}
          setSelectedWorkout={setSelectedWorkout}
        />
      )}
      {isFillProgress && (
        <Progress
          setIsFillProgress={setIsFillProgress}
          selectedWorkout={selectedWorkout}
          setSelectedWorkout={setSelectedWorkout}
        />
      )}

      <div className="px-[16px]">
        <Header />
        <div
          onClick={handleBackBtn}
          className="text-[24px] opacity-[0.7] pb-[10px] hover:underline cursor-pointer"
        >
          &laquo; Назад
        </div>
        <div>
          <h1 className="text-[32px] font-medium">{selectedCourse.nameRU}</h1>
          <iframe
            className="rounded-[10px] mt-[24px] bg-[red] w-full h-[200px]"
            src={selectedCourse.video}
            title=""
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="shadow-[0px_0px_10px_-5px] p-[30px] mt-[24px] rounded-[30px]">
          <p className="text-[32px] pb-[20px]">{selectedWorkout?.name}</p>
          <div>
            {selectedWorkout?.exercises?.map((exercises) => (
              <div key={exercises.name} className="text-[18px] pb-[24px]">
                <p>{exercises.name}</p>
                <progress
                  className="w-full pt-[10px] [&::-webkit-progress-bar]:rounded-[50px] [&::-webkit-progress-bar]:h-[6px] [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:bg-[#00C1FF] [&::-webkit-progress-value]:rounded-[50px] "
                  value={50}
                  max={100}
                ></progress>{" "}
              </div>
            ))}
          </div>
          <button
            onClick={handleFillProgress}
            className="mt-[16px] text-[18px] rounded-[45px] bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-[#000000] active:text-[white] w-full py-[16px] mb-[10px]"
          >
            Заполнить свой прогресс
          </button>
        </div>
      </div>
    </>
  );
};
