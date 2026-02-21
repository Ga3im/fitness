import type { ConfirmProp } from "../types/types";

export const Confirm = ({ text, noBtn, yesBtn }: ConfirmProp) => {
  return (
    <div className=" fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-3 bg-[white] rounded-[10px] p-[20px] shadow-[0px_0px_25px_-5px]">
      <div className="w-[300px] flex flex-col gap-[20px]">
        <p className="text-[20px]">{text}</p>
        <div className="flex justify-between gap-[20px]">
          <button
            onClick={noBtn}
            className="w-full mt-[10px] text-[16px] rounded-[45px] bg-[white] border-1 px-[16px] py-[8px] hover:bg-[#C6FF00] hover:cursor-pointer"
          >
            Нет
          </button>

          <button
            onClick={yesBtn}
            className="w-full mt-[10px] text-[16px] rounded-[45px] border-1 border-[#BCEC30] bg-[#BCEC30] px-[16px] py-[8px] hover:bg-[#C6FF00] hover:cursor-pointer"
          >
            Да
          </button>
        </div>
      </div>
    </div>
  );
};
