import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type WorkoutTimerStateType = {
  prepTime: number;
  workTime: number;
  restTime: number;
  cycles: number;
  time: number;
  isStart: boolean;
  status: string; // "Подготовка" | "Работа" | "Отдых" | "Ожидание" | "Финиш"
  nextStatus: string; // Запоминаем, какая фаза должна быть ПОСЛЕ ожидания
  currentCycle: number;
  workoutTime: number;
};

const initialState: WorkoutTimerStateType = {
  prepTime: 5,
  workTime: 20,
  restTime: 20,
  cycles: 8,
  time: 0,
  isStart: false,
  status: "",
  nextStatus: "",
  currentCycle: 1,
  workoutTime: 0,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setPrepTime: (state, action: PayloadAction<number>) => {
      state.prepTime = action.payload;
    },
    setWorkTime: (state, action: PayloadAction<number>) => {
      state.workTime = action.payload;
    },
    setRestTime: (state, action: PayloadAction<number>) => {
      state.restTime = action.payload;
    },
    setCycles: (state, action: PayloadAction<number>) => {
      state.cycles = action.payload;
    },
    startWorkout: (state) => {
      state.isStart = true;
      state.currentCycle = 1;

      // Если подготовка 0, сразу смотрим, куда идти
      if (state.prepTime === 0) {
        if (state.workTime === 0) {
          state.status = "Ожидание";
          state.nextStatus = "Работа";
          state.time = 0;
        } else {
          state.status = "Работа";
          state.time = state.workTime;
        }
      } else {
        state.status = "Подготовка";
        state.time = state.prepTime;
      }
    },
    finishWorkout: (state) => {
      state.status = "";
      state.isStart = false;
    },
    setTickTimer: (state) => {
      // Если мы в режиме ручного ожидания или финиша, время не уменьшаем
      if (state.status === "Ожидание" || state.status === "Финиш") {
        return;
      }

      if (state.time > 0) {
        state.time -= 1;
      }

      // Логика смены фаз при достижении нуля
      if (state.time === 0 && state.isStart) {
        if (state.status === "Подготовка") {
          if (state.workTime === 0) {
            state.status = "Ожидание";
            state.nextStatus = "Работа"; // Ждем клика, чтобы засчитать "сделанный подход"
          } else {
            state.status = "Работа";
            state.time = state.workTime;
          }
        } else if (state.status === "Работа") {
          if (state.restTime === 0) {
            state.status = "Ожидание";
            state.nextStatus = "Отдых"; // Ждем клика, чтобы завершить "отдых" вручную
          } else {
            state.status = "Отдых";
            state.time = state.restTime;
          }
        } else if (state.status === "Отдых") {
          if (state.currentCycle < state.cycles) {
            state.currentCycle += 1;
            if (state.workTime === 0) {
              state.status = "Ожидание";
              state.nextStatus = "Работа";
            } else {
              state.status = "Работа";
              state.time = state.workTime;
            }
          } else {
            state.status = "Финиш";
          }
        }
      }
    },
    // Экшен ручного перехода для кнопки "Далее"
    nextStep: (state) => {
      if (state.status !== "Ожидание") return;

      // Если нажали Далее после завершения работы (когда отдыха нет)
      if (state.nextStatus === "Отдых") {
        if (state.currentCycle < state.cycles) {
          state.currentCycle += 1;
          // Проверяем, активна ли следующая работа
          if (state.workTime === 0) {
            state.status = "Ожидание";
            state.nextStatus = "Работа";
          } else {
            state.status = "Работа";
            state.time = state.workTime;
          }
        } else {
          state.status = "Финиш";
        }
      }
      // Если нажали Далее во время работы (когда работы нет, только отдых)
      else if (state.nextStatus === "Работа") {
        if (state.restTime === 0) {
          // Если и отдыха нет (только ручные переключения циклов)
          if (state.currentCycle < state.cycles) {
            state.currentCycle += 1;
            state.status = "Ожидание";
            state.nextStatus = "Работа";
          } else {
            state.status = "Финиш";
          }
        } else {
          state.status = "Отдых";
          state.time = state.restTime;
        }
      }
    },
    setWorkoutTime: (state, action) => {
      state.workoutTime = action.payload;
    },
    skipCurrentStep: (state) => {
      if (
        !state.isStart ||
        state.status === "Финиш" ||
        state.status === "Ожидание"
      )
        return;

      // Принудительно ставим время в 0
      state.time = 0;

      // Вызываем внутренний метод переключения фаз, чтобы не ждать следующей секунды интервала
      // Скопируем сюда логику переключения из setTickTimer для мгновенного срабатывания:
      if (state.status === "Подготовка") {
        if (state.workTime === 0) {
          state.status = "Ожидание";
          state.nextStatus = "Работа";
        } else {
          state.status = "Работа";
          state.time = state.workTime;
        }
      } else if (state.status === "Работа") {
        if (state.restTime === 0) {
          state.status = "Ожидание";
          state.nextStatus = "Отдых";
        } else {
          state.status = "Отдых";
          state.time = state.restTime;
        }
      } else if (state.status === "Отдых") {
        if (state.currentCycle < state.cycles) {
          state.currentCycle += 1;
          if (state.workTime === 0) {
            state.status = "Ожидание";
            state.nextStatus = "Работа";
          } else {
            state.status = "Работа";
            state.time = state.workTime;
          }
        } else {
          state.status = "Финиш";
        }
      }
    },

    restartCurrentStep: (state) => {
      if (
        !state.isStart ||
        state.status === "Финиш" ||
        state.status === "Ожидание"
      )
        return;

      // Возвращаем исходное время текущего этапа
      if (state.status === "Подготовка") state.time = state.prepTime;
      if (state.status === "Работа") state.time = state.workTime;
      if (state.status === "Отдых") state.time = state.restTime;
    },
  },
});

export const {
  setPrepTime,
  setWorkTime,
  setRestTime,
  setCycles,
  startWorkout,
  finishWorkout,
  setTickTimer,
  setWorkoutTime,
  nextStep,
  skipCurrentStep,
  restartCurrentStep,
} = timerSlice.actions;
export const timerReducer = timerSlice.reducer;
