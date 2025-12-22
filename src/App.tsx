import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import { router } from "./pages/router";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Profile from "./pages/Profile";
import Course from "./pages/Courses";
import { Workout } from "./pages/Workout";
import { SelectWorkout } from "./pages/SelectWorkout";
import { Progress } from "./pages/Progress";

function App() {
  return (
    <Routes>
      <Route path={router.main} element={<Main />}>
        <Route path={router.login} element={<Login />} />
        <Route path={router.register} element={<Register />} />
        <Route path={router.selectWorkout} element={<SelectWorkout />} />
      </Route>
      <Route path={router.profile} element={<Profile />} />
      <Route path={router.courses} element={<Course />} />
      <Route path={router.workout} element={<Workout />}>
        <Route path={router.workoutFilling} element={<Progress />} />
      </Route>
    </Routes>
  );
}

export default App;
