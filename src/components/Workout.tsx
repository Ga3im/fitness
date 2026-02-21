import type { WorkoutPropType, workoutType } from "../types/types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/features/store";
import {
  setFavoriteWorkoutsId,
  setViewWorkout,
} from "../store/features/workoutSlice";
import { setUser } from "../store/features/authSlice";

export const Workout = ({ i }: WorkoutPropType) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { startedWorkout, favoriteWorkoutsId } = useAppSelector(
    (state) => state.workoutSlice
  );
  const { user, isAuth } = useAppSelector((state) => state.authSlice);

  const workoutClick = (workout: workoutType) => {
    dispatch(setViewWorkout(workout));
    navigate(`/workout/${workout.id}`);
  };

  const addFavoriteWorkout = (
    e: React.MouseEvent<HTMLDivElement | SVGSVGElement, MouseEvent>,
    workout: workoutType
  ) => {
    e.stopPropagation();
    if (user && user.myWorkouts.length === 0) {
      dispatch(setUser({ ...user, myWorkouts: [...user.myWorkouts, workout] }));
      dispatch(setFavoriteWorkoutsId([...favoriteWorkoutsId, workout.id]));
    } else {
      user &&
        user.myWorkouts.map((i: workoutType) => {
          if (i.id === workout.id) {
            dispatch(
              setUser({
                ...user,
                myWorkouts: user.myWorkouts.filter((i) => i.id !== workout.id),
              })
            );
            dispatch(
              setFavoriteWorkoutsId(
                favoriteWorkoutsId.filter((i) => i !== workout.id)
              )
            );
          } else {
            dispatch(
              setUser({ ...user, myWorkouts: [...user.myWorkouts, workout] })
            );
            dispatch(
              setFavoriteWorkoutsId([...favoriteWorkoutsId, workout.id])
            );
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
      <div className="place-self-end absolute">
        {isAuth ? (
          favoriteWorkoutsId.includes(i.id) ? (
            <svg
              xlinkTitle="Удалить из избранных"
              onClick={(e) => addFavoriteWorkout(e, i)}
              className="relative top-[40px]"
              width="30"
              height="30"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect width="64" height="64" fill="url(#pattern0_7_4)" />
              <defs>
                <pattern
                  id="pattern0_7_4"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use xlinkHref="#image0_7_4" transform="scale(0.015625)" />
                </pattern>
                <image
                  id="image0_7_4"
                  width="64"
                  height="64"
                  preserveAspectRatio="none"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxAAAAsQAa0jvXUAAAGHaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj48dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPjwvcmRmOkRlc2NyaXB0aW9uPjwvcmRmOlJERj48L3g6eG1wbWV0YT4NCjw/eHBhY2tldCBlbmQ9J3cnPz4slJgLAAACXElEQVR4Xu2ZsU7cQBRFz6x3CaSkQ4IOagq+IPmDKPxlpPxBpHxBirSUSFEaKAMJLDfF2pL1PF6v7Rl7154j0dyH5HfPji28QCKRSCQSiURinjgb7Egm6dWGPpxzK2Cn3/WwkvTPhj6cc0tgbfMm2go4kfQH4PHiys68nN7fwWbBM+C3nddwJukX3a5zAjzbeR1tBNxK+rLrQpbSgsfAXzvPeSfpmRbFLaf3dzjnPgNf7czHLgIWktb0WKpMvuAH4LsZfZT0LdQ12MheALLzMk0CFpLWIZYqYxZE0huBBJfJZWfAm50VbBUgSaGXKlOIiH0N51xtz4UNStzaIDSPF1dRy5f4ZIOCOjPHkp4GWi46+Sl4DzzZmVdA7KM/BnW3gu8WyGwwISp9K0am+OkX+E5BxcjcSAJsMDeSABvMjSTABnMjCbCBc+6oeEubEvkfQUc2rwgAXmwwISrdfAImdwryT39lc+oEAC/OuespSMjL39R9M10nAOCnDQ6YHzYoqLwNWg757dD39mfZdgJg8zxYHuKtkJdf2tzSKABYH5qE0kOv8T9FW4+HIZP0uu+3Q6m896FnaSOAfZfQtjwdBLCvErqUp6MA9k1C1/L0EMC+SOhTnp4CGFtC3/IEEMBYEkKUJ5AAhpYQqjwBBTCUhJDlCSyA2BJClyeCAGJJiFGeSAIILSFWeSIKIJSEmOWJLIC+EmKXZwABdJUwRHkGEkBbCUOVZ0AB7CphyPIMLIAmCUOXZwQB1EkYo/yYZJL0cH6ph/NLSRLQ+AXm1MiUM8fyBVn+k0gkEokx+A9KljoEt6jSJAAAAABJRU5ErkJggg=="
                />
              </defs>
            </svg>
          ) : (
            <svg
              xlinkTitle="Добавить в избранное"
              onClick={(e) => addFavoriteWorkout(e, i)}
              className="relative top-[40px]"
              width="30"
              height="30"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect width="64" height="64" fill="url(#pattern0_8_5)" />
              <defs>
                <pattern
                  id="pattern0_8_5"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use xlinkHref="#image0_8_5" transform="scale(0.015625)" />
                </pattern>
                <image
                  id="image0_8_5"
                  width="64"
                  height="64"
                  preserveAspectRatio="none"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxAAAAsQAa0jvXUAAAGHaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj48dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPjwvcmRmOkRlc2NyaXB0aW9uPjwvcmRmOlJERj48L3g6eG1wbWV0YT4NCjw/eHBhY2tldCBlbmQ9J3cnPz4slJgLAAADXElEQVR4Xu2Zy24TMRhGT5q00E25eIcMRGDYwaIbkHgGBBLiRXkIoEgIiR3FBSEZWBkKSFzEJSwyJe0f2/FMZiaDOkeKVJ1JJ/4+e5xJAj09PT09PT09PceTgRSZrHltfksZQjl7BtiXPpPTXpuPUoZQzg6BP9IvomwBJ7w236UEYDCAyUTafyhnt4Fn0kfY9to8lTIH5exJ4If0MbIL8NrE05VAOXsOeC99wTmvzVspq6Cczcq2JkWAQXb4wew1Y6/utXkH3JMeuF9XeGYTFhvGPxY9YeC1KX1d5XIwS9kFV0A5uwZEz58sIDWwzM1ty2vzScoyKGdPAZ+lFyQ3y9TlED0QC6+cvQE8kX4BZ702XsoUytmzQDRUhBtem8dSkightgeckILpSS5WCA/wQTk7UM7elQckytk7xWDLhgfYUc6OpSzYkILYCgjNvnL2JrAjfQWuem1eSMn0Na4CL6WvwE2vzSMpQ6tgbgWEwhfUER5gt9g/jqCcPV1TeIDgZRDKOydChAa8JPuHz1n8vdRmKSn2kCOE7l6zCsjY7auwr5w9r5w939D5s/aQ3AKawhWPlbHqAlZOX4AUx42+ACmOG7kFzL2n/gdclyLE3K0hsOm1+Spl6Dayy4TuaJWzW8CXwy60Ar5JUXBbiq4SCl9wJDyRAlDObkrntXkAXJG+g1yTgtnszxEsAPiunL0lpddmF4h93OwCY6/NcykL5mafRAEAD6VgWsJr4JL0HeBCMbY5UvtXqoDoP3pt9jq2EsZemzdSMs2QzJg8yPQEQ+mYrYQulDBOzPww9YUokbfBENFvh5Wzl4FX0rfEhcTMZ/1SlFsAHSxh6fCULIAOlVBLeHL2AMEksSfstfTukAo/KhOeCivggOivww2vhEXhg2NKUbUAVlBC7eGpcAkc5k+Ll0Mq/HrV8CxZAEUJIympt4RF4X9JX4ZlLoHDDL02wYEseTk0Gp4aC6CBEhoPT80FUGMJrYSngQKooYTWwtNQASxRQqvhabAAKpTQengaLoASJawkPC0UQEYJv1YVnpYKABh5bX5KmaKN8LRYAKmVIGkrPC0XQE4JbYanhs8CZfkd++zANPxGm+FZwQo4YG5PaHvmu8DQazMpfsZalwePC6Pi0dPT09OzCv4CplJ65wfIVNcAAAAASUVORK5CYII="
                />
              </defs>
            </svg>
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
