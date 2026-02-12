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
  setEmptyReps: Dispatch<SetStateAction<string[]>>;
  workout: workoutType;
  setWorkout: Dispatch<SetStateAction<workoutType>>;
};

export type StopwatchropType = {
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
};

export type StartTimeBtnProp = {
  addRepsBtn: (
    exercise: exercisesType,
    currentReps: number 
  ) => void;
  exercise: exercisesType;
  time: number;
};
export type InputTimeProps = {
  i: exercisesType;
  changeReps: (seconds: number, i: exercisesType) => void;
  focusInput: (exercise: exercisesType) => void;
};

export type FilterProp = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  array: workoutType[] | exercisesType[];
  setFilteredArray: Dispatch<
    SetStateAction<workoutType[] | [] | exercisesType[]>
  >;
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
  startedWorkout: workoutType | null;
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
  changeStartededWorkout: (newWorkout: workoutType) => void;
  workouts: workoutType[];
  setWorkouts: Dispatch<SetStateAction<workoutType[]>>;
  changeWorkouts: (workouts: workoutType[]) => void;
  isStartingWorkout: workoutType | null;
  setIsStartingWorkout: Dispatch<SetStateAction<workoutType | null>>;
  favoriteWorkoutId: string[];
  setFavoriteWorkoutId: Dispatch<SetStateAction<string[]>>;
  additionalSetting: additionalSettingType;
  setAdditionalSetting: Dispatch<SetStateAction<additionalSettingType>>;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  viewWorkout: workoutType | null;
  changeViewWorkout: (workout: workoutType) => void;
  emptyReps: string[];
  setEmptyReps: Dispatch<SetStateAction<string[]>>;
};
