import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { router } from "./router";
import { workouts } from "../data";
import { useState } from "react";

export const CreateWorkout = () => {
  const [isTimeReps, setIsTimeReps] = useState(false);
  const [isTimeSets, setIsTimeSets] = useState(false);
  const navigate = useNavigate();

  const handleBackBtn = () => {
    navigate(router.profile);
  };

  const handleAddTimeSets = () => {
    setIsTimeSets(!isTimeSets);
  };

  const handleAddTimeReps = () => {
    setIsTimeReps(!isTimeReps);
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
            className="border-[1px] border-[#000000] px-[16px] py-[8px] rounded-[10px]"
            type="text"
            placeholder="Введите назвавние тренировки"
          />
        </div>
        <div className="flex flex-col gap-[10px] pb-[10px]">
          <p className="text-[20px]">Подходы:</p>
          <input
            className="border-[1px] border-[#000000] px-[16px] py-[8px] rounded-[10px]"
            type="text"
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
              className="border-[1px] border-[#000000] px-[16px] py-[8px] rounded-[10px]"
              type="text"
              placeholder=""
            />
          </div>
        )}
        <div className="flex flex-col gap-[10px] pb-[10px]">
          <p className="text-[20px]">Повторения:</p>
          <input
            className="border-[1px] border-[#000000] px-[16px] py-[8px] rounded-[10px]"
            type="text"
            placeholder="Количество повторений"
          />
        </div>
        <div className="pb-[20px]" onClick={handleAddTimeReps}>
          <input
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
              type="text"
              placeholder="Количество подходов"
            />
          </div>
        )}
        {/* <div className="flex gap-[24px] flex-wrap justify-center">
          {workouts.map((i) => (
            <div
              className="rounded-[30px] px-[16px] t-[] pb-[15px] shadow-[0px_0px_10px_-7px] hover:cursor-pointer"
              key={i.id}
            >
              <div className="max-w-[343px] place-self-center">
                <img
                  className={
                    "w-[330px] rounded-[30px] mt-[50px] mb-[25px] place-self-center"
                  }
                  src={i.img}
                  alt={i.name}
                />
              </div>

              <div className="px-[20px]">
                <p className="text-[24px] pb-[20px] font-medium">{i.name}</p>
                <div className="flex flex-wrap gap-[6px]"></div>
              </div>
            </div>
          ))}
          <div></div>
        </div> */}
        <button
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
