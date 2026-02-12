import type { WorkoutPropType, workoutType } from "../types/types";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../hooks/checkContext";

export const Workout = ({ i }: WorkoutPropType) => {
  const {
    user,
    isAuth,
    changeUser,
    favoriteWorkoutId,
    changeViewWorkout,
    startedWorkout,
  } = useMyContext();
  const navigate = useNavigate();

  const workoutClick = (workout: workoutType) => {
    changeViewWorkout(workout);
    navigate(`/workout/${workout.id}`);
  };

  const addFavoriteWorkout = (
    e: React.MouseEvent<HTMLDivElement | SVGSVGElement, MouseEvent>,
    workout: workoutType
  ) => {
    e.stopPropagation();
    if (user && user.myWorkouts.length === 0) {
      changeUser({ ...user, myWorkouts: [...user.myWorkouts, workout] });
    } else {
      user &&
        user.myWorkouts.map((i: workoutType) => {
          if (i.id === workout.id) {
            changeUser({
              ...user,
              myWorkouts: user.myWorkouts.filter((i) => i.id !== workout.id),
            });
          } else {
            changeUser({ ...user, myWorkouts: [...user.myWorkouts, workout] });
          }
        });
    }
  };

  return (
    <div
      onClick={() => workoutClick(i)}
      className="rounded-[30px] px-[16px] pb-[15px] shadow-[0px_0px_10px_-7px] hover:cursor-pointer"
      key={i.id}
    >
      <div className="place-self-end">
        {isAuth ? (
          favoriteWorkoutId.includes(i.id) ? (
            <div
              title="Удалить из избранных"
              onClick={(e) => addFavoriteWorkout(e, i)}
              className="bg-[red] z-1 shadow-[0px_0px_20px_0px_white] place-self-end relative top-[30px] right-[10px] hover:scale-[1.3] hover:border-[#000000] hover:border-[1px] transition-[0.3s] w-[27px] h-[27px] rounded-[100%] relative"
            >
              <div className="h-[3px] w-[15px] bg-[white] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"></div>
            </div>
          ) : (
            <div
              title="Добавить в избранные"
              onClick={(e) => addFavoriteWorkout(e, i)}
              className="place-self-end relative top-[30px] right-[10px] bg-[green] shadow-[0px_0px_20px_0px_white] z-1 hover:scale-[1.3] hover:border-[#000000] hover:border-[1px] transition-[0.3s] w-[27px] h-[27px] rounded-[100%] relative"
            >
              <div className="h-[15px] w-[3px] bg-[white] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"></div>
              <div className="h-[3px] w-[15px] bg-[white] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"></div>
            </div>
          )
        ) : null}
      </div>
      <div className="flex flex-wrap content-center justify-center w-[300px] flex h-[340px]">
        <img
          className={
            isAuth
              ? "rounded-[30px] place-self-center"
              : "rounded-[30px] place-self-center"
          }
          src={i.img}
          alt={i.nameEN}
        />
      </div>

      <div className="px-[20px] max-w-[300px]">
        <p className="text-[24px] pb-[20px] font-medium">{i.nameRU}</p>
        <div className="flex flex-wrap gap-[6px]">
          <div
            title="Количество упражнений"
            className="flex gap-[5px] items-center bg-[#F7F7F7] rounded-[50px] p-[10px] pr-[20px]"
          >
            <img className="w-[30px] pr-[5px]" src="exercise.png" alt="" />
            <p>{i.exercises.length}</p>
          </div>

          <div
            title="Несколько вариантов сложности"
            className="flex gap-[5px] items-center bg-[#F7F7F7] rounded-[50px] p-[10px]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15 2.625C15.2984 2.625 15.5845 2.74353 15.7955 2.9545C16.0065 3.16548 16.125 3.45163 16.125 3.75V14.25C16.125 14.5484 16.0065 14.8345 15.7955 15.0455C15.5845 15.2565 15.2984 15.375 15 15.375C14.7016 15.375 14.4155 15.2565 14.2045 15.0455C13.9935 14.8345 13.875 14.5484 13.875 14.25V3.75C13.875 3.45163 13.9935 3.16548 14.2045 2.9545C14.4155 2.74353 14.7016 2.625 15 2.625Z"
                fill="#D9D9D9"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 4.875C12.2984 4.875 12.5845 4.99353 12.7955 5.2045C13.0065 5.41548 13.125 5.70163 13.125 6V14.25C13.125 14.5484 13.0065 14.8345 12.7955 15.0455C12.5845 15.2565 12.2984 15.375 12 15.375C11.7016 15.375 11.4155 15.2565 11.2045 15.0455C10.9935 14.8345 10.875 14.5484 10.875 14.25V6C10.875 5.70163 10.9935 5.41548 11.2045 5.2045C11.4155 4.99353 11.7016 4.875 12 4.875Z"
                fill="#D9D9D9"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 7.125C9.29837 7.125 9.58452 7.24353 9.7955 7.4545C10.0065 7.66548 10.125 7.95163 10.125 8.25V14.25C10.125 14.5484 10.0065 14.8345 9.7955 15.0455C9.58452 15.2565 9.29837 15.375 9 15.375C8.70163 15.375 8.41548 15.2565 8.2045 15.0455C7.99353 14.8345 7.875 14.5484 7.875 14.25V8.25C7.875 7.95163 7.99353 7.66548 8.2045 7.4545C8.41548 7.24353 8.70163 7.125 9 7.125Z"
                fill="#00C1FF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 9.375C6.29837 9.375 6.58452 9.49353 6.7955 9.7045C7.00647 9.91548 7.125 10.2016 7.125 10.5V14.25C7.125 14.5484 7.00647 14.8345 6.7955 15.0455C6.58452 15.2565 6.29837 15.375 6 15.375C5.70163 15.375 5.41548 15.2565 5.2045 15.0455C4.99353 14.8345 4.875 14.5484 4.875 14.25V10.5C4.875 10.2016 4.99353 9.91548 5.2045 9.7045C5.41548 9.49353 5.70163 9.375 6 9.375Z"
                fill="#00C1FF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 11.625C3.29837 11.625 3.58452 11.7435 3.7955 11.9545C4.00647 12.1655 4.125 12.4516 4.125 12.75V14.25C4.125 14.5484 4.00647 14.8345 3.7955 15.0455C3.58452 15.2565 3.29837 15.375 3 15.375C2.70163 15.375 2.41548 15.2565 2.2045 15.0455C1.99353 14.8345 1.875 14.5484 1.875 14.25V12.75C1.875 12.4516 1.99353 12.1655 2.2045 11.9545C2.41548 11.7435 2.70163 11.625 3 11.625Z"
                fill="#00C1FF"
              />
            </svg>
            <p>Сложность</p>
          </div>
          {startedWorkout && startedWorkout.timeLimit && (
            <div className="flex gap-[5px] items-center bg-[#F7F7F7] rounded-[50px] p-[10px] pr-[20px]">
              <svg viewBox="0 0 32 32" width="20px" height="20px">
                <path d="M 16 4 C 9.382813 4 4 9.382813 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z M 16 6 C 21.535156 6 26 10.464844 26 16 C 26 21.535156 21.535156 26 16 26 C 10.464844 26 6 21.535156 6 16 C 6 10.464844 10.464844 6 16 6 Z M 15 8 L 15 17 L 22 17 L 22 15 L 17 15 L 17 8 Z" />
              </svg>
            </div>
          )}
        </div>
      </div>
      {startedWorkout !== null && startedWorkout.id === i.id && (
        <button className="flex place-self-center place-content-center w-full mt-[20px] text-[18px] rounded-[45px] bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-[#A0B000] active:text-[white] px-[16px] py-[8px] mb-[10px]">
          Продолжить
        </button>
      )}
    </div>
  );
};
