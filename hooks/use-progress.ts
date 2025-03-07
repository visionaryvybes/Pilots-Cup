import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface UseProgressOptions {
  color?: string;
  height?: number;
  showSpinner?: boolean;
  minimum?: number;
  easing?: string;
  speed?: number;
  trickle?: boolean;
  trickleSpeed?: number;
  onStart?: () => void;
  onStop?: () => void;
}

interface ProgressState {
  progress: number;
  show: boolean;
  active: boolean;
}

export function useProgress({
  color = '#29D',
  height = 2,
  showSpinner = true,
  minimum = 0.08,
  easing = 'ease',
  speed = 200,
  trickle = true,
  trickleSpeed = 200,
  onStart,
  onStop,
}: UseProgressOptions = {}) {
  const [state, setState] = useState<ProgressState>({
    progress: 0,
    show: false,
    active: false,
  });

  const progressRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const clamp = useCallback((n: number) => {
    if (n < 0) return 0;
    if (n > 1) return 1;
    return n;
  }, []);

  const start = useCallback(() => {
    if (state.active) return;

    const work = () => {
      setTimeout(() => {
        if (!state.active) return;
        increment();
        work();
      }, trickleSpeed);
    };

    progressRef.current = 0;
    setState((prev) => ({ ...prev, show: true, active: true }));
    onStart?.();

    if (trickle) work();
  }, [state.active, trickle, trickleSpeed, onStart]);

  const increment = useCallback(
    (amount?: number) => {
      let n = progressRef.current;

      if (!state.active) {
        return;
      }

      if (typeof amount !== 'number') {
        if (n >= 0 && n < 0.2) amount = 0.1;
        else if (n >= 0.2 && n < 0.5) amount = 0.04;
        else if (n >= 0.5 && n < 0.8) amount = 0.02;
        else if (n >= 0.8 && n < 0.99) amount = 0.005;
        else amount = 0;
      }

      n = clamp(n + amount);
      progressRef.current = n;

      if (n === 1) {
        done();
      } else {
        setState((prev) => ({ ...prev, progress: n }));
      }
    },
    [state.active, clamp]
  );

  const done = useCallback(() => {
    progressRef.current = 1;
    setState((prev) => ({ ...prev, progress: 1 }));

    timeoutRef.current = setTimeout(() => {
      setState((prev) => ({ ...prev, show: false, active: false }));
      onStop?.();
    }, speed);
  }, [speed, onStop]);

  const set = useCallback(
    (n: number) => {
      n = clamp(n);
      progressRef.current = n;
      setState((prev) => ({ ...prev, progress: n }));
    },
    [clamp]
  );

  // Track route changes
  useEffect(() => {
    // Route change detected
    start();
    const timeout = setTimeout(() => {
      done();
    }, 500); // Simulate network delay

    return () => {
      clearTimeout(timeout);
    };
  }, [pathname, searchParams, start, done]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const styles = {
    bar: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: `${height}px`,
      zIndex: 1031,
      backgroundColor: color,
      boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`,
      opacity: state.show ? 1 : 0,
      transform: `translate3d(-${100 - state.progress * 100}%, 0, 0)`,
      transition: !state.active
        ? `all ${speed}ms ${easing}`
        : `all ${speed}ms linear`,
    } as const,
    spinner: showSpinner
      ? {
          display: state.show ? 'block' : 'none',
          position: 'fixed',
          top: '15px',
          right: '15px',
          zIndex: 1031,
        }
      : { display: 'none' },
  };

  return {
    progress: state.progress,
    isVisible: state.show,
    isActive: state.active,
    styles,
    start,
    done,
    set,
    increment,
  };
}

// Usage example:
// const {
//   progress,
//   isVisible,
//   styles,
//   start,
//   done,
//   increment,
// } = useProgress({
//   color: '#0070f3',
//   height: 3,
//   showSpinner: true,
//   onStart: () => {
//     console.log('Progress started');
//   },
//   onStop: () => {
//     console.log('Progress completed');
//   },
// }); 