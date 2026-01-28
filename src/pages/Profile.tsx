import { useContext, useEffect, useState } from "react";
import { SetContext } from "../context/context";
import { sortArray } from "./Main";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { router } from "./router";
import { Filter } from "../components/Filter";
import type { workoutType } from "../types/types";
import { Workout } from "../components/Workout";

export default function Profile() {
  const {
    user,
    setUser,
    setIsOpenProfile,
    isAuth,
    setIsAuth,
  } = useContext(SetContext);
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [filteredMyCourses, setFilteredMyCourses] = useState<
    workoutType[] | []
  >([]);

  useEffect(() => {
    if (isAuth) {
      let userArray = user.myWorkouts.sort(sortArray);
      console.log(userArray);
    }
  }, []);

  useEffect(() => {
    const arr: workoutType[] = [];
    isAuth
      ? user.myWorkouts.map((i: workoutType) => {
          if (i.nameRU.toLowerCase().includes(search.toLowerCase())) {
            arr.push(i);
          }
        })
      : "";
    setFilteredMyCourses(arr);
  }, [search]);

  useEffect(() => {
    setIsOpenProfile(true);
  }, []);

  const navigate = useNavigate();

  const handleOpenSetting = () => {
    setIsOpenSetting(!isOpenSetting);
  };

  const handleCreateWorkout = () => {
    navigate(router.createWorkout);
  };

  const handleLogout = () => {
    setUser(null);
    navigate(router.main);
    setIsOpenProfile(false);
    setIsAuth(false);
    localStorage.removeItem("user");
  };

  return (
    <>
      <Header />
      <div className="px-[16px] pb-[24px]">
        <p className="text-[24px] font-medium pb-[24px]">Профиль</p>
        <div className="relative md:flex md:gap-[33px] md:items-center shadow-[0px_0px_10px_-7px] p-[30px] rounded-[30px]">
          <div
            onClick={handleOpenSetting}
            className="flex flex-col gap-[5px] place-self-end cursor-pointer"
          >
            <div className="bg-[#4f4f4f] rounded-full w-[5px] h-[5px]"></div>
            <div className="bg-[#4f4f4f] rounded-full w-[5px] h-[5px]"></div>
            <div className="bg-[#4f4f4f] rounded-full w-[5px] h-[5px]"></div>
          </div>
          {isOpenSetting && (
            <div className="absolute top-[55px] w-[200px] h-[100px] mt-[10px] rounded-[10px] bg-[#f4f4f4] place-self-end mr-[10px] shadow-[0px_0px_10px_-5px]"></div>
          )}
          <svg
            className="flex place-self-center mb-[30px] w-[141px] md:w-[200px] h-[141px] md:h-[200px]"
            viewBox="0 0 141 141"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_48_3757"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="141"
              height="141"
            >
              <path
                d="M0 20C0 8.95431 8.95431 0 20 0L121 0C132.046 0 141 8.95431 141 20V121C141 132.046 132.046 141 121 141H20C8.95431 141 0 132.046 0 121L0 20Z"
                fill="#D9D9D9"
              />
            </mask>
            <g mask="url(#mask0_48_3757)">
              <path
                d="M0 20C0 8.95431 8.95431 0 20 0L121 0C132.046 0 141 8.95431 141 20V121C141 132.046 132.046 141 121 141H20C8.95431 141 0 132.046 0 121L0 20Z"
                fill="#D9D9D9"
              />
              <path
                d="M70.5 89.5352C36.0394 89.5352 6.60036 111.035 -5.13525 141.353H146.135C134.4 111.035 104.961 89.5352 70.5 89.5352Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M70.1475 72.1113C84.4565 72.1113 96.0563 60.5453 96.0563 46.278C96.0563 32.0107 84.4565 20.4448 70.1475 20.4448C55.8385 20.4448 44.2388 32.0107 44.2388 46.278C44.2388 60.5453 55.8385 72.1113 70.1475 72.1113Z"
                fill="white"
              />
            </g>
          </svg>
          <div>
            <div className="pt-[30px] pb-[20px]">
              <span>Имя:</span>
              <span> {user ? user.name : ""}</span>
            </div>
            <div className="pb-[20px]">
              <span>Логин:</span>
              <span> {user ? user.login : ""}</span>
            </div>

            <button
              onClick={handleCreateWorkout}
              className="mb-[20px] py-[16px] w-full flex justify-center rounded-[46px] text-center cursor-pointer bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-[#A0B000]"
            >
              Создать тренировку
            </button>
            <button
              onClick={handleLogout}
              className="py-[16px] w-full flex justify-center rounded-[46px] border-1 text-center cursor-pointer hover:bg-[#f7f7f7] active:bg-[#f7f7f7] "
            >
              Выйти
            </button>
          </div>
        </div>


        <div>
          <h1 className="pb-[25px] text-[24px] font-medium pt-[24px]">
            Избранные
          </h1>
          <Filter
            search={search}
            setSearch={setSearch}
            array={isAuth ? user.myWorkouts : ""}
            setFilteredArray={setFilteredMyCourses}
          />
          <div className="pt-[20px] flex flex-wrap justify-center gap-[24px] md:justify-start">
            {isAuth
              ? search === ""
                ? user.myWorkouts.map((i: workoutType) => <Workout i={i} />)
                : filteredMyCourses.map((i: workoutType) => <Workout i={i} />)
              : null}
          </div>
        </div>
        <button className="mt-[24px] flex place-self-end md:place-self-center text-[18px] rounded-[45px] bg-[#BCEC30] px-[16px] py-[8px] mb-[30px] ">
          Наверх &#8593;
        </button>
      </div>
    </>
  );
}
