import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { router } from "./router";
import { useContext } from "react";
import { SetContext } from "../context/context";

type exercisesType = {
  name: string;
  quantity: number;
};

export const Workout = () => {
  const { selectedWorkout } = useContext(SetContext);
  const navigate = useNavigate();

  const handleBackBtn = () => {
    navigate(router.main);
    localStorage.removeItem("selectedCourse");
    localStorage.removeItem("selectedWorkout");
  };

  let selectedCourse;
  let savedSelectedCourse = localStorage.getItem("selectedCourse");
  if (savedSelectedCourse) {
    selectedCourse = JSON.parse(savedSelectedCourse);
  }

  const handleFillProgress = () => {
    navigate(router.workoutFilling);
  };

  return (
    <>
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
            {selectedWorkout?.exercises?.map((exercises: exercisesType) => (
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
