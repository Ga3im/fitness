import { useContext, useRef } from "react";
import { SetContext, type userType } from "../context/context";
import { router } from "./router";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";

export const Register = () => {
  const {
    setIsOpenProfile,
    user,
    changeAccounts,
    setError,
    error,
    isLoading,
    setIsLoading,
    changeUser,
    setIsAuth,
  } = useContext(SetContext);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const repeatPasswordRef = useRef<HTMLInputElement | null>(null);

  let savedAccounts = localStorage.getItem("accounts");
  let accounts: userType[];
  if (savedAccounts) {
    accounts = JSON.parse(savedAccounts);
  }

  let userInfo: userType | {} = {
    name: "",
    login: "",
    password: "",
    myWorkouts: [],
  };

  const navigate = useNavigate();

  const handleBackBtn = () => {
    setIsLoading(false);
    navigate(router.main);
  };

  const handleToLogin = () => {
    navigate(router.login);
  };

  const handleRegister = () => {
    userInfo = {
      ...userInfo,
      name: nameRef.current?.value,
      login: loginRef.current?.value.toLowerCase(),
      password: passwordRef.current?.value,
      myWorkouts: [],
    };
    setIsLoading(true);
    if (nameRef.current?.value === "") {
      setError("Введите имя");
      setIsLoading(false);
    } else if (loginRef.current?.value === "") {
      setError("Введите логин");
      setIsLoading(false);
    } else if (passwordRef.current?.value === "") {
      setError("Введите пароль");
      setIsLoading(false);
    } else if (repeatPasswordRef.current?.value === "") {
      setError("Повторите пароль");
      setIsLoading(false);
    } else if (
      passwordRef.current?.value === repeatPasswordRef.current?.value
    ) {
      setTimeout(() => {
        if (accounts === undefined) {
          changeAccounts(userInfo);
          changeUser(userInfo);
          setError("");
          setIsLoading(false);
          setIsAuth(true);
          navigate(router.main);
        } else {
          accounts.map((i: userType) => {
            if (i.login === loginRef.current?.value.toLowerCase()) {
              setError("Пользователь с таким логином уже существует");
              setIsLoading(false);
            } else {
              changeAccounts(userInfo);
              changeUser(userInfo);
              setError("");
              setIsLoading(false);
              navigate(router.main);
            }
          });
        }
      }, 1000);
    } else {
      setError("Пароли не совпали");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center z-1 bg-[rgb(0,0,0,0.2)] absolute">
      <div className="mx-[16px] fixed rounded-[30px] pb-[40px] pl-[40px] pt-[10px] pr-[10px] bg-white">
        <div
          onClick={handleBackBtn}
          className="place-self-end pr-[10px] hover:cursor-pointer"
        >
          x
        </div>
        <div className="flex flex-col mr-[30px]">
          <Logo />
          <div className="pt-[48px] pb-[34px] flex flex-col gap-[10px]">
            <input
              ref={nameRef}
              className={
                error === "Введите имя"
                  ? "py-[16px] px-[18px] rounded-[8px] border-1 border-[#DB0030]"
                  : "py-[16px] px-[18px] rounded-[8px] border-1 border-[#D0CECE]"
              }
              placeholder="Имя"
              type="text"
            />
            <input
              ref={loginRef}
              className={
                error === "Введите логин" ||
                error === "Пользователь с таким логином уже существует"
                  ? "py-[16px] px-[18px] rounded-[8px] border-1 border-[#DB0030]"
                  : "py-[16px] px-[18px] rounded-[8px] border-1 border-[#D0CECE]"
              }
              placeholder="Эл. почта"
              type="email"
            />
            <input
              ref={passwordRef}
              className={
                error === "Пароли не совпали" || error === "Введите пароль"
                  ? "py-[16px] px-[18px] rounded-[8px] border-1 border-[#DB0030]"
                  : "py-[16px] px-[18px] rounded-[8px] border-1 border-[#D0CECE]"
              }
              placeholder="Пароль"
              type="password"
            />
            <input
              ref={repeatPasswordRef}
              className={
                error === "Пароли не совпали" || error === "Повторите пароль"
                  ? "py-[16px] px-[18px] rounded-[8px] border-1 border-[#DB0030]"
                  : "py-[16px] px-[18px] rounded-[8px] border-1 border-[#D0CECE]"
              }
              placeholder="Повторите пароль"
              type="password"
            />
          </div>
          {error && (
            <p className="text-[#DB0030] pb-[34px] place-self-center text-center">
              {error}
            </p>
          )}

          <button
            onClick={handleRegister}
            className={
              isLoading
                ? "text-[18px] rounded-[45px] bg-[#F7F7F7] text-[#999999] px-[16px] py-[8px] mb-[10px]"
                : "text-[18px] rounded-[45px] bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-[#A0B000] active:text-[white] px-[16px] py-[8px] mb-[10px]"
            }
          >
            Зарегистрироваться
          </button>

          <button
            onClick={handleToLogin}
            className="text-[18px] rounded-[45px] bg-white px-[16px] py-[8px] border-1"
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};
