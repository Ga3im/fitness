import { useEffect, useState } from "react";
import type { BottomBtnProp } from "../types/types";

export const BottomBtn = ({ onClick, btnText }: BottomBtnProp) => {
  const [scroll, setScroll] = useState(false);
  const [lowerPos, setLowerPos] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;

      setScroll(scrollTop > 200);

      if (windowHeight + scrollTop >= totalHeight - 60) {
        setLowerPos(true);
      } else {
        setLowerPos(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full flex justify-center md:justify-end mt-[20px] min-h-[46px]">
      <button
        onClick={onClick}
        className={`text-[16px] rounded-[45px] bg-[#BCEC30] px-[16px] py-[6px] text-black font-semibold shadow-md transition-all active:scale-95 duration-200 cursor-pointer
          ${
            scroll && !lowerPos
              ? "fixed z-20 bottom-[16px] right-[16px] mx-0 my-0 bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-[#A0B000] active:text-white"
              : "relative w-full md:w-auto hover:bg-[#a6d120]"
          }
        `}
      >
        {btnText}
      </button>
    </div>
  );
};
