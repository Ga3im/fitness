import type { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export type MyProps = {
  children?: ReactNode;
};

export type userType = {
  name: string;
  img?: string;
  login: string;
  password: string;
  myWorkouts: workoutType[];
};

export type exercisesType = {
  id: string;
  name: string;
  img: string;
  sets?: number;
  reps?: number;
  doneReps?: number;
  done?: boolean;
  static?: boolean;
  table?: number[];
};


export type workoutType = {
  id: string;
  description: string;
  nameEN: string;
  nameRU: string;
  order: number;
  exercises: exercisesType[];
  img: string;
  custom?: boolean;
  timeLimit?: number;
  challenge?: boolean;
  needWeight?: boolean;
};

export type addTimeType = {
  minutes: number;
  seconds: number;
};

export type WorkoutPropType = {
  i: workoutType;
};

export type ExercisePropType = {
  i: exercisesType;
  emptyReps: string[];
  setEmptyReps: ActionCreatorWithPayload<string[]>;
  workout: workoutType;
  setWorkout: Dispatch<SetStateAction<workoutType>>;
};

export type StopwatchropType = {
  time: number;
};

export type StartTimeBtnProp = {
  addRepsBtn: (exercise: exercisesType, currentReps: number) => void;
  exercise: exercisesType;
  time: number;
};
export type InputTimeProps = {
  i: exercisesType;
  changeReps: (seconds: number, i: exercisesType) => void;
  focusInput: (exercise: exercisesType) => void;
};

export type FilterExerciseProp = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  array: exercisesType[];
  setFilteredArray: Dispatch<SetStateAction<exercisesType[]>>;
};

export type FilterWorkoutProp = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  array: workoutType[];
  setFilteredArray: Dispatch<SetStateAction<workoutType[]>>;
};

export type BottomBtnProp = {
  onClick: () => void;
  btnText: React.ReactElement | string;
};

export type ConfirmProp = {
  text: string;
  noBtn: () => void;
  yesBtn: () => void;
};

export type additionalSettingType = {
  isTimeReps: boolean;
  isTimeSets: boolean;
  noSets: string[];
};

export type contextType = {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  user: userType | null;
  changeUser: (newUser: userType) => void;
};
