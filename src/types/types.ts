import type { Dispatch, ReactNode, SetStateAction } from "react";

export type MyProps = {
  children?: ReactNode;
};

export type userType = {
  name: string;
  img: string;
  login: string;
  password: string;
  myWorkouts: workoutType[];
};

export type timeType = {
  seconds: number;
  minutes: number;
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
  table?: string[];
};

export type filterProp = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  array: workoutType[];
  setFilteredArray: (arr: workoutType[]) => void;
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

export type WorkoutPropType = {
  i: workoutType;
};

export type ExercisePropType = {
  i: exercisesType;
  emptyReps: string[];
  setEmptyReps: Dispatch<SetStateAction<string[]>>;
};

export type StopwatchropType = {
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
};

export type StartTimeBtnProp = {
  time: number;
};
export type additionalSettingType = {
  isTimeReps: boolean;
  isTimeSets: boolean;
  noSets: string[];
};

export type contextType = {
  selectedWorkout: workoutType | null;
  isOpenProfile: boolean;
  setIsOpenProfile: Dispatch<SetStateAction<boolean>>;
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  user: userType | null;
  setUser: Dispatch<SetStateAction<userType | null>>;
  changeUser: (newUser: userType) => void;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  changeAccounts: (newAccount: userType) => void;
  setAccounts: Dispatch<SetStateAction<userType[]>>;
  changeSelectedWorkout: (newWorkout: workoutType) => void;
  workouts: workoutType[];
  setWorkouts: Dispatch<SetStateAction<workoutType[]>>;
  changeWorkouts: (workouts: workoutType[]) => void;
  workout: workoutType;
  changeWorkout: (workouts: workoutType) => void;
  isStartingWorkout: boolean;
  setIsStartingWorkout: Dispatch<SetStateAction<boolean>>;
  favoriteWorkoutId: string[];
  setFavoriteWorkoutId: Dispatch<SetStateAction<string[]>>;
  additionalSetting: additionalSettingType;
  setAdditionalSetting: Dispatch<SetStateAction<additionalSettingType>>;
};
