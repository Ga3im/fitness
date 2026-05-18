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
import { WorkoutCard } from "../components/Workout/WorkoutCard";
import { ProfilePhoto } from "../components/icons/ProfilePhoto";

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
                <ProfilePhoto />
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
                    <WorkoutCard workout={workout} />
                  ))
                : filteredWorkouts.map((workout: workoutType) => (
                    <WorkoutCard workout={workout} />
                  ))}
            </div>
          </div>
          <BottomBtn onClick={handleToTopBtn} btnText={<p>Наверх &#8593;</p>} />
        </div>
      ) : null}
    </>
  );
}
