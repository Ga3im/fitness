import { useContext } from "react";
import { SetContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { router } from "../pages/router";
import { Logo } from "./Logo";

export const Header = () => {
  const { isOpenProfile, setIsOpenProfile, isAuth } = useContext(SetContext);

  let navigate = useNavigate();

  const handleToLogin = () => {
    navigate(router.login);
  };

  const handleOpenProfile = () => {
    setIsOpenProfile(!isOpenProfile);
    if (!isOpenProfile) {
      navigate(router.profile);
    } else {
      navigate(router.main);
    }
  };

  return (
    <>
      <header className="mb-[20px] py-[40px] px-[16px] flex justify-between items-center bg-gradient-to-b bg-[#007386] to-[#ebfdff]">
        <Logo />
        {isAuth ? (
          <div
            onClick={handleOpenProfile}
            className="flex gap-[13px] items-center"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15ZM24 20.3571C24 22.8424 19.9706 25.5 15 25.5C10.0294 25.5 6 22.8424 6 20.3571C6 17.8719 10.0294 16.5 15 16.5C19.9706 16.5 24 17.8719 24 20.3571ZM15 13.5C17.4853 13.5 19.5 11.4853 19.5 9C19.5 6.51472 17.4853 4.5 15 4.5C12.5147 4.5 10.5 6.51472 10.5 9C10.5 11.4853 12.5147 13.5 15 13.5Z"
                fill="#D9D9D9"
              />
            </svg>
            {isOpenProfile ? (
              <div className="w-[8px] h-[8px] relative bottom-[-2px] border-b-2 border-l-2 rotate-[135deg]"></div>
            ) : (
              <div className="w-[8px] h-[8px] relative bottom-[2px] border-b-2 border-l-2 rotate-[-45deg]"></div>
            )}
          </div>
        ) : (
          <button
            onClick={handleToLogin}
            className="text-[18px] rounded-[45px] hover:bg-[#C6FF00] active:bg-black active:text-[#FFFFFF] bg-[#BCEC30] px-[16px] py-[8px] "
          >
            Войти
          </button>
        )}
      </header>
    </>
  );
};
