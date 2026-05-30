import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  finishWorkout,
  setCycles,
  setPrepTime,
  setRestTime,
  setWorkoutTime,
  setWorkTime,
  startWorkout,
  nextStep,
  skipCurrentStep,
  restartCurrentStep,
} from "../../store/features/timerSlice";
import { Button } from "../Button";
import { Stopwatch } from "../Stopwatch";

export const SetIntervalWorkout = () => {
  const {
    currentCycle,
    isStart,
    time,
    prepTime,
    workTime,
    restTime,
    cycles,
    status,
    nextStatus,
  } = useAppSelector((state) => state.timer);
  const dispatch = useAppDispatch();

  const handleStartWorkout = () => {
    dispatch(setWorkoutTime(0));
    dispatch(startWorkout());
  };

  const handleToggleWorkTime = () => {
    dispatch(setWorkTime(workTime > 0 ? 0 : 20));
  };

  const handleToggleRestTime = () => {
    dispatch(setRestTime(restTime > 0 ? 0 : 20));
  };

  // Проверяем, можно ли сейчас нажимать стрелки скипа/перезапуска
  const showControls = isStart && status !== "Финиш" && status !== "Ожидание";

  return (
    <div className="bg-white p-6 rounded-[30px] shadow-lg w-full max-w-[360px] border border-gray-50">
      <div className="text-center font-bold opacity-50 uppercase text-xs tracking-widest min-h-[40px] flex items-center justify-center">
        {isStart ? (
          <div className="flex items-center justify-between w-full px-2">
            {/* Кнопка "Назад" (Перезапуск текущего этапа) */}
            <button
              disabled={!showControls}
              onClick={() => dispatch(restartCurrentStep())}
              className={`p-1.5 rounded-lg transition-all active:scale-95 ${
                showControls ? "opacity-60 hover:opacity-100 hover:bg-gray-100 text-black cursor-pointer" : "opacity-0 pointer-events-none"
              }`}
              title="Перезапустить этап сначала"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 19l-7-7 7-7M19 19l-7-7 7-7"/>
              </svg>
            </button>

            {/* Текст статуса */}
            <div>
              {status === "Подготовка" && <p className="text-[26px] low-case">{status}</p>}
              {status === "Работа" && <p className="text-[26px] text-[#ff0000]">{status}</p>}
              {status === "Отдых" && <p className="text-[26px] text-[#0500ff]">{status}</p>}
              {status === "Финиш" && <p className="text-[26px] text-[#BCEC30]">{status}</p>}
              {status === "Ожидание" && (
                <p className="text-[20px] text-amber-500 normal-case tracking-normal">
                  {nextStatus === "Работа" ? "Выполните подход" : "Отдохните"}
                </p>
              )}
            </div>

            {/* Кнопка "Вперед" (Пропустить / Скипнуть этап) */}
            <button
              disabled={!showControls}
              onClick={() => dispatch(skipCurrentStep())}
              className={`p-1.5 rounded-lg transition-all active:scale-95 ${
                showControls ? "opacity-60 hover:opacity-100 hover:bg-gray-100 text-black cursor-pointer" : "opacity-0 pointer-events-none"
              }`}
              title="Пропустить оставшееся время"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        ) : (
          <p className="pb-[10px]">Настройка таймера</p>
        )}
      </div>

      {isStart ? (
        <div className="min-h-[160px] flex flex-col justify-center items-center">
          {status !== "Финиш" && (
            <>
              {status === "Ожидание" ? (
                <div className="text-center space-y-3 px-2">
                  <p className="text-gray-400 text-xs font-medium leading-relaxed">
                    {nextStatus === "Работа" 
                      ? "Как закончите упражнение, нажмите кнопку" 
                      : "Как будете готовы к работе, нажмите кнопку"}
                  </p>
                  <button
                    onClick={() => dispatch(nextStep())}
                    className="px-8 py-3.5 bg-[#BCEC30] text-black font-bold text-lg rounded-2xl shadow-md hover:scale-105 active:scale-95 transition-all uppercase tracking-wider"
                  >
                    Далее ➡️
                  </button>
                </div>
              ) : (
                <p
                  className="text-[120px] text-center font-bold opacity-80 select-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(0, 179, 255, 0.82), transparent 70%)",
                  }}
                >
                  {time}
                </p>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="space-y-5">
          {/* Настройки Подготовка */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Подготовка:</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={prepTime}
                onChange={(e) => dispatch(setPrepTime(Number(e.target.value)))}
                className="w-16 h-10 bg-gray-50 rounded-xl text-center font-bold focus:ring-2 focus:ring-[#BCEC30] outline-none border border-gray-100"
              />
              <span className="text-[10px] uppercase opacity-40 font-bold w-6">сек</span>
            </div>
          </div>

          {/* Настройки Работа */}
          <div className={`flex justify-between items-center transition-opacity duration-200 ${workTime === 0 ? "opacity-40" : ""}`}>
            <span 
              onClick={handleToggleWorkTime} 
              className={`text-gray-600 cursor-pointer select-none hover:underline ${workTime === 0 ? "line-through text-red-500" : ""}`}
            >
              {workTime === 0 ? "Без работы (вручную)" : "Работа:"}
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={workTime}
                disabled={workTime === 0}
                onChange={(e) => dispatch(setWorkTime(Number(e.target.value)))}
                className="w-16 h-10 bg-gray-50 rounded-xl text-center font-bold focus:ring-2 focus:ring-[#BCEC30] outline-none border border-gray-100"
              />
              <span className="text-[10px] uppercase opacity-40 font-bold w-6">сек</span>
            </div>
          </div>

          {/* Настройки Отдых */}
          <div className={`flex justify-between items-center transition-opacity duration-200 ${restTime === 0 ? "opacity-40" : ""}`}>
            <span 
              onClick={handleToggleRestTime} 
              className={`text-gray-600 cursor-pointer select-none hover:underline ${restTime === 0 ? "line-through text-blue-500" : ""}`}
            >
              {restTime === 0 ? "Без отдыха (вручную)" : "Отдых:"}
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={restTime}
                disabled={restTime === 0}
                onChange={(e) => dispatch(setRestTime(Number(e.target.value)))}
                className="w-16 h-10 bg-gray-50 rounded-xl text-center font-bold focus:ring-2 focus:ring-[#BCEC30] outline-none border border-gray-100"
              />
              <span className="text-[10px] uppercase opacity-40 font-bold w-6">сек</span>
            </div>
          </div>

          {/* Настройки Циклы */}
          <div className="flex justify-between items-center border-t pt-4 mt-2 mb-[10px]">
            <span className="text-gray-600 font-medium">Циклы:</span>
            <div className="flex items-center gap-2">
              <input
                min={1}
                type="number"
                value={cycles}
                onChange={(e) => dispatch(setCycles(Number(e.target.value)))}
                className="w-16 h-10 bg-gray-50 rounded-xl text-center font-bold focus:ring-2 focus:ring-[#BCEC30] outline-none border border-gray-100"
              />
            </div>
          </div>
        </div>
      )}

      {isStart ? (
        <>
          <div className="text-[20px] text-center border-t border-gray-100 py-[10px]">
            {currentCycle} / {cycles}
          </div>
          <div className="text-center text-[20px] pb-[10px]">
            Время тренировки: <Stopwatch />{" "}
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
