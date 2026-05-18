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
  const [exerciseMode, setExerciseMode] = useState<string>("свободное");
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

  // 2. ОТДЕЛЬНЫЙ ЭФФЕКТ ДЛЯ ПРОВЕРКИ ЗАВЕРШЕНИЯ
  useEffect(() => {
    const allDone = displayWorkout?.exercises.every((ex) => ex.done);
    if (allDone && (displayWorkout?.exercises.length ?? 0) > 0) {
      setDoneWorkout(true);
      dispatch(setStartedWorkout(null));
    }
  }, [displayWorkout?.exercises, dispatch]);

  // 4. Логика режимов (переключение упражнений)
  useEffect(() => {
    if (exerciseMode === "свободное") setProssesingExercise(null);
    else if (displayWorkout) setProssesingExercise(displayWorkout.exercises[0]);
  }, [exerciseMode, displayWorkout?.id]);

  useEffect(() => {
    if (!prossesingExercise || !displayWorkout) return;

    const currentIndex = displayWorkout.exercises.findIndex(
      (ex) => ex.id === prossesingExercise.id
    );
    const currentEx = displayWorkout.exercises[currentIndex];

    if (
      exerciseMode === "поподходное" &&
      currentEx.doneReps &&
      prossesingExercise.sets &&
      prossesingExercise.reps
    ) {
      const isFinished =
        currentEx.doneReps >= prossesingExercise.sets * prossesingExercise.reps;
      if (isFinished)
        setProssesingExercise(
          displayWorkout.exercises[currentIndex + 1] || null
        );
    }

    if (exerciseMode === "круговое") {
      // Здесь логика переключения после каждого добавления репсов (можно вызывать вручную)
    }
  }, [displayWorkout?.exercises]);

  // Методы управления
  const addFavoriteWorkout = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (!user) return;
    const isExist = user.myWorkouts.some((w) => w.id === displayWorkout?.id);
    if (displayWorkout) {
      if (isExist) {
        dispatch(
          setUser({
            ...user,
            myWorkouts: user.myWorkouts.filter(
              (i) => i.id !== displayWorkout?.id
            ),
          })
        );
      } else {
        dispatch(
          setUser({
            ...user,
            myWorkouts: [...user.myWorkouts, displayWorkout],
          })
        );
      }
    }
  };

  const handleAddReps = (exercise: exercisesType, currentReps: number) => {
    if (exercise.timeBtwnSets && exercise.timeBtwnSets > 0)
      dispatch(setTimeSets(exercise.timeBtwnSets));
    dispatch(setAddExerciseRep({ exerciseId: exercise.id, currentReps }));

    if (exerciseMode === "круговое" && displayWorkout) {
      const idx = displayWorkout.exercises.findIndex(
        (ex) => ex.id === exercise.id
      );
      const nextIdx = (idx + 1) % displayWorkout.exercises.length;
      setProssesingExercise(displayWorkout.exercises[nextIdx]);
    }
    if (exercise.static) return;
    const index = displayWorkout?.exercises.findIndex(
      (ex) => ex.id === exercise.id
    );
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
      if (exercise.timeBtwnSets && exercise.timeBtwnSets > 0)
        dispatch(setTimeSets(exercise.timeBtwnSets));
      dispatch(setAddExerciseRep({ exerciseId: exercise.id, currentReps }));

      if (exerciseMode === "круговое" && displayWorkout) {
        const idx = displayWorkout.exercises.findIndex(
          (ex) => ex.id === exercise.id
        );
        const nextIdx = (idx + 1) % displayWorkout.exercises.length;
        setProssesingExercise(displayWorkout.exercises[nextIdx]);
      }
      if (exercise.static) return;
      const index = displayWorkout?.exercises.findIndex(
        (ex) => ex.id === exercise.id
      );
      if (index !== undefined && index !== -1 && repsRef.current[index]) {
        repsRef.current[index]!.value = "";
      }
    }
  };

  const breakWorkout = () => {
    setIsConfirm(false);
    releaseWakeLock();
    dispatch(setBreakWorkout({ id: displayWorkout?.id }));
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
    exerciseMode,
    setExerciseMode,
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
