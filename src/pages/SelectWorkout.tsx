import { useContext } from "react";
import { SetContext, type workoutType } from "../context/context";
import { useNavigate } from "react-router-dom";
import { router } from "./router";

export const SelectWorkout = () => {
  const {
    workout,
    selectedCourse,
    selectedWorkout,
    changeSelectedWorkout,
  } = useContext(SetContext);
  const navigate = useNavigate();

  const handleCheckboxClick = (workout: workoutType) => {
    changeSelectedWorkout(workout);
  };

  const handleBackBtn = () => {
    navigate(router.main);
  };
  const handleStartWorkout = () => {
    navigate(`/workout/${selectedCourse._id}`);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center z-1 bg-[rgb(0,0,0,0.2)] absolute">
      <div className="fixed rounded-[30px] mx-[16px] pb-[40px] pl-[40px] pt-[10px] pr-[10px] bg-white">
        <div
          onClick={handleBackBtn}
          className="place-self-end pr-[10px] hover:cursor-pointer"
        >
          x
        </div>
        <h1 className="text-[32px] pb-[34px] pr-[30px]">Выберите тренировку</h1>
        <div className="max-h-[250px] overflow-y-scroll pr-[20px] mr-[30px] scrollbar-thin [&::-webkit-scrollbar-track]:bg-[#F7F7F7] [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-black">
          {selectedCourse.workouts.map((i: string) =>
            workout.map((item: workoutType) => {
              if (item._id === i) {
                return (
                  <div
                    onClick={() => handleCheckboxClick(item)}
                    key={item._id}
                    className="py-[10px] flex gap-[12px] items-center border-b-[#C4C4C4] border-b-[1px]"
                  >
                    <input
                      className="cursor-pointer absolute opacity-0"
                      id="checkbox"
                      type="checkbox"
                    />
                    {selectedWorkout === item ? (
                      <svg
                        className="min-w-[20px] cursor-pointer"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM9.91339 14.1459L15.4134 7.64594L13.8866 6.35406L9.1373 11.9669L6.40258 8.8415L4.89742 10.1585L8.39742 14.1585C8.58922 14.3777 8.86704 14.5024 9.15829 14.5C9.44953 14.4976 9.72525 14.3683 9.91339 14.1459Z"
                          fill="#BCEC30"
                        />
                      </svg>
                    ) : (
                      <div className="cursor-pointer min-w-[20px] h-[20px] rounded-[50%] border-[2px]"></div>
                    )}

                    <p>{item.name}</p>
                  </div>
                );
              }
            })
          )}
        </div>
        <button
          onClick={handleStartWorkout}
          className="flex justify-center place-self-center w-full mr-[30px] mt-[34px] text-[18px] rounded-[45px] bg-[#BCEC30] px-[16px] py-[16px] mb-[10px]"
        >
          Начать
        </button>
      </div>
    </div>
  );
};
