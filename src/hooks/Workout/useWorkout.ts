import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/features/store";
import {
  setBreakWorkout,
  setAddExerciseRep,
  setTimeSets,
  setConfirmWeight,
  setStartedWorkout,
} from "../../store/features/workoutSlice";
import { useWakeLock } from "../useWakeLock";
import type { exercisesType, workoutType } from "../../types/types";
import { setUser } from "../../store/features/userSlice";

export const useWorkout = (displayWorkout: workoutType | null) => {
  const dispatch = useAppDispatch();
  const { startedWorkout, restTimeSets } = useAppSelector(
    (state) => state.workoutSlice
  );
  const { user } = useAppSelector((state) => state.userSlice);

  const [exerciseQueue, setExerciseQueue] = useState<exercisesType[]>([]);
  const [isEnteringWeight, setIsEnteringWeight] = useState<boolean>(false);
  const [userWeight, setUserWeight] = useState<number | null>(null);
  const [doneWorkout, setDoneWorkout] = useState(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  
  // Читаем режим НАПРЯМУЮ, без лишнего стейта exerciseMode
  const exerciseMode = displayWorkout?.mode || "свободное";

  const [prossesingExercise, setProssesingExercise] =
    useState<exercisesType | null>(null);
  const repsRef = useRef<(HTMLInputElement | null)[]>([]);

  const { requestWakeLock, releaseWakeLock } = useWakeLock();

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    (e.target as HTMLElement).blur();
  };

  const cancelWeightBtn = () => {
    setIsEnteringWeight(false);
  };

  const confirmWeightBtn = () => {
    if (userWeight) {
      let reps = Math.ceil(5000 / userWeight);
      dispatch(setConfirmWeight({ reps }));
      setIsEnteringWeight(false);
    }
  };

  // 1. Управление WakeLock
  useEffect(() => {
    if (startedWorkout) requestWakeLock();
    else releaseWakeLock();
  }, [startedWorkout, requestWakeLock, releaseWakeLock]);

  // 2. Проверка завершения всей тренировки
  useEffect(() => {
    const allDone = displayWorkout?.exercises.every((ex) => ex.done);
    if (allDone && (displayWorkout?.exercises.length ?? 0) > 0) {
      setDoneWorkout(true);
      dispatch(setStartedWorkout(null));
    }
  }, [displayWorkout?.exercises, dispatch]);

  // 3. Логика инициализации активного упражнения при старте
  useEffect(() => {
    if (exerciseMode === "свободное") {
      setProssesingExercise(null);
    } else if (displayWorkout && displayWorkout.exercises.length > 0) {
      // Ищем первое незавершенное упражнение
      const firstUnfinished = displayWorkout.exercises.find(
        (ex) => !ex.done && (ex.doneReps ?? 0) < (ex.reps ?? 0) * (ex.sets ?? 0)
      );
      setProssesingExercise(firstUnfinished || displayWorkout.exercises[0]);
    }
  }, [exerciseMode, displayWorkout?.id]);

  // 4. Умная функция переключения очередей (для круговой и поподходной)
  const switchToNextExercise = (currentExercise: exercisesType, addedReps: number) => {
    if (!displayWorkout) return;

    const totalExercises = displayWorkout.exercises.length;
    const currentIdx = displayWorkout.exercises.findIndex((ex) => ex.id === currentExercise.id);

    if (exerciseMode === "круговое") {
      // Ищем следующее по кругу упражнение, которое еще не завершено полностью
      for (let i = 1; i <= totalExercises; i++) {
        const nextIdx = (currentIdx + i) % totalExercises;
        const candidate = displayWorkout.exercises[nextIdx];
        
        // Высчитываем лимит повторений для кандидата
        const totalNeeded = (candidate.sets ?? 0) * (candidate.reps ?? 0);
        
        // ВАЖНО: Если кандидат — это то самое упражнение, в которое мы ТОЛЬКО ЧТО добавили повторения,
        // мы должны учесть их виртуально (addedReps), так как Redux еще не обновился.
        const currentCandidateReps = (candidate.doneReps ?? 0) + (candidate.id === currentExercise.id ? addedReps : 0);
        
        const isCandidateFinished = currentCandidateReps >= totalNeeded;
        
        if (!isCandidateFinished && !candidate.done) {
          setProssesingExercise(candidate);
          return;
        }
      }
      setProssesingExercise(null);
    }

    if (exerciseMode === "поподходное") {
      const currentExInWorkout = displayWorkout.exercises[currentIdx];
      
      // Прибавляем только что введенные повторения к уже существующим в стейте
      const futureDoneReps = (currentExInWorkout.doneReps ?? 0) + addedReps;
      const totalNeededReps = (currentExercise.sets ?? 0) * (currentExercise.reps ?? 0);
      
      const isFinished = futureDoneReps >= totalNeededReps;
      
      if (isFinished) {
        // Ищем строго следующее невыполненное упражнение ниже по списку
        const nextUnfinished = displayWorkout.exercises
          .slice(currentIdx + 1)
          .find((ex) => {
            const needed = (ex.sets ?? 0) * (ex.reps ?? 0);
            return !ex.done && (ex.doneReps ?? 0) < needed;
          });
        
        setProssesingExercise(nextUnfinished || null);
      }
    }
  };

  // 5. Обработка добавления подходов
  const handleAddReps = (exercise: exercisesType, currentReps: number) => {
    if (exercise.timeBtwnSets && exercise.timeBtwnSets > 0)
      dispatch(setTimeSets(exercise.timeBtwnSets));
    
    dispatch(setAddExerciseRep({ exerciseId: exercise.id, currentReps }));

    // ИСПРАВЛЕНО: Пробрасываем текущие вводимые повторения в функцию расчета
    switchToNextExercise(exercise, currentReps);

    if (exercise.static) return;
    const index = displayWorkout?.exercises.findIndex((ex) => ex.id === exercise.id);
    if (index !== undefined && index !== -1 && repsRef.current[index]) {
      repsRef.current[index]!.value = "";
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    exercise: exercisesType,
    currentReps: number
  ) => {
    if (e.key === "Enter") {
      handleAddReps(exercise, currentReps); // Просто вызываем метод выше, чтобы не дублировать код
    }
  };

  const breakWorkout = () => {
    setIsConfirm(false);
    releaseWakeLock();
    dispatch(setBreakWorkout({ id: displayWorkout?.id }));
  };

  const addFavoriteWorkout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (!user || !displayWorkout) return;
    const isExist = user.myWorkouts.some((w) => w.id === displayWorkout.id);
    if (isExist) {
      dispatch(setUser({ ...user, myWorkouts: user.myWorkouts.filter((i) => i.id !== displayWorkout.id) }));
    } else {
      dispatch(setUser({ ...user, myWorkouts: [...user.myWorkouts, displayWorkout] }));
    }
  };

  return {
    handleWheel,
    cancelWeightBtn,
    userWeight,
    setUserWeight,
    confirmWeightBtn,
    doneWorkout,
    isConfirm,
    setIsConfirm,
    isEnteringWeight,
    restTimeSets,
    exerciseMode, // Возвращаем для обратной совместимости, если используется в JSX
    prossesingExercise,
    handleAddReps,
    breakWorkout,
    setIsEnteringWeight,
    repsRef,
    exerciseQueue,
    setExerciseQueue,
    addFavoriteWorkout,
    handleKeyDown,
  };
};
