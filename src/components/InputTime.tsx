import { useEffect, useRef, useState } from "react";
import { useOutsideClick } from "../hooks/modalClose";
import type { addTimeType } from "../types/types";

export type InputTimeProps = {
  value: number;
  changeVal: (seconds: number) => void;
};

export const InputTime = ({
  value,
  changeVal,
}: InputTimeProps) => {
  const [isOpenMinList, setIsOpenMinList] = useState<boolean>(false);
  const [isOpenSecList, setIsOpenSecList] = useState<boolean>(false);
  const [isInputNumber, setIsInputNumber] = useState<boolean>(false);
  const [secondsValue, setSecondsValue] = useState<number>(0);
  const [time, setTime] = useState<addTimeType>({
    minutes: 0,
    seconds: 0,
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const modalMinRef = useRef<HTMLDivElement | null>(null);
  const modalSecRef = useRef<HTMLInputElement | null>(null);
  const inputMinRef = useRef<HTMLInputElement | null>(null);
  const inputSecRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      changeVal(secondsValue);
    }, 500);
  }, [secondsValue]);

  useEffect(() => {
    let seconds = time.minutes * 60 + time.seconds;
    changeVal(seconds);
  }, [time]);

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    (e.target as HTMLElement).blur();
  };

  useEffect(() => {
    setTime({
      minutes: Math.round(value / 60),
      seconds: value % 60,
    });
  }, []);

  const openMinList = () => {
    setIsOpenMinList(!isOpenMinList);
    setIsOpenSecList(false);
  };

  const openSecList = () => {
    setIsOpenSecList(!isOpenSecList);
    setIsOpenMinList(false);
  };

  const arr = Array.from({ length: 60 }, (_, i) => i);

  const selectMinute = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    min: number
  ) => {
    e.stopPropagation();
    setTime({ ...time, minutes: min });
    setIsOpenMinList(false);
  };

  const selectSeconds = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    sec: number
  ) => {
    e.stopPropagation();
    setTime({ ...time, seconds: sec });
    setIsOpenSecList(false);
  };

  const closeModal = () => {
    setIsOpenMinList(false);
    setIsOpenSecList(false);
  };

  useOutsideClick(inputMinRef, modalMinRef, closeModal);
  useOutsideClick(inputSecRef, modalSecRef, closeModal);

  return (
    <div className="flex items-center justify-between border-1 rounded-[10px] px-[10px] py-[5px] cursor-text">
      {isInputNumber ? (
        <>
          <input
            autoFocus
            onChange={(e) => setSecondsValue(Number(e.target.value))}
            defaultValue={value}
            onWheel={handleWheel}
            type="number"
            className="focus:outline-none w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:margin-[0] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:margin-[0]"
          />

          <svg
            onClick={() => setIsInputNumber(false)}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            xmlns="http://www.w3.org"
          >
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <circle cx="12" cy="10" r="0.5" fill="currentColor" />
            <circle cx="12" cy="14" r="0.5" fill="currentColor" />
            <path d="M7 10v4M17 10v4" opacity="0.5" />
          </svg>
        </>
      ) : (
        <>
          <div className="flex ">
            <div className="flex flex-col relative">
              <input
                ref={inputMinRef}
                onClick={openMinList}
                className="w-[20px] cursor-pointer focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:margin-[0] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:margin-[0]"
                onWheel={handleWheel}
                type="number"
                placeholder=""
                value={time.minutes.toString().padStart(2, "0")}
              />
              {isOpenMinList && (
                <div
                  ref={modalMinRef}
                  className="overflow-y-scroll z-1 absolute top-[25px] left-[-25px] w-[50px] h-[200px] bg-[#fff] shadow-[0px_0px_20px_-5px]"
                >
                  {arr.map((i) => (
                    <p
                      onClick={(e) => selectMinute(e, i)}
                      className="text-[20px] cursor-pointer"
                    >
                      {i}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <span>:</span>
            <div className="flex flex-col relative">
              <input
                ref={inputSecRef}
                onClick={openSecList}
                className="w-[20px] cursor-pointer focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:margin-[0] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:margin-[0]"
                onWheel={handleWheel}
                type="number"
                placeholder=""
                value={time.seconds.toString().padStart(2, "0")}
              />
              {isOpenSecList && (
                <div
                  ref={modalSecRef}
                  className="overflow-y-scroll z-1 absolute top-[25px] w-[50px] h-[200px] bg-[#fff] shadow-[0px_0px_20px_-5px]"
                >
                  {arr.map((i) => (
                    <p
                      onClick={(e) => selectSeconds(e, i)}
                      className="text-[20px] cursor-pointer"
                    >
                      {i}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          <svg
            onClick={() => setIsInputNumber(true)}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            xmlns="http://www.w3.org"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <path d="M12 12V6" />
            <path d="M12 12l4 4" stroke-width="1" />
          </svg>
        </>
      )}
    </div>
  );
};
