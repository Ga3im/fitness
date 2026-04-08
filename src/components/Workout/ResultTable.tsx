import type { exercisesType } from "../../types/types";
import { timeHHMMSS } from "../../utils/functions";

type ResultTableType = {
  exercise: exercisesType;
};

export const ResultTable = ({ exercise }: ResultTableType) => {
  return (
    <div>
      <div className="flex justify-around">
        <span>Подходы </span>
        <span>{exercise.static ? "Время" : "Повторения"}</span>
      </div>
      {exercise.table?.map((i: number, index: number) => (
        <div
          key={index}
          className="flex border-t-1 border-l-1 border-r-1 last:border-b-1"
        >
          <p className="border-r-1 w-[50%] text-center">{index + 1}</p>
          <span className="text-center w-[50%]">
            {exercise.static ? timeHHMMSS(i) : i}
          </span>
          <br />
        </div>
      ))}
      <div className="flex border-1 font-[500]">
        <span className="w-[50%] border-r-1 text-center">Всего:</span>
        <span className="w-[50%] text-center">
          {exercise.static
            ? timeHHMMSS(exercise.doneReps ?? 0)
            : exercise.doneReps}
        </span>
      </div>

      <progress
        className="w-full pt-[10px] [&::-webkit-progress-bar]:rounded-[50px] [&::-webkit-progress-bar]:h-[6px] [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:bg-[#00C1FF] [&::-webkit-progress-value]:rounded-[50px] "
        value={exercise.doneReps}
        max={exercise.reps ?? 0 * (exercise.sets ?? 0)}
      ></progress>
    </div>
  );
};
