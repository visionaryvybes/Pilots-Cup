import { useState, useEffect, useCallback } from 'react';

type MediaQueryObject = {
  [key: string]: string | number | boolean;
};

type MediaQueryInput = string | MediaQueryObject;

interface UseMediaQueryOptions {
  defaultValue?: boolean;
  debounceTime?: number;
  onMatch?: (matches: boolean) => void;
}

function buildMediaQueryString(query: MediaQueryInput): string {
  if (typeof query === 'string') {
    return query;
  }

  return Object.entries(query)
    .map(([feature, value]) => {
      // Convert camelCase to kebab-case
      const kebabFeature = feature.replace(
        /[A-Z]/g,
        (letter) => `-${letter.toLowerCase()}`
      );

      if (typeof value === 'boolean') {
        return value ? kebabFeature : `not ${kebabFeature}`;
      }

      return `(${kebabFeature}: ${value})`;
    })
    .join(' and ');
}

export function useMediaQuery(
  query: MediaQueryInput,
  options: UseMediaQueryOptions = {}
) {
  const { defaultValue = false, debounceTime = 100, onMatch } = options;

  const [matches, setMatches] = useState(defaultValue);
  const [mediaQueryString] = useState(() => buildMediaQueryString(query));

  const handleChange = useCallback(
    (event: MediaQueryListEvent) => {
      setMatches(event.matches);
      onMatch?.(event.matches);
    },
    [onMatch]
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let mediaQueryList: MediaQueryList;

    const debouncedInit = () => {
      mediaQueryList = window.matchMedia(mediaQueryString);
      setMatches(mediaQueryList.matches);
      onMatch?.(mediaQueryList.matches);

      // Use the appropriate event listener method based on browser support
      if (mediaQueryList.addEventListener) {
        mediaQueryList.addEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQueryList.addListener(handleChange);
      }
    };

    // Debounce the initialization to avoid rapid changes during mounting
    timeoutId = setTimeout(debouncedInit, debounceTime);

    return () => {
      clearTimeout(timeoutId);
      if (mediaQueryList) {
        if (mediaQueryList.removeEventListener) {
          mediaQueryList.removeEventListener('change', handleChange);
        } else {
          // Fallback for older browsers
          mediaQueryList.removeListener(handleChange);
        }
      }
    };
  }, [mediaQueryString, debounceTime, handleChange, onMatch]);

  return matches;
}

// Predefined breakpoints
export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
  motion: '(prefers-reduced-motion: no-preference)',
  hover: '(hover: hover)',
  touch: '(hover: none) and (pointer: coarse)',
  highDPI: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
} as const;

// Usage example:
// const isMobile = useMediaQuery(
//   {
//     maxWidth: '768px',
//     orientation: 'portrait',
//   },
//   {
//     defaultValue: true,
//     debounceTime: 200,
//     onMatch: (matches) => {
//       console.log('Mobile view:', matches);
//     },
//   }
// );
//
// // Or using predefined breakpoints
// const isDesktop = useMediaQuery(breakpoints.lg);
// const prefersDark = useMediaQuery(breakpoints.dark);
// const prefersReducedMotion = !useMediaQuery(breakpoints.motion); 