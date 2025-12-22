import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { data } from "../data";
import type { coursesType } from "../pages/Main";

export type contextType = {
  selectedCourse?: coursesType | null;
  changeSelectedCourse?: (newCourse: coursesType) => void;
  progress?: number;
  setProgress?: Dispatch<SetStateAction<number>>;
  isOpenProfile?: boolean;
  setIsOpenProfile?: Dispatch<SetStateAction<boolean>>;
  isAuth?: boolean;
  setIsAuth?: Dispatch<SetStateAction<boolean>>;
  user?: userType | null;
  setUser?: Dispatch<SetStateAction<userType | null>>;
  changeUser?: (newUser: userType) => void;
  workout?: workoutType[];
  error?: string;
  setError?: Dispatch<SetStateAction<string>>;
  isLoading?: boolean;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  changeAccounts?: (newAccount: userType) => void;
  setAccounts?: Dispatch<SetStateAction<userType[]>>;
  selectedWorkout: workoutType | null;
  setSelectedWorkout: Dispatch<SetStateAction<workoutType | null>>;
  changeSelectedWorkout: (newWorkout: workoutType) => void;
};

type MyProps = {
  children?: ReactNode;
};

type exercisesType = {
  name: string;
  quantity: number;
};

export type workoutType = {
  _id: string;
  name: string;
  video: string;
  exercises?: exercisesType[];
};

export type userType = {
  name: string;
  login: string;
  password: string;
  myCourses?: coursesType[];
};

export const SetContext = createContext<contextType | null>(null);
export const SettingProvider = ({ children }: MyProps) => {
  let [selectedCourse, setSelectedCourse] = useState<coursesType | null>(null);
  const [progress, setProgress] = useState<number>(1);
  const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<userType | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<userType[]>([]);
  const workout: workoutType[] = data.workouts;
  const [selectedWorkout, setSelectedWorkout] = useState<workoutType | null>(
    null
  );

  const changeSelectedCourse = (newCourse: coursesType) => {
    localStorage.setItem("selectedCourse", JSON.stringify(newCourse));
    setSelectedCourse(newCourse);
  };

  useEffect(() => {
    const savedSelectedWorkout = localStorage.getItem("selectedWorkout");
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
        selectedCourse,
        changeSelectedCourse,
        progress,
        setProgress,
        isOpenProfile,
        setIsOpenProfile,
        isAuth,
        setIsAuth,
        user,
        setUser,
        changeUser,
        setAccounts,
        workout,
        error,
        setError,
        isLoading,
        setIsLoading,
        changeAccounts,
        selectedWorkout,
        changeSelectedWorkout,
      }}
    >
      {children}
    </SetContext.Provider>
  );
};
