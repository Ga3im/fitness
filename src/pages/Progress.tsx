import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SetContext } from "../context/context";

export const Progress = () => {
  const navigate = useNavigate();
  const { selectedCourse } = useContext(SetContext);

  const handleBackBtn = () => {
    navigate(`/workout/${selectedCourse._id}`);
  };

  const handleSaveBtn = () => {
    navigate(`/workout/${selectedCourse._id}`);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center z-1 bg-[rgb(0,0,0,0.2)] absolute">
      <div className="fixed rounded-[30px] bg-white mx-[20px]">
        <div
          onClick={handleBackBtn}
          className="place-self-end pr-[20px] pt-[10px] hover:cursor-pointer"
        >
          x
        </div>
        <div className="pl-[40px] pr-[40px] pb-[40px]">
          <h1 className="text-[32px] pb-[34px] pr-[30px]">Мой прогресс</h1>
          <div className="text-[16px]">
            {selectedWorkout?.exercises?.map((exercises) => (
              <div className="pb-[20px]">
                <p>
                  <span>Сколько раз сделали </span>
                  {exercises.name}
                </p>
                <input
                  className="mt-[10px] w-full py-[16px] px-[18px] text-[14px] rounded-[8px] border-[#D0CECE] border-[1px]"
                  type="number"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSaveBtn}
            className="flex justify-center place-self-center w-full mr-[30px] mt-[34px] text-[18px] rounded-[45px] bg-[#BCEC30] px-[16px] py-[16px] mb-[10px]"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};
