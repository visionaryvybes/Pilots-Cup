import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface UsePrefetchOptions {
  enabled?: boolean;
  onPrefetch?: (href: string) => void;
  onError?: (error: Error) => void;
}

export function usePrefetch(options: UsePrefetchOptions = {}) {
  const { enabled = true } = options;
  const router = useRouter();
  const observer = useRef<IntersectionObserver | null>(null);
  const prefetchedUrls = useRef<Set<string>>(new Set());

  const prefetch = useCallback(
    async (href: string) => {
      if (!enabled || prefetchedUrls.current.has(href)) {
        return;
      }

      try {
        router.prefetch(href);
        prefetchedUrls.current.add(href);
        options.onPrefetch?.(href);
      } catch (error) {
        if (error instanceof Error) {
          options.onError?.(error);
        }
      }
    },
    [enabled, router, options]
  );

  const observeLinks = useCallback(() => {
    if (!enabled || typeof window === 'undefined') {
      return;
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement;
            const href = link.getAttribute('href');
            if (href && href.startsWith('/')) {
              prefetch(href);
            }
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    document.querySelectorAll('a[href^="/"]').forEach((link) => {
      observer.current?.observe(link);
    });
  }, [enabled, prefetch]);

  useEffect(() => {
    observeLinks();

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            node.querySelectorAll('a[href^="/"]').forEach((link) => {
              observer.current?.observe(link);
            });
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.current?.disconnect();
      mutationObserver.disconnect();
    };
  }, [observeLinks]);

  return {
    prefetch,
    prefetchedUrls: prefetchedUrls.current,
  };
}

// Usage example:
// const { prefetch } = usePrefetch({
//   enabled: true,
//   onPrefetch: (href) => {
//     console.log(`Prefetched: ${href}`);
//   },
//   onError: (error) => {
//     console.error('Prefetch error:', error);
//   },
// }); 