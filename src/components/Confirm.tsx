import { Button } from "./Button";

export type ConfirmProp = {
  text: string;
  noBtn: () => void;
  yesBtn: () => void;
  theme: "night" | "light";
};

export const Confirm = ({
  text,
  noBtn,
  yesBtn,
  theme = "light",
}: ConfirmProp) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-3">
      <div
        className={
          theme === "night"
            ? "fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-[#0f172a] text-white rounded-[10px] p-[20px] shadow-[0px_0px_20px_-5px]"
            : "fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-[white] rounded-[10px] p-[20px] shadow-[0px_0px_200px_-5px]"
        }
      >
        <div className="w-[250px] flex flex-col gap-[20px]">
          <p className="text-[20px]">{text}</p>
          <div className="flex justify-between gap-[20px]">
            <Button onClick={noBtn} color="#efefef">
              Нет
            </Button>
            <Button onClick={yesBtn} color="#BCEC30">
              Да
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
