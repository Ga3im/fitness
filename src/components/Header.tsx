import { useRef, useState } from "react";
import { useOutsideClick } from "../hooks/modalClose";
import { Logo } from "./Logo";
import { router } from "../pages/router";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false);

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

  useOutsideClick(profileMenuRef, profileMenuBtnRef, closeProfileMenu);

  return (
    <>
      <header className="mb-[10px] py-[10px] px-[16px] flex justify-between items-center bg-gradient-to-b bg-[#007386] to-[#ebfdff]">
        <Logo />
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
              className="absolute top-[30px] py-[10px] px-[20px] mt-[20px] rounded-[10px] bg-[#f4f4f4] place-self-end mr-[10px] shadow-[0px_0px_10px_-5px]"
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
            </div>
          )}
        </div>
      </header>
    </>
  );
};
