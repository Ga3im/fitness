import { Route, Routes } from "react-router-dom";

import Main from "./pages/Main";
import { router } from "./pages/router";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Profile from "./pages/Profile";
import { CreateWorkout } from "./pages/CreateWorkout";
import WorkoutPage from "./pages/WorkoutPage";

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
    </Routes>
  );
}

export default App;
