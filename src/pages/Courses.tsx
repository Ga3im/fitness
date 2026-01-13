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
        <h1 className="text-[32px] pl-[25px] pb-[20px] font-600">
          {selectedCourse.nameRU}
        </h1>
        <img
          className="rounded-[30px] flex place-self-center mb-[40px]"
          src={selectedCourse.img}
          alt={selectedCourse.nameEN}
        />

        <div className="relative p-[30px] mb-[30px] bg-white rounded-[30px] w-full shadow-[0px_0px_10px_-7px]">
          <p className="text-justify"><span className="text-[18px] font-[600]">{selectedCourse.nameRU} </span>{selectedCourse.description}</p>
          <div className="flex gap-[10px] flex-col">
            <button
              onClick={handleAddCourse}
              className="mt-[28px] text-[16px] w-full rounded-[45px] bg-[#BCEC30] px-[16px] py-[8px] hover:bg-[#C6FF00] hover:cursor-pointer"
            >
              {isAuth
                ? isIncludesCourse
                  ? "Начать тренировку"
                  : "Добавить в избранное"
                : "Войдите, чтобы добавить в избранное"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
