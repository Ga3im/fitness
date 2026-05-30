import { Route, Routes } from "react-router-dom";

import Main from "./pages/MainPage";
import { router } from "./pages/router";
import { CreateWorkout } from "./pages/CreateWorkoutPage";
import WorkoutPage from "./pages/WorkoutPage";
import { IntervalWorkoutPage } from "./pages/IntervalWorkoutPage";
import FavoriteWorkoutsPage from "./pages/FavoriteWorkoutsPage";

function App() {
  return (
    <Routes>
      <Route path={router.main} element={<Main />} />
      <Route
        path={router.favoriteWorkouts}
        element={<FavoriteWorkoutsPage />}
      />
      <Route path={router.createWorkout} element={<CreateWorkout />} />
      <Route path={router.workouts} element={<WorkoutPage />} />
      <Route path={router.timerWorkout} element={<IntervalWorkoutPage />} />
    </Routes>
  );
}

export default App;
