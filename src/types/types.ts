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
  static?: boolean;
  done?: boolean;
  table?: number[];
  timeBtwnSets?: number;
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
  needWeight?: boolean;
};

export type addTimeType = {
  minutes: number;
  seconds: number;
};

export type StopwatchropType = {
  time: number;
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

export type contextType = {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  user: userType | null;
  changeUser: (newUser: userType) => void;
};

export interface WorkoutStep {
  label: string;
  duration: number;
  type: string;
  cycle?: number;
}
