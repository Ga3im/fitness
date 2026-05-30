import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import type { workoutType } from "../types/types";
import { WorkoutCard } from "../components/Workout/WorkoutCard";
import { BottomBtn } from "../components/BottomBtn";
import { useAppSelector } from "../store/store";
import { FilterWorkout } from "../components/Workout/FilterWorkout";
import { TabataTimerSettings } from "../components/IntervalWorkout/TabataTimer";

export default function FavoriteWorkoutsPage() {
  const { favoriteWorkouts, isFavoriteTabata } = useAppSelector(
    (state) => state.workoutSlice
  );
  const [search, setSearch] = useState<string>("");
  const [filteredCourses, setFilteredCourses] = useState<workoutType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const arr: workoutType[] = [];
    favoriteWorkouts?.map((i: workoutType) => {
      if (i.nameRU.toLowerCase().includes(search.toLowerCase())) {
        arr.push(i);
      }
    });
    setFilteredCourses(arr);
  }, [search]);

  const backBtn = () => {
    navigate(-1);
  };

  const handleToTopBtn = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Outlet />
      <Header />

      <div className="px-[16px] pb-[20px]">
        <div
          onClick={backBtn}
          className="text-[16px] opacity-[0.7] pb-[5px] hover:underline cursor-pointer"
        >
          &laquo; Назад
        </div>
        <h1 className="pb-[15px] text-[20px] font-medium leading-none">
          Избранные тренировки
        </h1>
        <FilterWorkout
          search={search}
          setSearch={setSearch}
          array={favoriteWorkouts}
          setFilteredArray={setFilteredCourses}
        />
        <div className="pt-[20px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4">
          {isFavoriteTabata && <TabataTimerSettings />}
          {search === "" && favoriteWorkouts?.length > 0
            ? favoriteWorkouts.map((i) => <WorkoutCard workout={i} />)
            : filteredCourses.map((i) => <WorkoutCard workout={i} />)}
        </div>
        <BottomBtn onClick={handleToTopBtn} btnText={<p>Наверх &#8593;</p>} />
      </div>
    </>
  );
}
