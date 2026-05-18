import { useAppDispatch, useAppSelector } from "../../store/features/store";
import {
  finishWorkout,
  setCycles,
  setPrepTime,
  setRestTime,
  setWorkoutTime,
  setWorkTime,
  startWorkout,
} from "../../store/features/timerSlice";
import { Button } from "../Button";
import { Stopwatch } from "../Stopwatch";

export const SetIntervalWorkout = () => {
  const {
    currentCycle,
    isStart,
    workoutTime,
    time,
    prepTime,
    workTime,
    restTime,
    cycles,
    status,
  } = useAppSelector((state) => state.timer);
  const dispatch = useAppDispatch();

  const handleStartWorkout = () => {
    dispatch(setWorkoutTime(0));
    dispatch(startWorkout());
  };

  const handleDeleteWorkTime = () => {
    // реализовать без время работы
  };

  return (
    <div className="bg-white p-6 rounded-[30px] shadow-lg w-full max-w-[360px] border border-gray-50">
      <h3 className="text-center font-bold opacity-50 uppercase text-xs tracking-widest">
        {isStart ? (
          <>
            {status === "Подготовка" && <p className="text-[30px]">{status}</p>}
            {status === "Работа" && (
              <p className="text-[30px] text-[#ff0000]">{status}</p>
            )}
            {status === "Отдых" && (
              <p className="text-[30px] text-[#0500ff]">{status}</p>
            )}
            {status === "Финиш" && (
              <p className="text-[30px] text-[#BCEC30]">{status}</p>
            )}
          </>
        ) : (
          <p className="pb-[10px]">Настройка таймера</p>
        )}
      </h3>

      {isStart ? (
        <>
          {status !== "Финиш" && (
            <p
              className="text-[120px] text-center font-[700] opacity-80"
              style={{
                background:
                  "radial-gradient(circle, rgba(0, 179, 255, 0.82), transparent 70%)",
              }}
            >
              {time}
            </p>
          )}
        </>
      ) : (
        <div className="space-y-5">
          {/* Подготовка */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Подготовка:</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                defaultValue={prepTime}
                onChange={(e) => dispatch(setPrepTime(Number(e.target.value)))}
                className="w-16 h-10 bg-gray-50 rounded-xl text-center font-bold focus:ring-2 focus:ring-[#BCEC30] outline-none border border-gray-100"
              />
              <span className="text-[10px] uppercase opacity-40 font-bold w-6">
                сек
              </span>
            </div>
          </div>

          {/* Работа */}
          <div className="flex justify-between items-center">
            <span onClick={handleDeleteWorkTime} className="text-gray-600 ">
              Работа:
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                defaultValue={workTime}
                onChange={(e) => dispatch(setWorkTime(Number(e.target.value)))}
                className="w-16 h-10 bg-gray-50 rounded-xl text-center font-bold focus:ring-2 focus:ring-[#BCEC30] outline-none border border-gray-100"
              />
              <span className="text-[10px] uppercase opacity-40 font-bold w-6">
                сек
              </span>
            </div>
          </div>

          {/* Отдых */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Отдых:</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                defaultValue={restTime}
                onChange={(e) => dispatch(setRestTime(Number(e.target.value)))}
                className="w-16 h-10 bg-gray-50 rounded-xl text-center font-bold focus:ring-2 focus:ring-[#BCEC30] outline-none border border-gray-100"
              />
              <span className="text-[10px] uppercase opacity-40 font-bold w-6">
                сек
              </span>
            </div>
          </div>

          {/* Циклы — отделены чертой и имеют другую подпись */}
          <div className="flex justify-between items-center border-t pt-4 mt-2 mb-[10px]">
            <span className="text-gray-600 font-medium">Циклы:</span>
            <div className="flex items-center gap-2">
              <input
                min={1}
                type="number"
                defaultValue={cycles}
                onChange={(e) => dispatch(setCycles(Number(e.target.value)))}
                className="w-16 h-10 bg-gray-50 rounded-xl text-center font-bold focus:ring-2 focus:ring-[#BCEC30] outline-none border border-gray-100"
              />
            </div>
          </div>
        </div>
      )}

      {isStart ? (
        <>
          <div className="text-[20px] text-center border-t-1 py-[10px]">
            {currentCycle} / {cycles}
          </div>
          <div className="text-center text-[20px] pb-[10px]">
            Время тренировки: <Stopwatch time={workoutTime} />{" "}
          </div>
          <Button onClick={() => dispatch(finishWorkout())} color={"#ec3030"}>
            Завершить тренировку
          </Button>
        </>
      ) : (
        <Button onClick={handleStartWorkout} color={"#BCEC30"}>
          Начать тренировку
        </Button>
      )}
    </div>
  );
};
