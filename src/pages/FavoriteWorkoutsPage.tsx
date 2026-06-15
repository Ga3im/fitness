import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import type { workoutType } from "../types/types";
import { WorkoutCard } from "../components/Workout/WorkoutCard";
import { BottomBtn } from "../components/BottomBtn";
import { useAppSelector } from "../store/store";
import { FilterWorkout } from "../components/Workout/FilterWorkout";
import { TabataTimerSettings } from "../components/IntervalWorkout/TabataTimer";
import { BackBtn } from "../components/BackBtn";
import { router } from "./router";

export default function FavoriteWorkoutsPage() {
  const { favoriteWorkouts, isFavoriteTabata } = useAppSelector(
    (state) => state.workoutSlice
  );
  const [search, setSearch] = useState<string>("");
  const [scroll, setScroll] = useState<number>(0);
  const [filteredWorkouts, setFilteredWorkouts] = useState<workoutType[]>([]);
  const { theme } = useAppSelector((state) => state.setting);

  const navigate = useNavigate();

  useEffect(() => {
    const arr: workoutType[] = [];
    favoriteWorkouts?.map((i: workoutType) => {
      if (i.nameRU.toLowerCase().includes(search.toLowerCase())) {
        arr.push(i);
      }
    });
    setFilteredWorkouts(arr);
  }, [search]);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

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
      <div
        className={
          theme === "night"
            ? "px-[16px] pb-[20px] bg-[#000] text-[#ffffff] transition-all duration-500"
            : "px-[16px] pb-[20px] text-[#000] transition-all duration-500"
        }
      >
        <BackBtn onClick={backBtn} />
        <h1 className="pb-[15px] text-[20px] font-medium leading-none">
          Избранные тренировки
        </h1>
        {!isFavoriteTabata && favoriteWorkouts.length > 0 && (
          <FilterWorkout
            search={search}
            setSearch={setSearch}
            array={favoriteWorkouts}
            setFilteredArray={setFilteredWorkouts}
          />
        )}

        <div className="h-full pt-[20px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4">
          {isFavoriteTabata && <TabataTimerSettings />}
          {search === "" && favoriteWorkouts?.length > -1
            ? favoriteWorkouts.map((i) => <WorkoutCard workout={i} />)
            : filteredWorkouts.map((i) => <WorkoutCard workout={i} />)}
        </div>
        {!isFavoriteTabata && favoriteWorkouts.length === 0 && (
          <p className="text-center">
            Нет избранных тренировок, добавим{" "}
            <span
              onClick={() => navigate(router.main)}
              className="underline cursor-pointer"
            >
              тренировку
            </span>
            ?
          </p>
        )}
        {scroll >= 50 && (
          <BottomBtn onClick={handleToTopBtn} btnText={<p>Наверх &#8593;</p>} />
        )}
      </div>
    </>
  );
}
