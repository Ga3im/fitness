import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type WorkoutTimerStateType = {
  prepTime: number;
  workTime: number;
  restTime: number;
  cycles: number;
  time: number;
  isStart: boolean;
  status: string;
  currentCycle: number;
};

const initialState: WorkoutTimerStateType = {
  prepTime: 5,
  workTime: 20,
  restTime: 20,
  cycles: 8,
  time: 0,
  isStart: false,
  status: "",
  currentCycle: 1,
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
      state.status = "Подготовка";
      state.isStart = true;
      state.currentCycle = 1;
      state.time = state.prepTime;
    },
    finishWorkout: (state) => {
      state.status = "";
      state.isStart = false;
    },
    setTickTime: (state) => {
      if (state.time > 0) {
        state.time -= 1;
      }

      // Когда таймер дошел до 0
      if (state.time === 0 && state.isStart) {
        if (state.status === "Подготовка") {
          state.status = "Работа";
          state.time = state.workTime;
        } else if (state.status === "Работа") {
          state.status = "Отдых";
          state.time = state.restTime;
        } else if (state.status === "Отдых") {
          if (state.currentCycle < state.cycles) {
            state.currentCycle += 1;
            state.status = "Работа";
            state.time = state.workTime;
          } else {
            state.status = "Финиш";
          }
        }
      }
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
  setTickTime,
} = timerSlice.actions;
export const timerReduser = timerSlice.reducer;
