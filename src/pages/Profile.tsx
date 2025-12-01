"use client";

import { SetContext } from "@/src/context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { coursesType } from "../main/page";

export default function Profile() {
  const {
    user,
    setUser,
    progress,
    setIsOpenProfile,
    setIsOpenPage,
    changeSelectedCourse,
  } = useContext(SetContext);

  const router = useRouter();

  const handleLogout = () => {
    setUser(null);

    setIsOpenProfile(false);
    router.push("/main");
    localStorage.removeItem("user");
  };

  const handleWorkoutBtn = () => {
    setIsOpenPage("selectWorkout");
  };

  return (
    <>
      <div className="px-[16px] pb-[24px]">
        <p className="text-[24px] font-medium pb-[24px]">Профиль</p>
        <div className="md:flex md:gap-[33px] md:items-center shadow-[0px_0px_10px_-7px] p-[30px] rounded-[30px]">
          <svg
            className="flex place-self-center mb-[30px] w-[141px] md:w-[200px] h-[141px] md:h-[200px]"
            viewBox="0 0 141 141"
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
          <div>
            <div className="pt-[30px] pb-[20px]">
              <span>Имя:</span>
              <span> {user ? user.name : ""}</span>
            </div>
            <div className="pb-[20px]">
              <span>Логин:</span>
              <span> {user ? user.login : ""}</span>
            </div>
            <button
              onClick={handleLogout}
              className="py-[16px] w-full flex justify-center rounded-[46px] border-1 text-center cursor-pointer hover:bg-[#f7f7f7] active:bg-[#E9ECED]"
            >
              Выйти
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-[24px] font-medium pt-[24px]">Мои курсы</h1>
          <div className="flex flex-wrap justify-center gap-[24px] md:justify-start">
            {user !== null
              ? user.myCourses.map((i: coursesType, index: number) => (
                  <div
                    onClick={() => changeSelectedCourse(i)}
                    key={index}
                    className="rounded-[30px] pb-[15px] shadow-[0px_0px_10px_-7px] hover:cursor-pointer"
                  >
                    <div>
                      <svg
                        className="place-self-end relative top-[40px] right-[40px]"
                        width="27"
                        height="27"
                        viewBox="0 0 27 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.3333 26.6667C20.6971 26.6667 26.6667 20.6971 26.6667 13.3333C26.6667 5.96954 20.6971 0 13.3333 0C5.96954 0 0 5.96954 0 13.3333C0 20.6971 5.96954 26.6667 13.3333 26.6667ZM6.66667 12V14.6667H20V12H6.66667Z"
                          fill="white"
                        />
                      </svg>
                      <Image
                        className="rounded-[30px] mb-[25px] place-self-center"
                        width={343}
                        height={343}
                        src={i.img}
                        alt={i.nameEN}
                      />
                    </div>
                    {/* <svg
                className="relative bottom-[305px] left-[300px]"
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.3333 26.6667C20.6971 26.6667 26.6667 20.6971 26.6667 13.3333C26.6667 5.96954 20.6971 0 13.3333 0C5.96954 0 0 5.96954 0 13.3333C0 20.6971 5.96954 26.6667 13.3333 26.6667ZM12 12V6.66667H14.6667V12H20V14.6667H14.6667V20H12V14.6667H6.66667V12H12Z"
                  fill="white"
                />
              </svg> */}

                    <div className="px-[20px]">
                      <p className="text-[24px] pb-[20px] font-medium">
                        {i.nameRU}
                      </p>
                      <div className="flex flex-wrap gap-[6px]">
                        <div className="flex gap-[5px] items-center bg-[#F7F7F7] rounded-[50px] p-[10px]">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 1.5C6 0.671573 5.32843 0 4.5 0C3.67157 0 3 0.671573 3 1.5C1.34315 1.5 0 2.84315 0 4.5H15C15 2.84315 13.6569 1.5 12 1.5C12 0.671573 11.3284 0 10.5 0C9.67157 0 9 0.671573 9 1.5H6Z"
                              fill="#202020"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0 6H15V10.2C15 11.8802 15 12.7202 14.673 13.362C14.3854 13.9265 13.9265 14.3854 13.362 14.673C12.7202 15 11.8802 15 10.2 15H4.8C3.11984 15 2.27976 15 1.63803 14.673C1.07354 14.3854 0.614601 13.9265 0.32698 13.362C0 12.7202 0 11.8802 0 10.2V6ZM9 10.2C9 9.77996 9 9.56994 9.08175 9.40951C9.15365 9.26838 9.26838 9.15365 9.40951 9.08175C9.56994 9 9.77996 9 10.2 9H10.8C11.22 9 11.4301 9 11.5905 9.08175C11.7316 9.15365 11.8463 9.26838 11.9183 9.40951C12 9.56994 12 9.77996 12 10.2V10.8C12 11.22 12 11.4301 11.9183 11.5905C11.8463 11.7316 11.7316 11.8463 11.5905 11.9183C11.4301 12 11.22 12 10.8 12H10.2C9.77996 12 9.56994 12 9.40951 11.9183C9.26838 11.8463 9.15365 11.7316 9.08175 11.5905C9 11.4301 9 11.22 9 10.8V10.2Z"
                              fill="#202020"
                            />
                          </svg>
                          <p>25 дней</p>
                        </div>
                        <div className="flex gap-[5px] items-center bg-[#F7F7F7] rounded-[50px] p-[10px]">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15ZM6.75 3V7.5C6.75 7.91421 7.08579 8.25 7.5 8.25H11.25V6.75H8.25V3H6.75Z"
                              fill="#202020"
                            />
                          </svg>
                          <p>20-50 мин/день</p>
                        </div>
                        <div className="flex gap-[5px] items-center bg-[#F7F7F7] rounded-[50px] p-[10px]">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M15 2.625C15.2984 2.625 15.5845 2.74353 15.7955 2.9545C16.0065 3.16548 16.125 3.45163 16.125 3.75V14.25C16.125 14.5484 16.0065 14.8345 15.7955 15.0455C15.5845 15.2565 15.2984 15.375 15 15.375C14.7016 15.375 14.4155 15.2565 14.2045 15.0455C13.9935 14.8345 13.875 14.5484 13.875 14.25V3.75C13.875 3.45163 13.9935 3.16548 14.2045 2.9545C14.4155 2.74353 14.7016 2.625 15 2.625Z"
                              fill="#D9D9D9"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 4.875C12.2984 4.875 12.5845 4.99353 12.7955 5.2045C13.0065 5.41548 13.125 5.70163 13.125 6V14.25C13.125 14.5484 13.0065 14.8345 12.7955 15.0455C12.5845 15.2565 12.2984 15.375 12 15.375C11.7016 15.375 11.4155 15.2565 11.2045 15.0455C10.9935 14.8345 10.875 14.5484 10.875 14.25V6C10.875 5.70163 10.9935 5.41548 11.2045 5.2045C11.4155 4.99353 11.7016 4.875 12 4.875Z"
                              fill="#D9D9D9"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9 7.125C9.29837 7.125 9.58452 7.24353 9.7955 7.4545C10.0065 7.66548 10.125 7.95163 10.125 8.25V14.25C10.125 14.5484 10.0065 14.8345 9.7955 15.0455C9.58452 15.2565 9.29837 15.375 9 15.375C8.70163 15.375 8.41548 15.2565 8.2045 15.0455C7.99353 14.8345 7.875 14.5484 7.875 14.25V8.25C7.875 7.95163 7.99353 7.66548 8.2045 7.4545C8.41548 7.24353 8.70163 7.125 9 7.125Z"
                              fill="#00C1FF"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6 9.375C6.29837 9.375 6.58452 9.49353 6.7955 9.7045C7.00647 9.91548 7.125 10.2016 7.125 10.5V14.25C7.125 14.5484 7.00647 14.8345 6.7955 15.0455C6.58452 15.2565 6.29837 15.375 6 15.375C5.70163 15.375 5.41548 15.2565 5.2045 15.0455C4.99353 14.8345 4.875 14.5484 4.875 14.25V10.5C4.875 10.2016 4.99353 9.91548 5.2045 9.7045C5.41548 9.49353 5.70163 9.375 6 9.375Z"
                              fill="#00C1FF"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3 11.625C3.29837 11.625 3.58452 11.7435 3.7955 11.9545C4.00647 12.1655 4.125 12.4516 4.125 12.75V14.25C4.125 14.5484 4.00647 14.8345 3.7955 15.0455C3.58452 15.2565 3.29837 15.375 3 15.375C2.70163 15.375 2.41548 15.2565 2.2045 15.0455C1.99353 14.8345 1.875 14.5484 1.875 14.25V12.75C1.875 12.4516 1.99353 12.1655 2.2045 11.9545C2.41548 11.7435 2.70163 11.625 3 11.625Z"
                              fill="#00C1FF"
                            />
                          </svg>
                          <p>Сложность</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[18px] pt-[20px]">
                          Прогресс {progress}%
                        </p>
                        <progress
                          className="w-full [&::-webkit-progress-bar]:rounded-[50px] [&::-webkit-progress-bar]:h-[6px] [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:bg-[#00C1FF] [&::-webkit-progress-value]:rounded-[50px] "
                          value={progress}
                          max={100}
                        ></progress>{" "}
                      </div>
                      <button
                        onClick={handleWorkoutBtn}
                        className="active:bg-[#747e56] hover:bg-[#C6FF00] hover:cursor-pointer mt-[40px] text-[18px] rounded-[45px] bg-[#BCEC30] px-[16px] py-[8px] w-full "
                      >
                        {progress >= 100
                          ? "Начать заново"
                          : progress <= 0
                          ? "Начать тренировки"
                          : "Продолжить"}
                      </button>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
        <button className="mt-[24px] flex place-self-end md:place-self-center text-[18px] rounded-[45px] bg-[#BCEC30] px-[16px] py-[8px] mb-[30px] ">
          Наверх &#8593;
        </button>
      </div>
    </>
  );
}
