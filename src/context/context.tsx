import { createContext, useEffect, useState } from "react";
import type {
  additionalSettingType,
  contextType,
  MyProps,
  userType,
  workoutType,
} from "../types/types";

export const SetContext = createContext<contextType | undefined>(undefined);
export const SettingProvider = ({ children }: MyProps) => {
  let [startedWorkout, setStartedWorkout] = useState<workoutType | null>(null);
  const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<userType | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<userType[]>([]);
  const [isStartingWorkout, setIsStartingWorkout] =
    useState<workoutType | null>(null);
  const [workouts, setWorkouts] = useState<workoutType[]>([]);
  let [time, setTime] = useState<number>(0);
  const [viewWorkout, setViewWorkout] = useState<workoutType | null>(null);
  const [emptyReps, setEmptyReps] = useState<string[]>([]);

  let interval: number;

  const [favoriteWorkoutId, setFavoriteWorkoutId] = useState<string[]>([]);
  const [additionalSetting, setAdditionalSetting] =
    useState<additionalSettingType>({
      isTimeReps: false,
      isTimeSets: false,
      noSets: [],
    });

  const changeWorkouts = (workouts: workoutType[]) => {
    setWorkouts(workouts);
    localStorage.setItem("workouts", JSON.stringify(workouts));
  };

  const changeViewWorkout = (workout: workoutType) => {
    setViewWorkout(workout);
    localStorage.setItem("viewWorkout", JSON.stringify(workout));
  };

  useEffect(() => {
    const savedStartedWorkout = localStorage.getItem("startedWorkout");
    if (savedStartedWorkout) {
      changeStartededWorkout(JSON.parse(savedStartedWorkout));
    }
  }, []);

  useEffect(() => {
    const savedWorkouts = localStorage.getItem("workouts");
    if (savedWorkouts) {
      changeWorkouts(JSON.parse(savedWorkouts));
    }
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuth(true);
    }
  }, []);

  const changeAccounts = (newAccount: userType): void => {
    const arr = [...accounts, newAccount];
    setAccounts(arr);
    localStorage.setItem("accounts", JSON.stringify(arr));
  };

  const changeUser = (newUser: userType): void => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  useEffect(() => {
    const arr: string[] = [];
    if (isAuth && user) {
      user.myWorkouts.map((i: workoutType) => {
        arr.push(i.id);
      });
    }
    setFavoriteWorkoutId(arr);
  }, [user]);

  useEffect(() => {
    interval = setInterval(() => {
      setTime(time++);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const changeStartededWorkout = (newWorkout: workoutType) => {
    setStartedWorkout(newWorkout);
    localStorage.setItem("startedWorkout", JSON.stringify(newWorkout));
  };

  return (
    <SetContext.Provider
      value={{
        startedWorkout,
        isOpenProfile,
        setIsOpenProfile,
        isAuth,
        setIsAuth,
        user,
        setUser,
        changeUser,
        setAccounts,
        error,
        setError,
        isLoading,
        setIsLoading,
        changeAccounts,
        changeStartededWorkout,
        workouts,
        setWorkouts,
        changeWorkouts,
        isStartingWorkout,
        setIsStartingWorkout,
        favoriteWorkoutId,
        setFavoriteWorkoutId,
        additionalSetting,
        setAdditionalSetting,
        time,
        setTime,
        viewWorkout,
        changeViewWorkout,
        emptyReps,
        setEmptyReps,
      }}
    >
      {children}
    </SetContext.Provider>
  );
};
