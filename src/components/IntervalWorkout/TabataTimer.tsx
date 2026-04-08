import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/features/store";
import { setIsFavoriteTabata } from "../../store/features/userSlice";
import { router } from "../../pages/router";

export const TabataTimerSettings = () => {
  const { isAuth, isFavoriteTabata } = useAppSelector(
    (state) => state.userSlice
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleFavoriteClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    dispatch(setIsFavoriteTabata(!isFavoriteTabata));
  };

  return (
    <div
      onClick={() => navigate(router.timerWorkout)}
      className="relative flex flex-col rounded-[30px] overflow-hidden shadow-[0px_0px_10px_-7px] hover:cursor-pointer transition-all duration-300 hover:scale-105 bg-white"
    >
      {/* Контейнер для иконки — имитирует блок с фото */}
      <div className="relative w-full aspect-square bg-[#F7F7F7] flex items-center justify-center overflow-hidden">
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-110"
        >
          <circle cx="12" cy="13" r="8" stroke="#BCEC30" strokeWidth="1.5" />
          <path
            d="M12 9V13L14.5 15.5"
            stroke="#BCEC30"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 2H14"
            stroke="#BCEC30"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 2V5"
            stroke="#BCEC30"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Текстовый блок под "фото" */}
      <div className="p-[20px]">
        <p className="text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] pb-[10px] font-medium leading-tight line-clamp-2">
          Интервальная тренировка
        </p>

        <div className="flex text-[10px] flex-wrap gap-[10px]">
          {/* Метка типа тренировки */}
          <div className="bg-[#BCEC30] px-[10px] py-[4px] rounded-full font-bold uppercase tracking-wider">
            Tabata
          </div>
        </div>
      </div>

      {/* Кнопка "Избранное" теперь привязана к верхнему правому углу всей карточки */}
      <div className="absolute top-[2px] right-[10px] z-10">
        {isAuth && (
          <div onClick={handleFavoriteClick}>
            {isFavoriteTabata ? (
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
