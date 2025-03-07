import { useEffect, useCallback, useState, useRef } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

interface UseScrollOptions {
  threshold?: number;
  target?: HTMLElement | null;
  onScroll?: (position: ScrollPosition) => void;
  onScrollEnd?: (position: ScrollPosition) => void;
  onScrollStart?: (position: ScrollPosition) => void;
  onDirectionChange?: (direction: 'up' | 'down') => void;
  debounceTime?: number;
}

export function useScroll({
  threshold = 50,
  target = null,
  onScroll,
  onScrollEnd,
  onScrollStart,
  onDirectionChange,
  debounceTime = 100,
}: UseScrollOptions = {}) {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });
  const [isScrolling, setIsScrolling] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const [hasReachedTop, setHasReachedTop] = useState(true);

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const lastDirection = useRef(direction);

  const getScrollPosition = useCallback((): ScrollPosition => {
    if (target) {
      return {
        x: target.scrollLeft,
        y: target.scrollTop,
      };
    }

    return {
      x: window.pageXOffset,
      y: window.pageYOffset,
    };
  }, [target]);

  const handleScroll = useCallback(() => {
    const position = getScrollPosition();
    const element = target || document.documentElement;
    const maxScroll = element.scrollHeight - element.clientHeight;

    // Update scroll position
    setScrollPosition(position);

    // Detect scroll start
    if (!isScrolling) {
      setIsScrolling(true);
      onScrollStart?.(position);
    }

    // Clear previous timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Set new timeout for scroll end
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
      onScrollEnd?.(position);
    }, debounceTime);

    // Detect scroll direction
    const currentDirection = position.y > lastScrollY.current ? 'down' : 'up';
    if (
      Math.abs(position.y - lastScrollY.current) >= threshold &&
      currentDirection !== lastDirection.current
    ) {
      setDirection(currentDirection);
      lastDirection.current = currentDirection;
      onDirectionChange?.(currentDirection);
    }

    // Update last scroll position
    lastScrollY.current = position.y;

    // Check if reached bottom
    const reachedBottom =
      Math.abs(position.y - maxScroll) < threshold;
    setHasReachedBottom(reachedBottom);

    // Check if reached top
    const reachedTop = position.y < threshold;
    setHasReachedTop(reachedTop);

    // Call onScroll callback
    onScroll?.(position);
  }, [
    target,
    threshold,
    isScrolling,
    debounceTime,
    getScrollPosition,
    onScroll,
    onScrollStart,
    onScrollEnd,
    onDirectionChange,
  ]);

  const scrollTo = useCallback(
    (options: ScrollToOptions) => {
      if (target) {
        target.scrollTo(options);
      } else {
        window.scrollTo(options);
      }
    },
    [target]
  );

  const scrollToTop = useCallback(
    (smooth = true) => {
      scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    },
    [scrollTo]
  );

  const scrollToBottom = useCallback(
    (smooth = true) => {
      const element = target || document.documentElement;
      const maxScroll = element.scrollHeight - element.clientHeight;
      scrollTo({ top: maxScroll, behavior: smooth ? 'smooth' : 'auto' });
    },
    [target, scrollTo]
  );

  const scrollToElement = useCallback(
    (element: HTMLElement, offset = 0, smooth = true) => {
      const position =
        element.getBoundingClientRect().top +
        window.pageYOffset -
        offset;
      scrollTo({ top: position, behavior: smooth ? 'smooth' : 'auto' });
    },
    [scrollTo]
  );

  useEffect(() => {
    const element = target || window;
    element.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    // Initialize scroll position
    setScrollPosition(getScrollPosition());

    return () => {
      element.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [target, handleScroll, getScrollPosition]);

  return {
    scrollPosition,
    isScrolling,
    direction,
    hasReachedBottom,
    hasReachedTop,
    scrollTo,
    scrollToTop,
    scrollToBottom,
    scrollToElement,
  };
}

// Usage example:
// const {
//   scrollPosition,
//   isScrolling,
//   direction,
//   hasReachedBottom,
//   hasReachedTop,
//   scrollTo,
//   scrollToTop,
//   scrollToBottom,
//   scrollToElement,
// } = useScroll({
//   threshold: 50,
//   target: containerRef.current,
//   onScroll: (position) => {
//     console.log('Scrolling:', position);
//   },
//   onScrollEnd: (position) => {
//     console.log('Scroll ended:', position);
//   },
//   onScrollStart: (position) => {
//     console.log('Scroll started:', position);
//   },
//   onDirectionChange: (direction) => {
//     console.log('Direction changed:', direction);
//   },
//   debounceTime: 100,
// }); 