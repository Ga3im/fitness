import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
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
  error?: string;
  setError?: Dispatch<SetStateAction<string>>;
  isLoading?: boolean;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  changeAccounts?: (newAccount: userType) => void;
  setAccounts?: Dispatch<SetStateAction<userType[]>>;
  selectedWorkout: workoutType | null;
  setSelectedWorkout: Dispatch<SetStateAction<workoutType | null>>;
  changeSelectedWorkout: (newWorkout: workoutType) => void;
  courses: coursesType[];
  setCourses: Dispatch<SetStateAction<coursesType[]>>;
  changeCourses: (courses: contextType[]) => void;
  workout: customWorkoutType;
  setWorkout: Dispatch<SetStateAction<customWorkoutType>>;
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

type customWorkoutType = {
  _id: string;
  order: number;
  img: string;
  nameRU: string;
  nameEN: string;
  selectedExercise: exercisesType[] | [];
  sets: number;
  setsTime: number;
  reps: number;
  repsTime: number;
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
  const [selectedWorkout, setSelectedWorkout] = useState<workoutType | null>(
    null
  );
  const [courses, setCourses] = useState<coursesType[]>([]);
  const [workout, setWorkout] = useState<customWorkoutType>({
    _id: "",
    order: 10,
    img: "",
    nameRU: "",
    nameEN: "",
    selectedExercise: [],
    sets: 1,
    setsTime: 0,
    reps: 0,
    repsTime: 0,
  });

  const changeSelectedCourse = (newCourse: coursesType) => {
    localStorage.setItem("selectedCourse", JSON.stringify(newCourse));
    setSelectedCourse(newCourse);
  };

  const changeCourses = (courses: coursesType[]) => {
    setCourses(courses);
    localStorage.setItem("courses", JSON.stringify(courses));
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
        error,
        setError,
        isLoading,
        setIsLoading,
        changeAccounts,
        selectedWorkout,
        changeSelectedWorkout,
        courses,
        setCourses,
        changeCourses,
        workout,
        setWorkout,
      }}
    >
      {children}
    </SetContext.Provider>
  );
};
