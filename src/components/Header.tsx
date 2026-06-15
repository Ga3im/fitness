import { useRef, useState } from "react";
import { useOutsideClick } from "../hooks/modalClose";
import { router } from "../pages/router";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setTheme } from "../store/features/settingSlice";

export const Header = () => {
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false);

  const { theme } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const profileMenuRef = useRef(null);
  const profileMenuBtnRef = useRef(null);

  const handleOpenSetting = () => {
    setIsOpenSetting(!isOpenSetting);
  };

  const closeProfileMenu = () => {
    setIsOpenSetting(false);
  };

  const handleCreateWorkout = () => {
    navigate(router.createWorkout);
  };

  const handleOpenFavorite = () => {
    navigate(router.favoriteWorkouts);
  };

  const handleThemeChange = () => {
    theme === "light"
      ? dispatch(setTheme("night"))
      : dispatch(setTheme("light"));
  };

  useOutsideClick(profileMenuRef, profileMenuBtnRef, closeProfileMenu);

  return (
    <>
      <header
        className={
          theme === "night"
            ? "pb-[10px] py-[10px] px-[16px] flex justify-between items-center bg-gradient-to-b bg-[#0f2d37] to-[#0b191e] transition-colors duration-500"
            : "pb-[10px] py-[10px] px-[16px] flex justify-between items-center bg-gradient-to-b bg-[#007386] to-[#ebfdff] transition-colors duration-500"
        }
      >
        <p
        onClick={()=>navigate(router.main)}
          className={
            theme == "night"
              ? "italic font-bold text-[#fff] text-[30px]"
              : "italic font-bold text-[#000] text-[30px]"
          }
        >
          {" "}
          Fitness
        </p>
        <div>
          <div
            ref={profileMenuBtnRef}
            onClick={handleOpenSetting}
            className="flex flex-col relative gap-[5px] place-self-end cursor-pointer"
          >
            <div className="bg-[#4f4f4f] rounded-full w-[20px] h-[3px]"></div>
            <div className="bg-[#4f4f4f] rounded-full w-[20px] h-[3px]"></div>
            <div className="bg-[#4f4f4f] rounded-full w-[20px] h-[3px]"></div>
          </div>
          {isOpenSetting && (
            <div
              ref={profileMenuRef}
              className={
                theme === "night"
                  ? "absolute z-1 top-[30px] py-[10px] px-[20px] mt-[20px] rounded-[10px] bg-[#0f172a] text-[#fff] place-self-end mr-[10px] shadow-[0px_0px_10px_-5px]"
                  : "absolute z-1 top-[30px] py-[10px] px-[20px] mt-[20px] rounded-[10px] bg-[#f4f4f4] place-self-end mr-[10px] shadow-[0px_0px_10px_-5px]"
              }
            >
              <p
                onClick={handleCreateWorkout}
                className="cursor-pointer hover:underline"
              >
                Создать тренировку
              </p>
              <p
                onClick={handleOpenFavorite}
                className="cursor-pointer hover:underline"
              >
                Избранные тренировки
              </p>
              <div className="flex items-center justify-between gap-5 text-center">
                <p>Темная тема</p>
                <input
                  onChange={handleThemeChange}
                  type="checkbox"
                  name="checkbox"
                  checked={theme === "night"}
                  className="
      relative h-[18px] w-[28px] cursor-pointer appearance-none rounded-full bg-[#000] outline-none transition-colors duration-500
      before:absolute before:top-px before:left-px before:h-[15px] before:w-[15px] before:rounded-full before:bg-[#94a6be] before:transition-all before:duration-500
      checked:before:left-3 checked:before:bg-[#565eef] shadow-[0px_0px_5px_0px]
    "
                />
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
