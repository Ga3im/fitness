import { useAppSelector } from "../../store/store";
import type { WorkoutStep } from "../../types/types";

type IntervalList = {
  activeStepRef: React.RefObject<HTMLDivElement | null>;
  plan: WorkoutStep[];
};

export const IntervalList = ({ activeStepRef, plan }: IntervalList) => {
  const { currentCycle, isStart, status } = useAppSelector(
    (state) => state.timer
  );

  const activeIndex = plan.findIndex((step) => {
    return (
      isStart &&
      step.type === status &&
      (step.type === "Подготовка" || step.cycle === currentCycle)
    );
  });

  return (
    <div className="lg:col-span-7 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 ml-2">
        <p className="text-[18px] font-bold">План тренировки</p>
        {isStart && (
          <span className="text-xs font-medium px-3 py-1 bg-[#BCEC30] rounded-full animate-pulse">
            В процессе
          </span>
        )}
      </div>

      <div className="flex-1 p-4 bg-white rounded-[40px] shadow-xl border border-gray-50 max-h-[650px] overflow-y-auto custom-scrollbar">
        <div className="space-y-3">
          {plan.map((step, index) => {
            // Условие активности шага
            const isCurrent = index === activeIndex;

            // Условие "пройденного" шага (чтобы затенить старые)
            const isPast = isStart && index < activeIndex;

            return (
              <div
                key={index}
                ref={isCurrent ? activeStepRef : null} // Привязываем реф к активному
                className={`flex items-center justify-between p-5 rounded-[25px] transition-all duration-500 border ${
                  isCurrent
                    ? "bg-[#BCEC30] border-[#BCEC30] shadow-lg shadow-[#BCEC30]/30 translate-x-2 scale-105 z-10" // Активный: яркий и чуть больше
                    : isPast
                    ? "bg-gray-50 border-transparent opacity-40 scale-95" // Пройденный: бледный и меньше
                    : "bg-white border-gray-100 opacity-90" // Будущий: обычный
                }`}
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ${
                      isCurrent
                        ? "bg-white text-black"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>

                  <div>
                    <p
                      className={`font-extrabold text-lg ${
                        isCurrent ? "text-black" : "text-gray-800"
                      }`}
                    >
                      {step.label} {step.cycle && `(Раунд ${step.cycle})`}
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs uppercase font-bold tracking-widest ${
                          isCurrent ? "text-black/60" : "text-gray-400"
                        }`}
                      >
                        {step.duration} секунд
                      </span>
                    </div>
                  </div>
                </div>

                {isCurrent && (
                  <div className="flex flex-col items-end gap-1">
                    <div className="h-3 w-3 bg-white rounded-full animate-ping" />
                    <span className="text-[10px] font-black uppercase text-black/40">
                      Сейчас
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
