import { useEffect, useState } from "react";
import type { BottomBtnProp } from "../types/types";

export const BottomBtn = ({ onClick, btnText }: BottomBtnProp) => {
  const [scroll, setScroll] = useState(false);
  const [lowerPos, setLowerPos] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY + window.innerHeight <=
        document.documentElement.scrollHeight - 100
      ) {
        setLowerPos(false);
      }
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10
      ) {
        setLowerPos(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const scrollChange = () => {
      if (window.scrollY > 200) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", scrollChange);
    return () => {
      window.removeEventListener("scroll", scrollChange);
    };
  }, []);

  return (
    <>
      {scroll && !lowerPos ? (
        <button
          onClick={onClick}
          className={
            "fixed z-2 bottom-0 right-0 mt-[20px] mx-[16px] text-[18px] rounded-[45px] bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-[#A0B000] active:text-[white] px-[16px] py-[8px] mb-[10px]"
          }
        >
          {btnText}
        </button>
      ) : (
        <button
          onClick={onClick}
          className={
            "flex place-self-center place-content-center w-full md:w-auto md:place-self-end mt-[20px] text-[18px] rounded-[45px] bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-[#A0B000] active:text-[white] px-[16px] py-[8px] mb-[10px]"
          }
        >
          {btnText}
        </button>
      )}
    </>
  );
};
