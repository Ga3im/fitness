import { Route, Routes } from "react-router-dom";

import Main from "./pages/MainPage";
import { router } from "./pages/router";
import { Login } from "./pages/LoginPage";
import { Register } from "./pages/RegisterPage";
import Profile from "./pages/ProfilePage";
import { CreateWorkout } from "./pages/CreateWorkoutPage";
import WorkoutPage from "./pages/WorkoutPage";
import { IntervalWorkoutPage } from "./pages/IntervalWorkoutPage";

function App() {
  return (
    <Routes>
      <Route path={router.main} element={<Main />}>
        <Route path={router.login} element={<Login />} />
        <Route path={router.register} element={<Register />} />
      </Route>
      <Route path={router.profile} element={<Profile />} />
      <Route path={router.createWorkout} element={<CreateWorkout />} />
      <Route path={router.workouts} element={<WorkoutPage />} />
      <Route path={router.timerWorkout} element={<IntervalWorkoutPage />} />
    </Routes>
  );
}

export default App;
