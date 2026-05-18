import type { ReactNode } from "react";

type ButtonProp = {
  onClick: () => void;
  children: ReactNode;
  color: string;
};

export const Button = ({ onClick, children, color }: ButtonProp) => {
  return (
    <button
      onClick={onClick}
      style={{backgroundColor: color}}
      className={`flex w-full transition-all duration-300 filter hover:brightness-95 cursor-pointer place-self-center place-content-center text-[16px] rounded-[45px] px-[16px] py-[5px] hover:scale-[1.05] transition-all shadow-md active:scale-95`}
    >
      {children}
    </button>
  );
};
