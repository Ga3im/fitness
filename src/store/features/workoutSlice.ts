import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { data } from "../../data";
import type { workoutType } from "../../types/types";
import { sortArray } from "../../utils/functions";

type WorkoutStateType = {
  workouts: workoutType[];
  viewWorkout: workoutType | null;
  startedWorkout: workoutType | null;
  workoutTime: number;
  emptyExerciseReps: string[];
  lastOrder: number | null;
  restTimeSets: number;
};

const initialState: WorkoutStateType = {
  workouts: data.workouts.sort((a, b) => sortArray(a.order, b.order)),
  viewWorkout: null,
  startedWorkout: null,
  workoutTime: 0,
  emptyExerciseReps: [],
  lastOrder: Number(sessionStorage.getItem("lastOrder")) ?? 0,
  restTimeSets: 0,
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setWorkouts: (state, action: PayloadAction<workoutType[]>) => {
      let workouts = [...action.payload].sort((a, b) =>
        sortArray(a.order, b.order)
      );
      state.workouts = workouts;
    },
    setStartedWorkout: (state, action: PayloadAction<workoutType | null>) => {
      state.startedWorkout = action.payload;
    },
    setViewWorkout: (state, action: PayloadAction<workoutType | null>) => {
      state.viewWorkout = action.payload;
    },

    //добавление повторения во время тренировки
    setAddExerciseRep: (
      state,
      action: PayloadAction<{ exerciseId: string; currentReps: number }>
    ) => {
      const { exerciseId, currentReps } = action.payload;
      const workout = state.startedWorkout;

      if (workout) {
        const ex = workout.exercises.find((i) => i.id === exerciseId);

        if (ex) {
          if (ex.doneReps === undefined) {
            ex.doneReps = currentReps;
            ex.table = [currentReps];
          } else {
            ex.doneReps += currentReps;
            ex.table?.push(currentReps);
          }

          if (ex.reps && ex.sets && ex.reps * ex.sets <= ex.doneReps) {
            ex.done = true;
          }
        }
      }
    },
    //начать тренировку
    setStartWorkout: (state, action: PayloadAction<workoutType>) => {
      const displayWorkout = action.payload;
      const workout = state.workouts.find((e) => e.id === displayWorkout.id);
      if (workout && state.lastOrder !== null) {
        workout.order = 0;
        state.workouts.sort((a, b) => sortArray(a.order, b.order));
      }
      state.startedWorkout = displayWorkout;
      state.lastOrder = displayWorkout.order;
      state.workoutTime = 0;
      sessionStorage.setItem("lastOrder", String(action.payload));
    },
    //завершить тренировку
    setBreakWorkout: (state, action) => {
      const { id } = action.payload;
      const workout = state.workouts.find((e) => e.id === id);
      if (workout && state.lastOrder !== null) {
        workout.order = state.lastOrder;
        state.workouts.sort((a, b) => sortArray(a.order, b.order));
      }
      state.startedWorkout = null;
      sessionStorage.removeItem("lastOrder");
      state.workoutTime = 0;
    },
    //таймер
    setTickTime: (state) => {
      state.workoutTime += 1;
    },
    // подтверждение веса
    setConfirmWeight: (state, action) => {
      const { reps } = action.payload;
      state.startedWorkout = state.viewWorkout;
      if (state.startedWorkout) {
        state.startedWorkout.needWeight = false;
        state.startedWorkout.exercises.forEach(
          (ex) => ((ex.reps = reps), (ex.sets = 1))
        );
      }
    },
    //вернуться в главное
    setCompleteWorkout: (state, action) => {
      const { id } = action.payload;
      const workout = state.workouts.find((e) => e.id === id);
      if (workout && state.lastOrder !== null) {
        workout.order = state.lastOrder;
        state.workouts.sort((a, b) => sortArray(a.order, b.order));
      }
      state.startedWorkout = null;
    },
    setTimeSets: (state, action) => {
      state.restTimeSets = action.payload;
    },
    setRestTimeSets: (state) => {
      state.restTimeSets = state.restTimeSets - 1;
    },
  },
});

export const {
  setWorkouts,
  setViewWorkout,
  setConfirmWeight,
  setAddExerciseRep,
  setStartedWorkout,
  setBreakWorkout,
  setStartWorkout,
  setTickTime,
  setCompleteWorkout,
  setTimeSets,
  setRestTimeSets,
} = workoutSlice.actions;
export const workoutReducer = workoutSlice.reducer;
