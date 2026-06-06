import { onMounted, onUnmounted } from 'vue';

export type IntervalTimerCallback = () => boolean | Promise<boolean>;

export interface IntervalTimerControls {
  start: () => void;
  stop: () => void;
}

export const useIntervalTimer = (
  timerTickCallback: IntervalTimerCallback,
  intervalMs: number
): IntervalTimerControls => {
  let timerHandle: number | null = null;
  let isTicking = false;

  const stop = (): void => {
    if (timerHandle === null) {
      return;
    }

    window.clearInterval(timerHandle);
    timerHandle = null;
  };

  const tick = async (): Promise<void> => {
    if (isTicking) {
      return;
    }

    isTicking = true;

    try {
      const shouldContinue = await timerTickCallback();

      if (!shouldContinue) {
        stop();
      }
    } finally {
      isTicking = false;
    }
  };

  const start = (): void => {
    if (timerHandle !== null || typeof window === 'undefined') {
      return;
    }

    timerHandle = window.setInterval((): void => {
      void tick();
    }, intervalMs);
  };

  onMounted(start);
  onUnmounted(stop);

  return { start, stop };
};
