import type { workoutType } from "../types/types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/features/store";
import { setViewWorkout } from "../store/features/workoutSlice";
import { setUser } from "../store/features/userSlice";

export type WorkoutPropType = {
  workout: workoutType;
};

export const Workout = ({ workout }: WorkoutPropType) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuth } = useAppSelector((state) => state.userSlice);

  const workoutClick = (workout: workoutType) => {
    dispatch(setViewWorkout(workout));
    navigate(`/workout/${workout.id}`);
  };

  const addFavoriteWorkout = (
    e: React.MouseEvent<HTMLDivElement | SVGSVGElement, MouseEvent>,
    workout: workoutType
  ) => {
    e.stopPropagation();
    if (!user) return;
    const isExist = user.myWorkouts.some((w) => w.id === workout?.id);
    if (isExist) {
      dispatch(
        setUser({
          ...user,
          myWorkouts: user.myWorkouts.filter((i) => i.id !== workout?.id),
        })
      );
    } else {
      dispatch(
        setUser({
          ...user,
          myWorkouts: [...user.myWorkouts, workout],
        })
      );
    }
  };

  const isFavorite = user?.myWorkouts.some((w) => w.id === workout.id);

  return (
    <div
      onClick={() => workoutClick(workout)}
      className="relative flex flex-col w-full max-w-[280px] rounded-[30px] overflow-hidden shadow-[0px_0px_10px_-7px] hover:cursor-pointer transition-all duration-300 hover:scale-105 bg-white pb-[15px]"
      key={workout.id}
    >
      {/* Контейнер изображения: aspect-square делает все фото квадратными, object-cover обрезает лишнее */}
      <div className="relative w-full aspect-square bg-[#F7F7F7] z-0">
        <img
          className="absolute inset-0 w-full h-full object-cover rounded-t-[30px]"
          src={workout.img}
          alt={workout.nameEN}
        />
      </div>

      {/* Контент под фото */}
      <div className="px-[5px] md:px-[20px] h-full flex flex-col justify-between pt-[15px]">
        <p className="text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] pb-[10px] font-medium leading-tight line-clamp-2">
          {workout.nameRU}
        </p>

        <div className="flex text-[10px] flex-wrap gap-[10px] items-center">
          <div
            title="Упражнений"
            className="flex items-center gap-1 rounded-[20px] py-[1px] px-[5px] bg-[#00000061] backdrop-blur-sm text-[#fff]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#BCEC30"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            <span className="text-[12px] font-bold">
              {workout.exercises.length}
            </span>
          </div>

          <div
            title="Можно дома"
            className="rounded-[20px] py-[3px] px-[5px] bg-[#00000061] backdrop-blur-sm"
          >
            🏠 {/* Или лаконичный SVG домика */}
          </div>

          {/* Пример компактной иконки сложности */}
          <div
            title="3 уровня сложности"
            className="flex items-end justify-center gap-[2px] h-[20px] px-[6px] bg-[#00000061] backdrop-blur-sm rounded-full pb-[3px]"
          >
            <div className="w-[3px] h-[6px] bg-[#BCEC30] rounded-full"></div>
            <div className="w-[3px] h-[10px] bg-[#BCEC30] rounded-full"></div>
            <div className="w-[3px] h-[14px] bg-[#BCEC30] rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
      {/* Кнопка "Избранное" теперь привязана к верхнему правому углу всей карточки */}
      <div className="absolute top-[2px] right-[10px] z-10">
        {isAuth && (
          <div onClick={(e) => addFavoriteWorkout(e, workout)}>
            {isFavorite ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="red"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
