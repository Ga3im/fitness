import { useState, type Dispatch, type SetStateAction } from "react";
import { RoundCheckbox } from "./Checkbox";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  filterExercise,
  handleEquipment,
  handleDynamic,
  handleStatic,
} from "../store/features/workoutSlice";

type FilterExerciseType = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

export const FilterExercise = ({ search, setSearch }: FilterExerciseType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { showDynamic, showStatic, selectedEquipment } = useAppSelector(
    (state) => state.workoutSlice
  );
  const dispatch = useAppDispatch();

  const handleSearchBtn = () => {
    dispatch(filterExercise(search));
  };

  const handleOpenFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex justify-center items-center gap-[10px]">
        <div className="border-2 border-[#9c9c9c] rounded-[10px] px-[5px] py-[1px] group focus-within:border-[#000000]">
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="focus:outline-none focus:group-focus:border-2 focus:group-focus:border-[red]"
            type="text"
            placeholder="Искать"
            name=""
            id=""
          />
          <button
            className="opacity-50 group-focus-within:opacity-100"
            onClick={handleSearchBtn}
          >
            🔍
          </button>
        </div>
        <div
          onClick={handleOpenFilter}
          className={
            isOpen
              ? "w-[15px] mb-[-10px] h-[15px] border-l-2 border-b-2 rotate-[135deg] transition-transform cursor-pointer"
              : "w-[15px] h-[15px] border-l-2 border-b-2 rotate-[-45deg] transition-transform cursor-pointer"
          }
        ></div>
      </div>
      {isOpen && (
        <div className="flex flex-wrap justify-center px-[20px] pt-[10px] gap-[5px] sm:gap-[20px]">
          <div className="flex gap-[5px]">
            <RoundCheckbox
              checked={showStatic}
              onChange={() => dispatch(handleStatic())}
            />
            <p>Статика</p>
          </div>
          <div className="flex gap-[5px]">
            <RoundCheckbox
              checked={showDynamic}
              onChange={() => dispatch(handleDynamic())}
            />
            <p>Динамика</p>
          </div>
          <div className="flex gap-[5px]">
            <RoundCheckbox
              checked={selectedEquipment.includes("bodyweight")}
              onChange={() => dispatch(handleEquipment("bodyweight"))}
            />
            <p>С собсвенным весом</p>
          </div>
          <div className="flex gap-[5px]">
            <RoundCheckbox
              checked={selectedEquipment.includes("dumbbell")}
              onChange={() => dispatch(handleEquipment("dumbbell"))}
            />
            <p>С гантелями</p>
          </div>
          <div className="flex gap-[5px]">
            <RoundCheckbox
              checked={selectedEquipment.includes("barbell")}
              onChange={() => dispatch(handleEquipment("barbell"))}
            />
            <p>Со штангой</p>
          </div>
          <div className="flex gap-[5px]">
            <RoundCheckbox
              checked={selectedEquipment.includes("machine")}
              onChange={() => dispatch(handleEquipment("machine"))}
            />
            <p>На тренажерке</p>
          </div>
        </div>
      )}
    </>
  );
};
