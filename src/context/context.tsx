import { createContext, useEffect, useState } from "react";
import type {
  contextType,
  MyProps,
  userType,
  workoutType,
} from "../types/types";

export const SetContext = createContext<contextType | null>(null);
export const SettingProvider = ({ children }: MyProps) => {
  let [selectedWorkout, setSelectedWorkout] = useState<workoutType | null>(
    null
  );
  const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<userType | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<userType[]>([]);
  const [isStartingWorkout, setIsStartingWorkout] = useState<boolean>(false);
  const [workouts, setWorkouts] = useState<workoutType[]>([]);
  const [workout, setWorkout] = useState<workoutType>({
    id: "",
    description: "",
    order: workouts.length,
    img: "",
    nameRU: "",
    nameEN: "",
    workouts: [],
  });
  const [workoutsId, setWorkoutsId] = useState<string[]>([]);

  const changeWorkouts = (workouts: workoutType[]) => {
    setWorkouts(workouts);
    localStorage.setItem("workouts", JSON.stringify(workouts));
  };

  const changeWorkout = (workout: workoutType) => {
    setWorkout(workout);
    localStorage.setItem("workout", JSON.stringify(workout));
  };

  useEffect(() => {
    const savedSelectedWorkout = localStorage.getItem("selectedExercise");
    const savedUser = localStorage.getItem("user");
    if (savedSelectedWorkout) {
      setSelectedWorkout(JSON.parse(savedSelectedWorkout));
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuth(true);
    }
  }, []);

  const changeAccounts = (newAccount: userType) => {
    const arr = [...accounts, newAccount];
    setAccounts(arr);
    localStorage.setItem("accounts", JSON.stringify(arr));
  };

  const changeUser = (newUser: userType) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const changeSelectedWorkout = (newWorkout: workoutType) => {
    setSelectedWorkout(newWorkout);
    localStorage.setItem("selectedWorkout", JSON.stringify(newWorkout));
  };

  return (
    <SetContext.Provider
      value={{
        selectedWorkout,
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
        changeSelectedWorkout,
        workouts,
        setWorkouts,
        changeWorkouts,
        workout,
        changeWorkout,
        workoutsId,
        setWorkoutsId,
        isStartingWorkout,
        setIsStartingWorkout,
      }}
    >
      {children}
    </SetContext.Provider>
  );
};
