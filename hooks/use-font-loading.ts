import { useEffect, useState } from 'react';

interface UseFontLoadingOptions {
  fonts: Array<{
    family: string;
    source?: string;
    descriptors?: FontFaceDescriptors;
  }>;
  onLoaded?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
}

interface FontLoadingState {
  loading: boolean;
  loaded: boolean;
  error: Error | null;
  fonts: {
    [key: string]: {
      loaded: boolean;
      error: Error | null;
    };
  };
}

export function useFontLoading({
  fonts,
  onLoaded,
  onError,
  timeout = 3000,
}: UseFontLoadingOptions) {
  const [state, setState] = useState<FontLoadingState>({
    loading: true,
    loaded: false,
    error: null,
    fonts: {},
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !('FontFace' in window)) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: new Error('FontFace API not supported'),
      }));
      return;
    }

    let timeoutId: NodeJS.Timeout;
    const fontPromises: Promise<void>[] = [];

    fonts.forEach(({ family, source, descriptors }) => {
      if (!source) {
        // For system fonts or fonts loaded via CSS
        const checkFont = async () => {
          try {
            await document.fonts.load(`1em ${family}`);
            setState((prev) => ({
              ...prev,
              fonts: {
                ...prev.fonts,
                [family]: { loaded: true, error: null },
              },
            }));
          } catch (error) {
            const err = error instanceof Error ? error : new Error('Font loading failed');
            setState((prev) => ({
              ...prev,
              fonts: {
                ...prev.fonts,
                [family]: { loaded: false, error: err },
              },
            }));
            onError?.(err);
          }
        };
        fontPromises.push(checkFont());
      } else {
        // For custom fonts loaded via FontFace API
        const fontFace = new FontFace(family, source, descriptors);
        const loadFont = async () => {
          try {
            await fontFace.load();
            document.fonts.add(fontFace);
            setState((prev) => ({
              ...prev,
              fonts: {
                ...prev.fonts,
                [family]: { loaded: true, error: null },
              },
            }));
          } catch (error) {
            const err = error instanceof Error ? error : new Error('Font loading failed');
            setState((prev) => ({
              ...prev,
              fonts: {
                ...prev.fonts,
                [family]: { loaded: false, error: err },
              },
            }));
            onError?.(err);
          }
        };
        fontPromises.push(loadFont());
      }
    });

    // Add timeout
    const timeoutPromise = new Promise<void>((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error('Font loading timed out'));
      }, timeout);
    });

    // Wait for all fonts to load or timeout
    Promise.race([Promise.all(fontPromises), timeoutPromise])
      .then(() => {
        setState((prev) => ({
          ...prev,
          loading: false,
          loaded: true,
          error: null,
        }));
        onLoaded?.();
      })
      .catch((error) => {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error : new Error('Font loading failed'),
        }));
        onError?.(error instanceof Error ? error : new Error('Font loading failed'));
      })
      .finally(() => {
        clearTimeout(timeoutId);
      });

    return () => {
      clearTimeout(timeoutId);
    };
  }, [fonts, onLoaded, onError, timeout]);

  return state;
}

// Usage example:
// const { loading, loaded, error, fonts } = useFontLoading({
//   fonts: [
//     {
//       family: 'Inter',
//       source: 'url("/fonts/Inter.woff2")',
//       descriptors: { weight: '400' },
//     },
//     { family: 'system-ui' }, // System font
//   ],
//   onLoaded: () => {
//     console.log('All fonts loaded');
//   },
//   onError: (error) => {
//     console.error('Font loading error:', error);
//   },
//   timeout: 5000,
// }); 