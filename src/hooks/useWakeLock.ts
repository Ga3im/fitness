import { useCallback, useEffect, useRef } from "react";

export const useWakeLock = () => {
  let wakeLockRef = useRef<WakeLockSentinel | null>(null);

  const releaseWakeLock = useCallback(async () => {
    try {
      await wakeLockRef.current?.release();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const requestWakeLock = useCallback(async () => {
    try {
      wakeLockRef.current = await navigator.wakeLock.request("screen");
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    return () => {
      releaseWakeLock();
    };
  }, [releaseWakeLock]);

  return { releaseWakeLock, requestWakeLock };
};
