import { useNavigate } from "react-router-dom";
import { router } from "../pages/router";
import { useContext } from "react";
import { SetContext } from "../context/context";

export const Logo = () => {
  const { setIsOpenProfile } = useContext(SetContext);

  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate(router.main);
    setIsOpenProfile(false);
  };

  return (
    <>
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
    </>
  );
};
