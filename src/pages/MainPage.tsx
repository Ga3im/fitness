import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";
import type { workoutType } from "../types/types";
import { WorkoutCard } from "../components/Workout/WorkoutCard";
import { BottomBtn } from "../components/BottomBtn";
import { useAppSelector } from "../store/store";
import { FilterWorkout } from "../components/Workout/FilterWorkout";
import { TabataTimerSettings } from "../components/IntervalWorkout/TabataTimer";

export default function Main() {
  const { workouts } = useAppSelector((state) => state.workoutSlice);
  const { theme } = useAppSelector((state) => state.setting);
  const [search, setSearch] = useState<string>("");
  const [filteredCourses, setFilteredCourses] = useState<workoutType[]>([]);

  useEffect(() => {
    const arr: workoutType[] = [];
    workouts.map((i: workoutType) => {
      if (i.nameRU.toLowerCase().includes(search.toLowerCase())) {
        arr.push(i);
      }
    });
    setFilteredCourses(arr);
  }, [search]);

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
            : "px-[16px] pb-[20px] transition-all duration-500"
        }
      >
        <h1 className="pb-[15px] text-[20px] font-medium leading-none pt-[10px]">
          Начните заниматься спортом и улучшите качество жизни
        </h1>
        <FilterWorkout
          search={search}
          setSearch={setSearch}
          array={workouts}
          setFilteredArray={setFilteredCourses}
        />
        <div className="pt-[20px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4">
          <TabataTimerSettings />
          {search === ""
            ? workouts.map((i) => <WorkoutCard workout={i} />)
            : filteredCourses.map((i) => <WorkoutCard workout={i} />)}
        </div>
        <BottomBtn onClick={handleToTopBtn} btnText={<p>Наверх &#8593;</p>} />
      </div>
    </>
  );
}
