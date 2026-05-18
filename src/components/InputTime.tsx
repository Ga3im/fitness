import { useEffect, useState } from "react";
import { StopwatchIcon } from "./icons/StopwatchIcon";
import { TimerIcon } from "./icons/TimerIcon";

export type InputTimeProps = {
  value: number;
  changeVal: (seconds: number) => void;
};

export const InputTime = ({ value, changeVal }: InputTimeProps) => {
  const [isInputNumber, setIsInputNumber] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    (e.target as HTMLElement).blur();
  };

  // Форматирует чистые цифры в строку вида "00:00"
  const formatDigitsToTime = (digits: string) => {
    const padded = digits.padStart(4, "0");
    return `${padded.slice(0, 2)}:${padded.slice(2, 4)}`;
  };

  useEffect(() => {
    const mins = Math.floor(value / 60)
      .toString()
      .padStart(2, "0");
    const secs = (value % 60).toString().padStart(2, "0");
    setInputValue(`${mins}:${secs}`);
  }, [value]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = e.target.value.replace(/\D/g, "");

    if (digits.length > 4) {
      digits = digits.slice(0, 4);
    }

    if (digits.length <= 2) {
      setInputValue(digits);
    } else {
      setInputValue(`${digits.slice(0, 2)}:${digits.slice(2)}`);
    }

    let mins = 0;
    let secs = 0;

    if (digits.length <= 2) {
      mins = Number(digits) || 0;
      secs = 0;
    } else {
      mins = Number(digits.slice(0, 2)) || 0;
      secs = Number(digits.slice(2)) || 0;
    }

    if (secs > 59) secs = 59;

    changeVal(mins * 60 + secs);
  };

  const handleBlur = () => {
    const digits = inputValue.replace(/\D/g, "");
    setInputValue(formatDigitsToTime(digits));
  };

  return (
    <div className="flex items-center justify-between border-1 rounded-[10px] px-[10px] py-[5px] cursor-text">
      {isInputNumber ? (
        <>
          <input
            autoFocus
            onChange={(e) => changeVal(Number(e.target.value) || 0)}
            defaultValue={value}
            onWheel={handleWheel}
            type="number"
            className="focus:outline-none w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:margin- [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:margin-"
          />
          <button onClick={() => setIsInputNumber(false)}>
            <TimerIcon />
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center">
            <input
              type="text"
              inputMode="numeric" // Только цифровая клавиатура на смартфонах
              pattern="[0-9]*"
              placeholder="00:00"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onWheel={handleWheel}
              onClick={(e) => (e.target as HTMLInputElement).select()} // Выделение при клике
              className="w-[50px] text-center focus:outline-none bg-transparent font-mono font-medium"
            />
          </div>

          <button onClick={() => setIsInputNumber(true)}>
            <StopwatchIcon />
          </button>
        </>
      )}
    </div>
  );
};
