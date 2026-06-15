import { useEffect } from "react"; // 1. Импортируем useEffect
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./store/store"; // 2. Импортируем ваш хук (проверьте путь к store)

import Main from "./pages/MainPage";
import { router } from "./pages/router";
import { CreateWorkout } from "./pages/CreateWorkoutPage";
import WorkoutPage from "./pages/WorkoutPage";
import { IntervalWorkoutPage } from "./pages/IntervalWorkoutPage";
import FavoriteWorkoutsPage from "./pages/FavoriteWorkoutsPage";

function App() {
  // 3. Достаем текущую тему из Redux
  const { theme } = useAppSelector((state) => state.setting);

  // 4. Синхронизируем тему с тегом <html> сайта
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "night") {
      root.classList.add("dark"); // Tailwind v4 увидит это и включит все классы dark:
    } else {
      root.classList.remove("dark");
    }
  }, [theme]); // Эффект будет срабатывать каждый раз, когда вы жмете на кнопочку

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
