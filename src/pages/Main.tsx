import { useContext, useEffect, useState } from "react";
import { SetContext } from "../context/context";
import { data } from "../data";
import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";
import { Filter } from "../components/Filter";
import type { workoutType } from "../types/types";
import { Workout } from "../components/Workout";
import { BottomBtn } from "../components/BottomBtn";

export const sortArray = (a, b) => {
  if (a.order > b.order) {
    return 1;
  } else {
    return -1;
  }
};

export default function Main() {
  const {
    workouts,
    changeWorkouts,
  } = useContext(SetContext);
  const [search, setSearch] = useState<string>("");
  const [filteredCourses, setFilteredCourses] = useState<workoutType[] | []>(
    []
  );

  useEffect(() => {
    const savedCourses = localStorage.getItem("workouts");
    if (savedCourses) {
      changeWorkouts(JSON.parse(savedCourses).sort(sortArray));
    } else {
      changeWorkouts(data.workouts.sort(sortArray));
    }
  }, []);

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
        <Filter
          search={search}
          setSearch={setSearch}
          array={workouts}
          setFilteredArray={setFilteredCourses}
        />
        <div className="pt-[20px] flex gap-[24px] flex-wrap justify-center">
          {search === ""
            ? workouts.map((i: workoutType) => <Workout i={i} />)
            : filteredCourses.map((i: workoutType) => <Workout i={i} />)}
        </div>
        <BottomBtn onClick={handleToTopBtn} btnText={<p>Наверх &#8593;</p>} />
      </div>
    </>
  );
}
