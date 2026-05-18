import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { router } from "./router";
import { Logo } from "../components/Logo";
import type { userType } from "../types/types";
import { useAppDispatch } from "../store/features/store";
import { setIsAuth, setUser } from "../store/features/userSlice";

export const Login = () => {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch();

  let savedAccounts = localStorage.getItem("accounts");
  let accounts: userType[];
  if (savedAccounts) {
    accounts = JSON.parse(savedAccounts);
  }

  const navigate = useNavigate();

  const handleBackBtn = () => {
    setIsLoading(false);
    navigate(router.main);
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
          loginRef.current?.value.toLowerCase() === "admin" &&
          passwordRef.current?.value.toLowerCase() === "admin"
        ) {
          setError("");
          setIsLoading(false);
          navigate(router.main);
          dispatch(setIsAuth(true));
          dispatch(
            setUser({
              img: "",
              name: "Admin",
              login: loginRef.current?.value.toLowerCase(),
              password: passwordRef.current?.value,
              myWorkouts: [],
            })
          );
        } else {
          accounts.map((i: userType) => {
            if (
              i.login === loginRef.current?.value.toLowerCase() &&
              i.password === passwordRef.current?.value
            ) {
              dispatch(setUser(i));
              dispatch(setIsAuth(true));
              navigate(router.main);
              setError("");
              setIsLoading(false);
            }
            if (
              i.login === loginRef.current?.value.toLowerCase() &&
              i.password !== passwordRef.current?.value
            ) {
              setError("Неправильно введен пароль");
              setIsLoading(false);
            }
          });
        }
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleRegister = () => {
    setIsLoading(false);
    navigate(router.register);
  };

  return (
    <div className="w-full h-full flex justify-center items-center z-1 absolute">
      <div className="mx-[16px] fixed rounded-[30px] pb-[40px] pl-[40px] pt-[10px] pr-[10px] bg-white shadow-[0px_0px_5000px_0px]">
        <div
          onClick={handleBackBtn}
          className="place-self-end pr-[10px] hover:cursor-pointer"
        >
          x
        </div>
        <div className="flex flex-col mr-[30px]">
          <Logo />
          <div className="pt-[20px] pb-[10px] flex flex-col gap-[10px]">
            <input
              ref={loginRef}
              className={
                error === "Введите логин"
                  ? "py-[5px] px-[10px] rounded-[8px] border-1 border-[#DB0030]"
                  : "py-[5px] px-[10px] rounded-[8px] border-1 border-[#D0CECE]"
              }
              placeholder="Логин"
              type="email"
            />
            <input
              ref={passwordRef}
              className={
                error === "Введите пароль"
                  ? "py-[5px] px-[10px] rounded-[8px] border-1 border-[#DB0030]"
                  : "py-[5px] px-[10px] rounded-[8px] border-1 border-[#D0CECE]"
              }
              placeholder="Пароль"
              type="password"
            />
          </div>
          {error && <p className="text-[#DB0030] place-self-center">{error}</p>}

          <button
            disabled={isLoading}
            onClick={handleLogin}
            className={
              isLoading
                ? "text-[16px] mt-[20px] rounded-[45px] bg-[#F7F7F7] text-[#999999] px-[16px] py-[5px] mb-[10px]"
                : "text-[16px] mt-[20px] rounded-[45px] bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-[#A0B000] active:text-[white] px-[16px] py-[5px] mb-[10px]"
            }
          >
            Войти
          </button>
          <button
            onClick={handleRegister}
            className={
              isLoading
                ? "text-[16px] rounded-[45px] bg-[white] text-[#999999] px-[16px] py-[5px] border-1"
                : "text-[16px] rounded-[45px] bg-white active:bg-[#E9ECED] hover:bg-[#F7F7F7] px-[16px] py-[5px] border-1"
            }
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
};
