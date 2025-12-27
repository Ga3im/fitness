import { useContext, useEffect, useState } from "react";
import { SetContext, type userType } from "../context/context";
import { result } from "../data";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { router } from "./router";

export default function Course() {
  let { isAuth, selectedCourse, changeUser } = useContext(SetContext);
  const [isIncludesCourse, setIsIncludesCourse] = useState<boolean>(false);

  const navigate = useNavigate();

  let userInfo: userType;

  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    userInfo = JSON.parse(savedUser);
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  if (selectedCourse === null) {
    let savedSelectedCourse = localStorage.getItem("selectedCourse");
    if (savedSelectedCourse) {
      selectedCourse = JSON.parse(savedSelectedCourse);
    }
  }

  useEffect(() => {
    if (isAuth) {
      if (userInfo.myCourses) {
        userInfo.myCourses.map((i) => {
          if (i._id === selectedCourse._id) {
            setIsIncludesCourse(true);
          }
        });
      }
    }
  }, []);

  const handleBackBtn = () => {
    navigate(router.main);
    localStorage.removeItem("selectedCourse");
  };

  const handleAddCourse = () => {
    if (isAuth) {
      if (!isIncludesCourse) {
        setIsIncludesCourse(true);
        userInfo.myCourses = [...userInfo.myCourses, selectedCourse];
        changeUser(userInfo);
      } else {
        navigate(router.selectWorkout);
      }
    } else {
      navigate(router.login);
    }
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
        <img
          className="rounded-[30px] flex place-self-center mb-[40px]"
          src={selectedCourse.img}
          alt={selectedCourse.nameEN}
        />
        <div>
          <h1 className="text-[24px] font-medium pb-[24px]">
            Подойдет для вас, если:
          </h1>
          <div className="flex flex-wrap md:flex-nowrap gap-[17px] mb-[40px]">
            {selectedCourse.fitting.map((i: string[], index: number) => (
              <div
                key={index}
                className="w-full py-[20px] flex items-center px-[20px] gap-[25px] bg-linear-65 from-[#151720] to-[#1E212E] rounded-[28px]"
              >
                <p className="text-[#BCEC30] text-[75px]">{index + 1}</p>
                <p className="text-white text-[18px]">{i}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[24px] font-medium pb-[24px]">Направления</p>
          <div className="bg-[#BCEC30] rounded-[28px] p-[30px] flex flex-col flex-wrap gap-[30px]">
            {selectedCourse.directions.map((i: string[], index: number) => (
              <div
                className="flex gap-[12px] items-center text-[18px]"
                key={index}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.21373 1.11751C9.3702 0.454433 9.44843 0.122896 9.57424 0.0482295C9.68259 -0.0160765 9.81741 -0.0160765 9.92576 0.0482295C10.0516 0.122896 10.1298 0.454434 10.2863 1.11751L11.0497 4.35302C11.3337 5.55636 11.4757 6.15803 11.7843 6.64596C12.0571 7.07744 12.4226 7.44285 12.854 7.71574C13.342 8.02432 13.9436 8.1663 15.147 8.45025L18.3825 9.21373C19.0456 9.3702 19.3771 9.44843 19.4518 9.57424C19.5161 9.68259 19.5161 9.81741 19.4518 9.92576C19.3771 10.0516 19.0456 10.1298 18.3825 10.2863L15.147 11.0497C13.9436 11.3337 13.342 11.4757 12.854 11.7843C12.4226 12.0571 12.0571 12.4226 11.7843 12.854C11.4757 13.342 11.3337 13.9436 11.0497 15.147L10.2863 18.3825C10.1298 19.0456 10.0516 19.3771 9.92576 19.4518C9.81741 19.5161 9.68259 19.5161 9.57424 19.4518C9.44843 19.3771 9.3702 19.0456 9.21373 18.3825L8.45025 15.147C8.1663 13.9436 8.02432 13.342 7.71574 12.854C7.44285 12.4226 7.07744 12.0571 6.64596 11.7843C6.15803 11.4757 5.55636 11.3337 4.35301 11.0497L1.11751 10.2863C0.454433 10.1298 0.122896 10.0516 0.0482295 9.92576C-0.0160765 9.81741 -0.0160765 9.68259 0.0482295 9.57424C0.122896 9.44843 0.454434 9.3702 1.11751 9.21373L4.35302 8.45025C5.55636 8.1663 6.15803 8.02432 6.64596 7.71574C7.07744 7.44285 7.44285 7.07744 7.71574 6.64596C8.02432 6.15803 8.1663 5.55636 8.45025 4.35301L9.21373 1.11751Z"
                    fill="black"
                  />
                </svg>
                <p>{i}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[156px]">
          <svg
            className="relative left-[125px] bottom-[25px]"
            width="37"
            height="32"
            viewBox="0 0 37 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.82898 30.1059C4.75847 24.639 13.8914 11.5185 34.9871 2.77148"
              stroke="black"
              strokeWidth="6"
            />
          </svg>
          <svg
            className="relative w-full bottom-[75px] right-[25px]"
            width="629"
            height="424"
            viewBox="0 0 629 424"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M499.782 388.795C943.782 -230.705 47.9024 39.5475 24.1395 237.96C18.5256 284.834 82.2022 298.666 177.705 277.697C273.208 256.727 -131.258 411.114 54.5178 439.481"
              stroke="#C6FF00"
              strokeWidth="10.1395"
            />
          </svg>
          <img
            className="relative bottom-[550px] left-[50px]"
            src={"/green-boy.png"}
            alt="green-boy"
          />
        </div>

        <div className="relative p-[30px] mb-[30px] bg-white rounded-[30px] w-full shadow-[0px_0px_10px_-7px]">
          <h1 className="text-[32px] leading-none pb-[28px]">
            Начните путь к новому телу
          </h1>
          <div className="flex gap-[10px] flex-col">
            {result.map((i, index) => (
              <li className="ml-[30px] opacity-[0.7]" key={index}>
                {i}
              </li>
            ))}
            <button
              onClick={handleAddCourse}
              className="mt-[28px] text-[16px] w-full rounded-[45px] bg-[#BCEC30] px-[16px] py-[8px] hover:bg-[#C6FF00] hover:cursor-pointer"
            >
              {isAuth
                ? isIncludesCourse
                  ? "Перейти к тренировке"
                  : "Добавить курс"
                : "Войдите, чтобы добавить курс"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
