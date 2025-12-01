"use client";
import { useContext } from "react";
import { SetContext } from "../context/context";

export const Header = () => {
  const { user, isOpenProfile, setIsOpenProfile, isAuth, setIsAuth } =
    useContext(SetContext);

  const handleLogoClick = () => {
    // router.push("/main");
    setIsOpenProfile(false);
  };

  const handleToLogin = () => {
    setIsAuth(!isAuth);
  };

  const handleOpenProfile = () => {
    if (isOpenProfile) {
      setIsOpenProfile(false);
      // router.push("/main");
    } else {
      setIsOpenProfile(true);
      // router.push("/profile");
    }
  };

  return (
    <>
      <header className="py-[40px] flex justify-between items-center">
        <div onClick={handleLogoClick} className="flex gap-[10px] items-center">
          <svg
            width="29"
            height="20"
            viewBox="0 0 29 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.68844 19.4579C1.54195 20.6977 0 19.6645 0 17.8267C0 15.8703 0 10.0001 0 10.0001C0 10.0001 0 4.12988 0 2.17346C0 0.335666 1.54099 -0.697553 3.68844 0.54231C7.03156 2.4729 17.06 8.26658 17.06 8.26658C18.3934 9.03671 18.3934 10.9625 17.06 11.7326C17.06 11.7336 7.03156 17.5273 3.68844 19.4579Z"
              fill="#00C1FF"
            />
            <path
              d="M14.7265 19.4574C12.58 20.6972 11.038 19.664 11.038 17.8262C11.038 15.8698 11.038 9.9996 11.038 9.9996C11.038 9.9996 11.038 4.12939 11.038 2.17297C11.038 0.335178 12.579 -0.698041 14.7265 0.541821C17.9959 2.43032 27.8043 8.09676 27.8043 8.09676C29.2688 8.94246 29.2688 11.0567 27.8043 11.9024C27.8034 11.9024 17.9959 17.5689 14.7265 19.4574Z"
              fill="#BCEC30"
            />
            <mask
              id="mask0_47_2766"
              maskUnits="userSpaceOnUse"
              x="11"
              y="0"
              width="18"
              height="20"
            >
              <path
                d="M14.7265 19.4574C12.58 20.6972 11.038 19.664 11.038 17.8262C11.038 15.8698 11.038 9.9996 11.038 9.9996C11.038 9.9996 11.038 4.12939 11.038 2.17297C11.038 0.335178 12.579 -0.698041 14.7265 0.541821C17.9959 2.43032 27.8043 8.09676 27.8043 8.09676C29.2688 8.94246 29.2688 11.0567 27.8043 11.9024C27.8034 11.9024 17.9959 17.5689 14.7265 19.4574Z"
                fill="#6FE4FF"
              />
            </mask>
            <g mask="url(#mask0_47_2766)">
              <g filter="url(#filter0_f_47_2766)">
                <path
                  d="M3.68893 19.4584C1.54244 20.6982 0.000488281 19.665 0.000488281 17.8272C0.000488281 15.8708 0.000488281 10.0006 0.000488281 10.0006C0.000488281 10.0006 0.000488281 4.13036 0.000488281 2.17394C0.000488281 0.336155 1.54148 -0.697065 3.68893 0.542798C7.03205 2.47339 17.0605 8.26707 17.0605 8.26707C18.3939 9.0372 18.3939 10.963 17.0605 11.7331C17.0605 11.7341 7.03205 17.5278 3.68893 19.4584Z"
                  fill="#99D100"
                />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_f_47_2766"
                x="-1.46075"
                y="-1.46027"
                width="20.9825"
                height="22.9215"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="0.730621"
                  result="effect1_foregroundBlur_47_2766"
                />
              </filter>
            </defs>
          </svg>
          <p className="font-bold text-[24px]">SkyFitnessPro</p>
        </div>
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
