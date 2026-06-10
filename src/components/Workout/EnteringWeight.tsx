import { useWorkout } from "../../hooks/Workout/useWorkout";
import {
  confirmWeight,
  setIsEnteringWeight,
} from "../../store/features/workoutSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import type { workoutType } from "../../types/types";

type EnteringWeightProp = {
  displayWorkout: workoutType | null;
};

export const EnteringWeight = ({ displayWorkout }: EnteringWeightProp) => {
  const { handleWheel, setUserWeight, userWeight } = useWorkout(displayWorkout);
  const { theme } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-3">
      <div
        className={
          theme === "night"
            ? "fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-3 bg-[#000] text-white rounded-[10px] p-[20px] shadow-[0px_0px_25px_-5px]"
            : "fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-3 bg-[white] rounded-[10px] p-[20px] shadow-[0px_0px_25px_-5px]"
        }
      >
        <div className="w-[250px] flex flex-col gap-[20px]">
          <p className="text-[20px]">Введите массу вашего тела</p>
          <div className="border-2 border-[#9c9c9c] rounded-[10px] px-[10px] py-[5px] group focus-within:border-[#000000]">
            <input
              className="focus:outline-none focus:group-focus:border-2 focus:group-focus:border-[red] placeholder-gray-400 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:margin-[0] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:margin-[0]"
              onWheel={handleWheel}
              onChange={(e) => setUserWeight(Number(e.target.value))}
              type="number"
              placeholder="Вес в кг"
              name=""
              id=""
            />
          </div>
          <div className="flex justify-between gap-[20px]">
            <button
              onClick={() => dispatch(setIsEnteringWeight(false))}
              className="w-full mt-[10px] text-black text-[16px] rounded-[45px] bg-[white] border-1 px-[16px] py-[8px] hover:bg-[#d7d7d7] hover:cursor-pointer"
            >
              Отмена
            </button>

            <button
              onClick={() => dispatch(confirmWeight(userWeight))}
              className="w-full mt-[10px] text-black text-[16px] rounded-[45px] border-1 border-[#BCEC30] bg-[#BCEC30] px-[16px] py-[8px] hover:bg-[#C6FF00] hover:cursor-pointer"
            >
              Далее
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
