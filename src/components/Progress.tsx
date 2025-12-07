import type { Dispatch, SetStateAction } from "react";
import type { workoutType } from "../context/context";

type progressType = {
  setIsFillProgress: Dispatch<SetStateAction<boolean>>;
  selectedWorkout: workoutType | null;
  setSelectedWorkout: Dispatch<SetStateAction<workoutType | null>>;
};

export const Progress = ({
  setIsFillProgress,
  selectedWorkout,
  setSelectedWorkout,
}: progressType) => {
  const handleBackBtn = () => {
    setIsFillProgress(false);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center z-1 bg-[rgb(0,0,0,0.2)] absolute">
      <div className="fixed rounded-[30px] bg-white">
        <div
          onClick={handleBackBtn}
          className="place-self-end pr-[20px] pt-[10px] hover:cursor-pointer"
        >
          x
        </div>
        <div className="pl-[40px] pr-[10px] pb-[40px]">
          <h1 className="text-[32px] pb-[34px] pr-[30px]">Мой прогресс</h1>
        </div>
      </div>
    </div>
  );
};
