import { useContext, useEffect, useRef } from "react";
import { SetContext, type userType } from "../context/context";

export const Login = () => {
  const {
    setIsOpenPage,
    setIsOpenProfile,
    user,
    setAccounts,
    changeUser,
    accounts,
    error,
    setError,
    isLoading,
    setIsLoading,
  } = useContext(SetContext);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const value = localStorage.getItem("accounts");
    if (value) {
      setAccounts(JSON.parse(value));
    }
  }, []);

  const handleBackBtn = () => {
    setIsOpenPage("");
  };

  const handleLogoClick = () => {
    // router.push("/main");
    setIsOpenProfile(false);
  };

  const handleLogin = () => {
    setIsLoading(true);
    if (loginRef.current?.value === "") {
      setError("Введите логин");
      setIsLoading(false);
    } else if (passwordRef.current?.value === "") {
      setError("Введите пароль");
      setIsLoading(false);
    } else {
      setTimeout(() => {
        if (
          loginRef.current?.value === "admin" &&
          passwordRef.current?.value === "admin"
        ) {
          setIsOpenPage("");
          setError("");
          setIsLoading(false);
          changeUser({
            name: "Admin",
            login: loginRef.current?.value,
            password: passwordRef.current?.value,
            myCourses: [],
          });
        } else {
          if (accounts !== undefined) {
            accounts.map((i: userType) => {
              if (
                i.login === loginRef.current?.value &&
                i.password === passwordRef.current?.value
              ) {
                setIsOpenPage("");
                setError("");
                setIsLoading(false);
                changeUser(i);
                console.log(i);
              }
              if (
                i.login === loginRef.current?.value &&
                i.password !== passwordRef.current?.value
              ) {
                setError("Неправильно введен пароль");
                setIsLoading(false);
              }
            });
          } else {
            setError("Непрвильно введен логин");
            setIsLoading(false);
          }
        }
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleRegister = () => {
    setIsOpenPage("register");
  };

  return (
    <div className="w-full h-full flex justify-center items-center z-1 absolute">
      <div className="fixed rounded-[30px] pb-[40px] pl-[40px] pt-[10px] pr-[10px] bg-white shadow-[0px_0px_5000px_0px]">
        <div
          onClick={handleBackBtn}
          className="place-self-end pr-[10px] hover:cursor-pointer"
        >
          x
        </div>
        <div className="flex flex-col mr-[30px]">
          <div
            onClick={handleLogoClick}
            className="flex gap-[10px] items-center"
          >
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
          <div className="pt-[48px] pb-[10px] flex flex-col gap-[10px]">
            <input
              ref={loginRef}
              className={
                error === "Введите логин"
                  ? "py-[16px] px-[18px] rounded-[8px] border-1 border-[#DB0030]"
                  : "py-[16px] px-[18px] rounded-[8px] border-1 border-[#D0CECE]"
              }
              placeholder="Логин"
              type="email"
            />
            <input
              ref={passwordRef}
              className={
                error === "Введите пароль"
                  ? "py-[16px] px-[18px] rounded-[8px] border-1 border-[#DB0030]"
                  : "py-[16px] px-[18px] rounded-[8px] border-1 border-[#D0CECE]"
              }
              placeholder="Пароль"
              type="password"
            />
          </div>
          {error && (
            <p className="text-[#DB0030] pb-[34px] place-self-center">
              {error}
            </p>
          )}

          <button
            disabled={isLoading}
            onClick={handleLogin}
            className={
              isLoading
                ? "text-[18px] rounded-[45px] bg-[#F7F7F7] text-[#999999] px-[16px] py-[8px] mb-[10px]"
                : "text-[18px] rounded-[45px] bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-[#000000] active:text-[white] px-[16px] py-[8px] mb-[10px]"
            }
          >
            Войти
          </button>
          <button
            onClick={handleRegister}
            className={
              isLoading
                ? "text-[18px] rounded-[45px] bg-[white] text-[#999999] px-[16px] py-[8px] border-1"
                : "text-[18px] rounded-[45px] bg-white active:bg-[#E9ECED] hover:bg-[#F7F7F7] px-[16px] py-[8px] border-1"
            }
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
};
