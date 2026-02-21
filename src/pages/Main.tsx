import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";
import type { workoutType } from "../types/types";
import { Workout } from "../components/Workout";
import { BottomBtn } from "../components/BottomBtn";
import { useAppSelector } from "../store/features/store";
import { FilterWorkout } from "../components/FilterWorkout";

export const sortArray = (a: number, b: number): number => {
  if (a > b) {
    return 1;
  } else {
    return -1;
  }
};

export default function Main() {
  const { workouts } = useAppSelector((state) => state.workoutSlice);
  const [search, setSearch] = useState<string>("");
  const [filteredCourses, setFilteredCourses] = useState<workoutType[]>([]);

  // useEffect(() => {
  //     dispatch(
  //       setWorkouts(
  //         workouts.sort((a, b) => sortArray(a.order, b.order))
  //       )
  //     );
  // }, []);

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
      <div className="px-[16px]">
        <h1 className="pb-[30px] text-[32px] font-medium leading-none">
          Начните заниматься спортом и улучшите качество жизни
        </h1>
        <FilterWorkout
          search={search}
          setSearch={setSearch}
          array={workouts}
          setFilteredArray={setFilteredCourses}
        />
        <div className="pt-[20px] flex gap-[24px] flex-wrap justify-center">
          {search === ""
            ? workouts.map((i) => <Workout i={i} />)
            : filteredCourses.map((i) => <Workout i={i} />)}
        </div>
        <BottomBtn onClick={handleToTopBtn} btnText={<p>Наверх &#8593;</p>} />
      </div>
    </>
  );
}
