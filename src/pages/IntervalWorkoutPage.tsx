import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { useAppDispatch, useAppSelector } from "../store/features/store";
import { setIsFavoriteTabata } from "../store/features/userSlice";
import {  setTickTimer } from "../store/features/timerSlice";
import { setTickTime } from "../store/features/workoutSlice";
import { useEffect, useMemo, useRef } from "react";
import useSound from "use-sound";
import boopSfx from "/sounds/notification.mp3";
import { IntervalList } from "../components/IntervalWorkout/IntervalList";
import { SetIntervalWorkout } from "../components/IntervalWorkout/SetIntervalWorkout";

export const IntervalWorkoutPage = () => {
  const { isAuth, isFavoriteTabata } = useAppSelector(
    (state) => state.userSlice
  );
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
  const [play] = useSound(boopSfx, {
    volume: 0.5,
    playbackRate: 1,
    interrupt: true,
  });

  const HeartIcon = () => (
    <div
      onClick={() => dispatch(setIsFavoriteTabata(!isFavoriteTabata))}
      className="cursor-pointer p-2 transition-transform active:scale-90"
    >
      {isFavoriteTabata ? (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#ef4444">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )}
    </div>
  );

  useEffect(() => {
    let intervalId: any = null;

    if (isStart) {
      // Запускаем интервал только если нажали "Старт"
      intervalId = setInterval(() => {
        dispatch(setTickTimer());
        dispatch(setTickTime());
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isStart, dispatch]);

  useEffect(() => {
    if (time < 4) {
      play();
    }
  }, [time]);

  // Автоскролл к активному шагу
  useEffect(() => {
    if (isStart && activeStepRef.current) {
      activeStepRef.current.scrollIntoView({
        behavior: "smooth", // Плавная анимация
        block: "center", // Центрируем элемент в контейнере
      });
    }
  }, [status, currentCycle, isStart]);

  const plan = useMemo(() => {
    const steps = [];

    // 1. Подготовка
    steps.push({
      label: "Подготовка",
      duration: prepTime,
      type: "Подготовка", // Должно совпадать со state.status
    });

    // 2. Циклы
    for (let i = 1; i <= cycles; i++) {
      steps.push({
        label: "Работа",
        duration: workTime,
        type: "Работа",
        cycle: i,
      });

      if (i < cycles) {
        steps.push({
          label: "Отдых",
          duration: restTime,
          type: "Отдых",
          cycle: i,
        });
      }
    }
    return steps;
  }, [prepTime, workTime, restTime, cycles]);

  const activeStepRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Header />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-10">
        <div
          onClick={() => navigate(-1)}
          className="inline-block text-[16px] opacity-70 py-4 hover:underline cursor-pointer"
        >
          &laquo; Назад
        </div>

        {/* Заголовок и Сердечко */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[24px] sm:text-[32px] font-bold">
            Интервальная тренировка
          </h1>
          {isAuth && <HeartIcon />}
        </div>

        {/* Основной контент: Сетка */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Левая колонка: Таймер и Настройки */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Иконка секундомера */}
            {!isStart && (
              <div className="mb-6 p-4 bg-[#BCEC30]/10 rounded-full">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="13"
                    r="8"
                    stroke="#BCEC30"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 9V13L14.5 15.5"
                    stroke="#BCEC30"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 2H14"
                    stroke="#BCEC30"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 2V5"
                    stroke="#BCEC30"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}

            {/* Карточка настроек */}
            <SetIntervalWorkout />
          </div>

          {/* Правая колонка: Описание */}
          {isStart ? (
            <IntervalList activeStepRef={activeStepRef} plan={plan} />
          ) : (
            <div className="lg:col-span-7">
              <p className="text-[18px] font-bold mb-4 ml-2">Описание:</p>
              <div className="p-6 sm:p-8 bg-white rounded-[30px] shadow-sm border border-gray-100">
                <p className="text-justify leading-relaxed text-gray-700">
                  Интервальная тренировка — это чередование коротких промежутков
                  высокой интенсивности (на пределе возможностей) с периодами
                  отдыха или легкой активности.
                  <br />
                  <br />
                  Она эффективно сжигает жир, улучшает выносливость и экономит
                  время. Основной принцип — пульс поднимается до 85–95% от
                  максимума в активной фазе.
                </p>

                {/* Бейджи с итоговой информацией */}
                <div className="flex flex-wrap gap-3 mt-8">
                  <div className="px-4 py-2 bg-gray-50 rounded-full text-sm font-medium">
                    🔥 {workTime} сек работа
                  </div>
                  <div className="px-4 py-2 bg-gray-50 rounded-full text-sm font-medium">
                    🧘 {restTime} сек отдых
                  </div>
                  <div className="px-4 py-2 bg-[#BCEC30]/20 rounded-full text-sm font-bold text-gray-800">
                    🔄 {cycles} кругов
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
