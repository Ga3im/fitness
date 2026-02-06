import { useRef, useState } from "react";
import type { timeType } from "../types/types";
import { useOutsideClick } from "../hooks/modalClose";

export const InputTime = ({ i, changeReps }) => {
  const [isOpenMinList, setIsOpenMinList] = useState<boolean>(false);
  const [isOpenSecList, setIsOpenSecList] = useState<boolean>(false);
  const [isInputNumber, setIsInputNumber] = useState<boolean>(false);
  const [time, setTime] = useState<timeType>({
    seconds: 0,
    minutes: 0,
  });
  const parentRef = useRef(null);
  const modalMinRef = useRef(null);
  const modalSecRef = useRef(null);
  const inputMinRef = useRef(null);
  const inputSecRef = useRef(null);

  const selectInput = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (parentRef.current === e.target) {
      setIsInputNumber(true);
    }
  };

  const changeInputNumber = (e: string) => {
    changeReps(e, i);
  };

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    (e.target as HTMLElement).blur();
  };

  const openMinList = () => {
    setIsOpenMinList(!isOpenMinList);
    setIsOpenSecList(false);
  };

  const openSecList = () => {
    setIsOpenSecList(!isOpenSecList);
    setIsOpenMinList(false);
  };

  const arr: number[] = [];
  const arrays = () => {
    for (let i = 0; i < 60; i++) {
      arr.push(i);
    }
  };

  const selectMinute = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    min: number
  ) => {
    e.stopPropagation();
    setTime({ ...time, minutes: min });
  };

  const selectSeconds = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    sec: number
  ) => {
    e.stopPropagation();
    setTime({ ...time, seconds: sec });
    changeReps(sec, i);
  };

  const closeModal = () => {
    setIsOpenMinList(false);
    setIsOpenSecList(false);
  };

  const closeInputNumber = () => {
    setIsInputNumber(false);
  };
  useOutsideClick(inputMinRef, modalMinRef, closeModal);
  useOutsideClick(inputSecRef, modalSecRef, closeModal);
  useOutsideClick(parentRef, parentRef, closeInputNumber);
  arrays();
  return (
    <>
      <div
        ref={parentRef}
        onClick={(e) => selectInput(e)}
        className="flex items-center border-1 rounded-[10px] px-[16px] py-[8px] cursor-text"
      >
        {isInputNumber ? (
          <input
            onChange={(e) => changeInputNumber(e.target.value)}
            onWheel={handleWheel}
            type="number"
            className="focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:margin-[0] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:margin-[0]"
          />
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  );
};
