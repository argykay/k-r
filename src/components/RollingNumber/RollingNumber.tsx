import {
  motion,
  useAnimation,
  useReducedMotion,
  type Transition,
} from 'framer-motion';
import React, { useEffect, useMemo, useRef } from 'react';

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
/** Three 0–9 cycles so 9→8 and 0→9 are always a single cell step. */
const STRIP = [...DIGITS, ...DIGITS, ...DIGITS];
const CYCLE_LEN = DIGITS.length;
const MIDDLE_BASE = CYCLE_LEN;

/** One cell on countdown tick — ease-out so the digit settles gently. */
const TICK_TRANSITION: Transition = {
  duration: 0.52,
  ease: [0.33, 0.82, 0.25, 1],
};

function introDuration(steps: number): number {
  if (steps <= 0) {
    return 0;
  }
  return Math.min(0.5 + steps * 0.085, 1.4);
}

function yForIndex(index: number): string {
  return `-${(index * 100) / STRIP.length}%`;
}

function middleIndexForDigit(digit: number): number {
  return MIDDLE_BASE + digit;
}

function digitOneStepDown(digit: number): number {
  return (digit - 1 + 10) % 10;
}

function normalizeIndex(index: number): number {
  let i = index;
  while (i < MIDDLE_BASE) {
    i += CYCLE_LEN;
  }
  while (i >= MIDDLE_BASE + CYCLE_LEN) {
    i -= CYCLE_LEN;
  }
  return i;
}

type RollingDigitProps = {
  digit: number;
  animate: boolean;
  delay: number;
};

const RollingDigit = ({ digit, animate, delay }: RollingDigitProps) => {
  const prefersReducedMotion = useReducedMotion();
  const hasIntroRolledRef = useRef(false);
  const introFlightRef = useRef<Promise<void> | null>(null);
  const motionQueueRef = useRef(Promise.resolve());
  const prevDigitRef = useRef(digit);
  const digitRef = useRef(digit);
  const stripIndexRef = useRef(middleIndexForDigit(digit));
  const controls = useAnimation();

  digitRef.current = digit;

  useEffect(() => {
    const snap = () => {
      stripIndexRef.current = middleIndexForDigit(digit);
      void controls.set({ y: yForIndex(stripIndexRef.current) });
      prevDigitRef.current = digit;
    };

    if (prefersReducedMotion || !animate) {
      snap();
      return;
    }

    const syncStripToPrevDigit = () => {
      const index = middleIndexForDigit(prevDigitRef.current);
      stripIndexRef.current = index;
      void controls.set({ y: yForIndex(index) });
    };

    const rollToIndex = async (nextIndex: number, transition: Transition) => {
      await controls.start({
        y: yForIndex(nextIndex),
        transition,
      });
      stripIndexRef.current = nextIndex;
      const normalized = normalizeIndex(stripIndexRef.current);
      if (normalized !== stripIndexRef.current) {
        stripIndexRef.current = normalized;
        void controls.set({ y: yForIndex(normalized) });
      }
    };

    /** Roll down one cell at a time until we reach the target digit. */
    const catchUpToTarget = async (target: number) => {
      syncStripToPrevDigit();

      while (prevDigitRef.current !== target) {
        const from = prevDigitRef.current;
        const next = digitOneStepDown(from);
        const nextIndex = middleIndexForDigit(from) - 1;
        await rollToIndex(nextIndex, TICK_TRANSITION);
        prevDigitRef.current = next;
      }
    };

    const runIntro = async (): Promise<void> => {
      if (hasIntroRolledRef.current) {
        return;
      }

      if (introFlightRef.current) {
        await introFlightRef.current;
        return;
      }

      const flight = (async () => {
        const introDigit = digitRef.current;
        const targetIndex = middleIndexForDigit(introDigit);
        /** Start one cycle above, then roll down to the target (same as tick direction). */
        const startIndex = targetIndex + CYCLE_LEN;

        if (delay > 0) {
          await new Promise((resolve) => setTimeout(resolve, delay * 1000));
        }

        if (hasIntroRolledRef.current) {
          return;
        }

        stripIndexRef.current = startIndex;
        void controls.set({ y: yForIndex(startIndex) });

        await rollToIndex(targetIndex, {
          duration: introDuration(CYCLE_LEN),
          ease: [0.22, 0.05, 0.2, 1],
        });

        stripIndexRef.current = targetIndex;
        prevDigitRef.current = introDigit;
        hasIntroRolledRef.current = true;
      })();

      introFlightRef.current = flight;

      try {
        await flight;
      } finally {
        introFlightRef.current = null;
      }
    };

    const enqueue = (task: () => Promise<void>) => {
      const run = motionQueueRef.current.then(task);
      motionQueueRef.current = run.catch(() => undefined);
      return run;
    };

    void enqueue(async () => {
      if (!hasIntroRolledRef.current) {
        await runIntro();
      }

      const target = digitRef.current;
      if (prevDigitRef.current !== target) {
        await catchUpToTarget(target);
      }
    });
  }, [animate, controls, delay, digit, prefersReducedMotion]);

  return (
    <span className="rolling-digit inline-block overflow-hidden">
      <motion.span
        className="rolling-digit-strip flex flex-col"
        initial={{ y: yForIndex(stripIndexRef.current) }}
        animate={controls}
      >
        {STRIP.map((n, index) => (
          <span key={`${n}-${index}`} className="rolling-digit-cell flex items-center justify-center">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export type RollingNumberProps = {
  value: number;
  minDigits?: number;
  animate: boolean;
  baseDelay?: number;
  className?: string;
};

export const RollingNumber = ({
  value,
  minDigits = 2,
  animate,
  baseDelay = 0,
  className = '',
}: RollingNumberProps) => {
  const digits = useMemo(() => {
    const padded = String(Math.max(0, value)).padStart(minDigits, '0');
    return padded.split('').map((char) => Number(char));
  }, [value, minDigits]);

  return (
    <span
      className={`rolling-number inline-flex tabular-nums ${className}`.trim()}
      aria-hidden
    >
      {digits.map((digit, index) => (
        <RollingDigit
          key={`${minDigits}-${index}`}
          digit={digit}
          animate={animate}
          delay={baseDelay + index * 0.08}
        />
      ))}
    </span>
  );
}
