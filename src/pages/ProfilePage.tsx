import { useEffect, useRef, useState } from "react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { router } from "./router";
import type { workoutType } from "../types/types";
import { BottomBtn } from "../components/BottomBtn";
import { useOutsideClick } from "../hooks/modalClose";
import {
  setIsAuth,
  setIsOpenProfile,
  setUser,
} from "../store/features/userSlice";
import { useAppDispatch, useAppSelector } from "../store/features/store";
import { FilterWorkout } from "../components/Workout/FilterWorkout";
import { TabataTimerSettings } from "../components/IntervalWorkout/TabataTimer";
import { Workout } from "../components/Workout/Workout";

export default function Profile() {
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [filteredWorkouts, setFilteredWorkouts] = useState<workoutType[] | []>(
    []
  );
  const profileMenuRef = useRef(null);
  const profileMenuBtnRef = useRef(null);
  const dispatch = useAppDispatch();
  const { user, isAuth, isFavoriteTabata } = useAppSelector(
    (state) => state.userSlice
  );

  useEffect(() => {
    const arr: workoutType[] = [];
    isAuth && user
      ? user.myWorkouts.map((i: workoutType) => {
          if (i.nameRU.toLowerCase().includes(search.toLowerCase())) {
            arr.push(i);
          }
        })
      : "";
    setFilteredWorkouts(arr);
  }, [search]);

  useEffect(() => {
    dispatch(setIsOpenProfile(true));
  }, []);

  const navigate = useNavigate();

  const handleOpenSetting = () => {
    setIsOpenSetting(!isOpenSetting);
  };

  let previewUrl: string;

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files instanceof FileList) {
      const file = e.target.files[0];
      if (file) {
        previewUrl = URL.createObjectURL(file);
        if (user) {
          dispatch(setUser({ ...user, img: previewUrl }));
        }
      }
    }
    setIsOpenSetting(false);
  };

  const deleteProfilePhoto = () => {
    setIsOpenSetting(false);
    if (user) {
      dispatch(setUser({ ...user, img: "" }));
    }
  };

  const handleCreateWorkout = () => {
    navigate(router.createWorkout);
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    navigate(router.main);
    dispatch(setIsOpenProfile(false));
    dispatch(setIsAuth(false));
  };

  const handleToTopBtn = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const closeProfileMenu = () => {
    setIsOpenSetting(false);
  };

  useOutsideClick(profileMenuRef, profileMenuBtnRef, closeProfileMenu);

  return (
    <>
      <Header />
      {isAuth && user ? (
        <div className="px-[16px] pb-[24px]">
          <p className="text-[20px] font-medium pb-[24px]">Профиль</p>
          <div className="relative md:flex md:gap-[33px] md:items-center shadow-[0px_0px_10px_-7px] p-[30px] rounded-[30px]">
            <div>
              <div
                ref={profileMenuBtnRef}
                onClick={handleOpenSetting}
                className="flex flex-col relative md:top-[40px] md:right-[20px] gap-[5px] place-self-end cursor-pointer"
              >
                <div className="bg-[#4f4f4f] rounded-full w-[3px] h-[3px]"></div>
                <div className="bg-[#4f4f4f] rounded-full w-[3px] h-[3px]"></div>
                <div className="bg-[#4f4f4f] rounded-full w-[3px] h-[3px]"></div>
              </div>
              {isOpenSetting && (
                <div
                  ref={profileMenuRef}
                  className="absolute py-[5px] px-[10px] top-[50px] md:top-[95px] mt-[10px] rounded-[10px] bg-[#f4f4f4] place-self-end mr-[10px] shadow-[0px_0px_10px_-5px]"
                >
                  <label
                    className="cursor-pointer hover:underline"
                    htmlFor="profilePhoto"
                  >
                    Изменить фото
                  </label>
                  <input
                    onChange={(e) => fileChange(e)}
                    id="profilePhoto"
                    type="file"
                    className="hidden"
                  />
                  <p
                    onClick={deleteProfilePhoto}
                    className="cursor-pointer hover:underline"
                  >
                    Удалить фото
                  </p>
                </div>
              )}
              {user.img === "" ? (
                <svg
                  className="flex place-self-center w-[100px] md:w-[200px] h-[141px] md:h-[200px]"
                  viewBox="0 0 140 140"
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
              ) : (
                <img src={user.img} alt="" />
              )}
            </div>
            <div>
              <div className="pt-[20px] pb-[10px]">
                <span>Имя:</span>
                <span> {user.name}</span>
              </div>
              <div className="pb-[20px]">
                <span>Логин:</span>
                <span> {user.login}</span>
              </div>

              <button
                onClick={handleCreateWorkout}
                className="mb-[10px] px-[10px] py-[5px] w-full flex justify-center rounded-[46px] text-center cursor-pointer bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-[#A0B000]"
              >
                Создать тренировку
              </button>
              <button
                onClick={handleLogout}
                className="py-[5px] w-full flex justify-center rounded-[46px] border-1 text-center cursor-pointer hover:bg-[#f7f7f7] active:bg-[#f7f7f7] "
              >
                Выйти
              </button>
            </div>
          </div>

          <div>
            <h1 className="pb-[10px] text-[20px] font-medium pt-[15px]">
              Избранные
            </h1>
            {user.myWorkouts.length !== 0 && (
              <FilterWorkout
                search={search}
                setSearch={setSearch}
                array={user.myWorkouts}
                setFilteredArray={setFilteredWorkouts}
              />
            )}
            <div className="pt-[20px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4">
              {isFavoriteTabata && <TabataTimerSettings />}
              {search === ""
                ? user.myWorkouts.map((workout: workoutType) => (
                    <Workout workout={workout} />
                  ))
                : filteredWorkouts.map((workout: workoutType) => (
                    <Workout workout={workout} />
                  ))}
            </div>
          </div>
          <BottomBtn onClick={handleToTopBtn} btnText={<p>Наверх &#8593;</p>} />
        </div>
      ) : null}
    </>
  );
}
