import { useState } from "react";
import type { ModeTypes } from "../../types/types";

type ModeWorkoutsType = {
  handleModeChange: (value: ModeTypes) => void;
  currentMode: string;
};

export const ModeWorkouts = ({
  handleModeChange,
  currentMode,
}: ModeWorkoutsType) => {
  const [openMode, setOpenMode] = useState<boolean>(false);

  return (
    <div
      onClick={() => setOpenMode(!openMode)}
      className="text-[14px] relative cursor-pointer select-none hover:opacity-90 transition-opacity"
    >
      Режим:{" "}
      <span className="bg-[#BCEC30] text-black font-semibold rounded-[6px] px-[8px] py-[2px] ml-[4px] shadow-sm inline-block">
        {currentMode}
      </span>
      {openMode && (
        <div className="absolute z-20 p-[6px] left-[50px] top-[24px] bg-[#16171d] text-white rounded-[8px] border border-gray-700 shadow-lg min-w-[120px]">
          <p
            onClick={(e) => {
              e.stopPropagation();
              handleModeChange("свободное");
              setOpenMode(false);
            }}
            className="px-[8px] py-[4px] rounded-[4px] hover:bg-gray-700 cursor-pointer transition-colors"
          >
            свободное
          </p>
          <p
            onClick={(e) => {
              e.stopPropagation();
              handleModeChange("круговое");
              setOpenMode(false);
            }}
            className="px-[8px] py-[4px] rounded-[4px] hover:bg-gray-700 cursor-pointer transition-colors"
          >
            круговое
          </p>
          <p
            onClick={(e) => {
              e.stopPropagation();
              handleModeChange("поподходное");
              setOpenMode(false);
            }}
            className="px-[8px] py-[4px] rounded-[4px] hover:bg-gray-700 cursor-pointer transition-colors"
          >
            поподходное
          </p>
        </div>
      )}
    </div>
  );
};
