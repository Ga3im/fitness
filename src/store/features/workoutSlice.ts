import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { data } from "../../data";
import type { additionalSettingType, workoutType } from "../../types/types";
import { sortArray } from "../../pages/Main";

type WorkoutStateType = {
  workouts: workoutType[];
  viewWorkout: workoutType | null;
  startedWorkout: workoutType | null;
  favoriteWorkoutsId: string[];
  workoutTime: number;
  emptyExerciseReps: string[];
  additionalSetting: additionalSettingType;
};

const initialState: WorkoutStateType = {
  workouts: data.workouts,
  viewWorkout: null,
  startedWorkout: null,
  favoriteWorkoutsId: [],
  workoutTime: 0,
  emptyExerciseReps: [],
  additionalSetting: {
    isTimeReps: false,
    isTimeSets: false,
    noSets: [],
  },
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setWorkouts: (state, action: PayloadAction<workoutType[]>) => {
      let workouts = state.workouts.sort((a, b) => sortArray(a.order, b.order));
      workouts = action.payload;
    },
    setViewWorkout: (state, action: PayloadAction<workoutType | null>) => {
      state.viewWorkout = action.payload;
    },
    setStartedWorkout: (state, action: PayloadAction<workoutType | null>) => {
      state.startedWorkout = action.payload;
    },
    setFavoriteWorkoutsId: (state, action: PayloadAction<string[]>) => {
      state.favoriteWorkoutsId = action.payload;
    },
    setWorkoutTime: (state, action: PayloadAction<number>) => {
      state.workoutTime = action.payload;
    },
    setEmptyExerciseReps: (state, action: PayloadAction<string[]>) => {
      state.emptyExerciseReps = action.payload;
    },
    setAdditionalSetting: (
      state,
      action: PayloadAction<additionalSettingType>
    ) => {
      state.additionalSetting = action.payload;
    },
  },
});

export const {
  setWorkouts,
  setViewWorkout,
  setStartedWorkout,
  setFavoriteWorkoutsId,
  setWorkoutTime,
  setEmptyExerciseReps,
  setAdditionalSetting,
} = workoutSlice.actions;
export const workoutReducer = workoutSlice.reducer;
