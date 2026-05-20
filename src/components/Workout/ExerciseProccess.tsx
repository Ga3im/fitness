import { useWorkout } from "../../hooks/Workout/useWorkout";
import { useAppSelector } from "../../store/features/store";
import type { exercisesType, workoutType } from "../../types/types";
import { timeHHMMSS } from "../../utils/functions";
import { ResultTable } from "./ResultTable";
import { StartTimeBtn } from "./StartTimeBtn";

type ExerciseProccessProp = {
  displayWorkout: workoutType | null;
};

export const ExerciseProccess = ({ displayWorkout }: ExerciseProccessProp) => {
  const { startedWorkout, restTimeSets } = useAppSelector(
    (state) => state.workoutSlice
  );

  const {
    prossesingExercise,
    handleAddReps,
    setIsEnteringWeight,
    repsRef,
    exerciseQueue,
    setExerciseQueue,
    handleKeyDown,
  } = useWorkout(displayWorkout);

  const selectQueue = (exercise: exercisesType) => {
    if (exerciseQueue.some((ex) => ex.id === exercise.id)) {
      setExerciseQueue(exerciseQueue.filter((ex) => ex.id !== exercise.id));
    } else {
      setExerciseQueue([...exerciseQueue, exercise]);
    }
  };

  return (
    <div className="flex flex-wrap gap-[10px] justify-center py-[30px] mb-[10px] bg-white w-full">
      {displayWorkout?.exercises.map(
        (exercise: exercisesType, index: number) => (
          <div
            key={exercise.id}
            onClick={() => selectQueue(exercise)}
            className="w-[300px] p-[20px] border-[black] border-1 rounded-[20px] shadow-[0px_0px_15px_-10px] bg-white"
          >
            <div className="h-[250px] flex items-center">
              <img
                className="cursor-pointer w-full object-contain"
                src={exercise.img}
                alt={exercise.name}
              />
            </div>
            <p className="text-[24px] h-auto font-medium">{exercise.name}</p>

            <div className="flex flex-col gap-[5px] pb-[10px]">
              {exercise.sets && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center"
                >
                  <span>Подходы:</span>
                  <span className="ml-[3px]"> {exercise.sets}</span>
                </div>
              )}

              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center"
              >
                <div className="inline">
                  {exercise.static ? (
                    "Время: "
                  ) : displayWorkout.needWeight ? (
                    <p
                      onClick={() => setIsEnteringWeight(true)}
                      className="cursor-pointer hover:font-bold text-blue-600"
                    >
                      Введите вес вашего тела
                    </p>
                  ) : (
                    `Повторения: `
                  )}
                </div>

                <span>
                  {exercise.static && exercise.reps !== undefined
                    ? timeHHMMSS(exercise.reps) + " мин"
                    : exercise.reps}
                </span>
              </div>

              {!!exercise.timeBtwnSets && exercise.timeBtwnSets > 0 && (
                <div>
                  <span>Отдых:</span>
                  <span> {timeHHMMSS(Number(exercise.timeBtwnSets))} мин</span>
                </div>
              )}
            </div>

            {exercise.doneReps !== undefined && (
              <ResultTable exercise={exercise} />
            )}

            {exercise.doneReps &&
            (exercise.reps ?? 0) * (exercise.sets ?? 0) <= exercise.doneReps ? (
              <p className="text-[24px] text-shadow-[0px_0px_10px] text-center mt-[10px] text-[#00bd44] font-bold">
                Сделано
              </p>
            ) : exercise.static ? (
              <>
                {startedWorkout !== null &&
                  startedWorkout.id === displayWorkout.id && (
                    <StartTimeBtn
                      exercise={exercise}
                      time={exercise.reps ?? 0}
                      displayWorkout={displayWorkout}
                    />
                  )}
              </>
            ) : (
              <>
                {/* Блок отображения инпута */}
                {startedWorkout && startedWorkout.id === displayWorkout.id && (
                  <>
                    {(() => {
                      if (displayWorkout.mode === "свободное") return true;
                      if (displayWorkout.mode === "круговое")
                        return prossesingExercise?.id === exercise.id;
                      if (displayWorkout.mode === "поподходное") {
                        if (prossesingExercise)
                          return prossesingExercise.id === exercise.id;
                        const firstUnfinished = displayWorkout.exercises.find(
                          (ex) =>
                            (ex.doneReps ?? 0) < (ex.reps ?? 0) * (ex.sets ?? 0)
                        );
                        return firstUnfinished?.id === exercise.id;
                      }
                      return false;
                    })() && (
                      <div
                        className="flex mt-[10px]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          ref={(el) => {
                            repsRef.current[index] = el;
                          }}
                          min={0}
                          className="w-full textfield rounded-tl-[5px] rounded-bl-[5px] py-[5px] px-[10px] border-t-1 border-l-1 border-b-1 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          type="number"
                          placeholder="Количество повторений"
                          onKeyDown={(e) =>
                            handleKeyDown(
                              e,
                              exercise,
                              Number(repsRef.current[index]?.value || 0)
                            )
                          }
                        />
                        <button
                          onClick={() =>
                            handleAddReps(
                              exercise,
                              Number(repsRef.current[index]?.value || 0)
                            )
                          }
                          className="border-t-1 border-b-1 border-r-1 hover:bg-[#C6FF00] cursor-pointer bg-[#BCEC30] w-[30px] rounded-tr-[5px] rounded-br-[5px] relative"
                        >
                          <div className="w-[10px] h-[10px] border-l-2 border-b-2 rotate-[225deg] absolute transform top-[50%] left-[40%] translate-x-[-50%] translate-y-[-50%]"></div>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {/* нули здесь */}
            {/* Блок таймера отдыха */}
            {!!exercise.timeBtwnSets && (
              <div className="mt-[10px]" onClick={(e) => e.stopPropagation()}>
                {restTimeSets < 0 &&
                exercise.table &&
                exercise.table.length > 0 ? (
                  <p className="text-center pt-[10px] font-medium text-red-500 animate-pulse">
                    Пора делать подход
                  </p>
                ) : /* ИСПРАВЛЕНО: Заменили логические && на тернарный оператор для защиты от вывода нуля */
                startedWorkout && restTimeSets > 0 ? (
                  <p className="text-center pt-[10px] font-mono font-bold text-gray-600">
                    {timeHHMMSS(restTimeSets)}
                  </p>
                ) : null}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};
