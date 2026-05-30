import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setTickTimer } from "../store/features/timerSlice";
import { setIsFavoriteTabata, setTickTime } from "../store/features/workoutSlice";
import { useEffect, useMemo, useRef } from "react";
import useSound from "use-sound";
import boopSfx from "/sounds/notification.mp3";
import { SetIntervalWorkout } from "../components/IntervalWorkout/SetIntervalWorkout";

export const IntervalWorkoutPage = () => {
  const {  isFavoriteTabata } = useAppSelector((state) => state.workoutSlice);
  const {
    prepTime,
    workTime,
    restTime,
    cycles,
    currentCycle,
    time,
    isStart,
    status,
  } = useAppSelector((state) => state.timer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [play] = useSound(boopSfx, { volume: 0.5, interrupt: true });

  const activeStepRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let intervalId: any = null;
    if (isStart) {
      intervalId = setInterval(() => {
        dispatch(setTickTimer());
        dispatch(setTickTime());
      }, 1000);
    }
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [isStart, dispatch]);

  useEffect(() => {
    if (time < 4 && isStart && status !== "Ожидание" && status !== "Финиш") {
      play();
    }
  }, [time, isStart, status, play]);

  // Скроллим горизонтальную ленту к активному шагу
  useEffect(() => {
    if (isStart && activeStepRef.current) {
      activeStepRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center", // Центрируем шаг по горизонтали
      });
    }
  }, [status, currentCycle, isStart]);

  // Генерируем плоский массив шагов для ленты
  const plan = useMemo(() => {
    const steps = [];
    if (prepTime > 0) {
      steps.push({ label: "Подготовка", duration: prepTime, type: "Подготовка" });
    }
    for (let i = 1; i <= cycles; i++) {
      steps.push({
        label: workTime === 0 ? "Подход" : "Работа",
        duration: workTime,
        type: "Работа",
        cycle: i,
      });
      if (i < cycles) {
        steps.push({
          label: restTime === 0 ? "Отдых" : "Отдых",
          duration: restTime,
          type: "Отдых",
          cycle: i,
        });
      }
    }
    return steps;
  }, [prepTime, workTime, restTime, cycles]);

  // Индекс текущего активного шага в массиве
  const activeIndex = useMemo(() => {
    return plan.findIndex((step) => {
      if (status === "Подготовка" && step.type === "Подготовка") return true;
      if (step.type === status && step.cycle === currentCycle) return true;
      // Если мы в ожидании, подсвечиваем шаг, который наступит (из логики вашего слайса)
      if (status === "Ожидание") {
        if (step.cycle === currentCycle) {
          if (step.type === "Работа" && workTime === 0) return true;
          if (step.type === "Отдых" && restTime === 0) return true;
        }
      }
      return false;
    });
  }, [plan, status, currentCycle, workTime, restTime]);

  const HeartIcon = () => (
    <div onClick={() => dispatch(setIsFavoriteTabata(!isFavoriteTabata))} className="cursor-pointer p-2">
      {isFavoriteTabata ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
      )}
    </div>
  );

  return (
    <>
      <Header />
      <div className="max-w-[400px] mx-auto px-4 pb-6 flex flex-col min-h-[calc(100vh-70px)] justify-between">
        <div>
          {/* Навигация и заголовок */}
          <div className="flex items-center justify-between mt-2 mb-4">
            <div onClick={() => navigate(-1)} className="text-sm opacity-60 cursor-pointer hover:underline">
              &laquo; Назад
            </div>
            {/* {isAuth && <HeartIcon />} */}
          </div>

          <h1 className="text-xl font-bold text-center mb-4">Интервальный таймер</h1>

          {/* КОМПАКТНАЯ ГОРЗОНТАЛЬНАЯ ЛЕНТА ШАГОВ (ТОЛЬКО ПРИ СТАРТЕ) */}
          {isStart && status !== "Финиш" && (
            <div className="w-full overflow-x-hidden mb-4 bg-gray-50 p-2.5 rounded-2xl border border-gray-100/80">
              <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth snap-x">
                {plan.map((step, idx) => {
                  const isActive = idx === activeIndex;
                  const isPassed = idx < activeIndex;

                  let bgColor = "bg-white text-gray-400";
                  if (isActive) {
                    if (step.type === "Работа") bgColor = "bg-red-500 text-white shadow-sm ring-2 ring-red-300";
                    else if (step.type === "Отдых") bgColor = "bg-blue-500 text-white shadow-sm ring-2 ring-blue-300";
                    else bgColor = "bg-amber-500 text-white shadow-sm";
                  } else if (isPassed) {
                    bgColor = "bg-gray-200 text-gray-400 opacity-40";
                  }

                  return (
                    <div
                      key={idx}
                      ref={isActive ? activeStepRef : null}
                      className={`snap-center shrink-0 min-w-[75px] h-[46px] rounded-xl flex flex-col justify-center items-center text-[10px] font-bold transition-all duration-300 ${bgColor}`}
                    >
                      <span className="uppercase tracking-tight text-[9px]">
                        {step.label}
                      </span>
                      <span className="text-[11px]">
                        {step.duration === 0 ? "Вручную" : `${step.duration}с`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ТАЙМЕР ОСТАЕТСЯ ГЛАВНЫМ ЦЕНТРОМ */}
          <div className="flex justify-center w-full">
            <SetIntervalWorkout />
          </div>
        </div>

        {/* Описание показываем только в режиме настроек, в самом низу */}
        {!isStart && (
          <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100 mt-4 text-xs text-gray-600 leading-relaxed">
            <strong className="text-gray-800 block mb-1">Интервальная тренировка:</strong>
            Чередование высокой интенсивности с периодами отдыха. Сжигает жир и развивает выносливость.
          </div>
        )}
      </div>
    </>
  );
};
