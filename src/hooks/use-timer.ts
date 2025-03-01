import { useCallback, useEffect, useState } from 'react';

import { SECOND } from '@/constants/time';

/**
 * @param limit ms 단위
 */
const useTimer = (limit: number) => {
  const [time, setTime] = useState<number>(limit);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    setTime(limit);
    setIsTimerRunning(true);
    const id = setInterval(() => {
      setTime((prev) => prev - 1 * SECOND);
    }, 1 * SECOND);
    setIntervalId(id);
  }, [limit]);

  const stopTimer = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setTime(0);
    setIsTimerRunning(false);
  }, [intervalId]);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  useEffect(() => {
    if (time <= 0 && intervalId) {
      stopTimer();
    }
  }, [time, intervalId, stopTimer]);

  return { time, startTimer, stopTimer, isTimerRunning };
};

export default useTimer;
