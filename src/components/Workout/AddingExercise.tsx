import { useRef } from "react";
import { Exercise } from "../Exercise";
import type { exercisesType, workoutType } from "../../types/types";
import { setEditWorkout } from "../../store/features/workoutSlice";
import { useAppDispatch } from "../../store/store";

type AddingExerciseType = {
  editWorkout: workoutType | null;
  exercises: exercisesType[];
};

export const AddingExercise = ({
  editWorkout,
  exercises,
}: AddingExerciseType) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<(HTMLDivElement | null)[]>([]);
  const dispatch = useAppDispatch();

  const scrollContainer = (direction: "next" | "back") => {
    const container = containerRef.current;
    if (!container) return;

    const itemWidth = container.querySelector("div")?.clientWidth || 330;
    const gap = 30;
    const step = itemWidth + gap;

    const currentScroll = container.scrollLeft;
    const targetScroll =
      direction === "next" ? currentScroll + step : currentScroll - step;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const exerciseClick = (e: HTMLElement | null, exercise: exercisesType) => {
    if (e) {
      e.scrollIntoView({ inline: "center", behavior: "smooth" });
    }

    const isAlreadyInWorkout = editWorkout?.exercises.some(
      (ex) => ex.id === exercise.id
    );

    if (!isAlreadyInWorkout && editWorkout) {
      dispatch(
        setEditWorkout({
          ...editWorkout,
          exercises: [...(editWorkout.exercises || []), exercise],
        })
      );
    }
  };

  const changedisplayWorkout = (workout: workoutType): void => {
    dispatch(setEditWorkout(workout));
  };

  return (
    <div className="w-full pt-[20px] border-[black] border-1 rounded-[20px] shadow-[0px_0px_15px_-10px]">
      <div className="flex justify-center gap-[10px] relative">
        <button onClick={() => scrollContainer("back")}>Back</button>
        <button onClick={() => scrollContainer("next")}>Next</button>
      </div>

      <div
        ref={containerRef}
        className="flex px-[30px] snap-x snap-mandatory scroll-p-[20px] overflow-x-auto overflow-y-hidden gap-[30px] py-[10px] flex-row w-full"
      >
        {exercises.map((addExercise, index) => {
          if (!addExercise || !editWorkout) {
            return null;
          }

          return (
            <div
              className="snap-center"
              key={addExercise.id}
              ref={(el) => {
                btnRef.current[index] = el;
              }}
              onClick={() => exerciseClick(btnRef.current[index], addExercise)}
            >
              <Exercise
                workout={editWorkout}
                setWorkout={changedisplayWorkout}
                exercise={addExercise}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
