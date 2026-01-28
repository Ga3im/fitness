import type { Dispatch, ReactNode, SetStateAction } from "react";

export type MyProps = {
  children?: ReactNode;
};

export type userType = {
  name: string;
  login: string;
  password: string;
  myWorkouts?: workoutType[];
};

export type exercisesType = {
  id: string;
  name: string;
  img: string;
  sets?: number;
  reps?: number;
  doneReps?: number[];
  done: boolean;
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
  workouts: exercisesType[];
  img: string;
};

export type WorkoutPropType = {
  i: workoutType;
};

export type additionalSettingType = {
  isTimeReps: boolean;
  isTimeSets: boolean;
  noSets: boolean;
  noReps: boolean;
};

export type errInfoType = {
  workoutName: boolean;
  exercise: boolean;
  reps: [];
};

export type contextType = {
  selectedWorkout?: workoutType | null;
  isOpenProfile?: boolean;
  setIsOpenProfile?: Dispatch<SetStateAction<boolean>>;
  isAuth?: boolean;
  setIsAuth?: Dispatch<SetStateAction<boolean>>;
  user?: userType | null;
  setUser?: Dispatch<SetStateAction<userType | null>>;
  changeUser?: (newUser: userType) => void;
  error?: string;
  setError?: Dispatch<SetStateAction<string>>;
  isLoading?: boolean;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  changeAccounts?: (newAccount: userType) => void;
  setAccounts?: Dispatch<SetStateAction<userType[]>>;
  changeSelectedWorkout: (newWorkout: workoutType) => void;
  workouts: workoutType[];
  setWorkouts: Dispatch<SetStateAction<workoutType[]>>;
  changeWorkouts: (workouts: workoutType[]) => void;
  workout: workoutType;
  changeWorkout: (workouts: workoutType) => void;
  workoutsId: string[];
  setWorkoutsId: Dispatch<SetStateAction<string[]>>;
  isStartingWorkout: boolean;
  setIsStartingWorkout: Dispatch<SetStateAction<boolean>>;
};
