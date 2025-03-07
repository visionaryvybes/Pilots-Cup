import { useCallback, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

interface UseAnalyticsOptions {
  enabled?: boolean;
  debug?: boolean;
  onEvent?: (event: AnalyticsEvent) => void;
  onError?: (error: Error) => void;
  trackPageViews?: boolean;
  trackClicks?: boolean;
  trackForms?: boolean;
  excludePaths?: string[];
  excludeElements?: string[];
}

export function useAnalytics(options: UseAnalyticsOptions = {}) {
  const {
    enabled = true,
    debug = false,
    trackPageViews = true,
    trackClicks = true,
    trackForms = true,
    excludePaths = [],
    excludeElements = [],
  } = options;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const eventsQueue = useRef<AnalyticsEvent[]>([]);
  const isProcessing = useRef(false);

  const log = useCallback(
    (message: string, data?: any) => {
      if (debug) {
        console.log(`[Analytics] ${message}`, data);
      }
    },
    [debug]
  );

  const processQueue = useCallback(async () => {
    if (isProcessing.current || eventsQueue.current.length === 0) {
      return;
    }

    isProcessing.current = true;
    const events = [...eventsQueue.current];
    eventsQueue.current = [];

    try {
      for (const event of events) {
        await options.onEvent?.(event);
        log('Event processed:', event);
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Analytics error');
      options.onError?.(err);
      log('Error processing events:', err);
      // Add failed events back to the queue
      eventsQueue.current = [...eventsQueue.current, ...events];
    } finally {
      isProcessing.current = false;
      // Process any new events that were added while processing
      if (eventsQueue.current.length > 0) {
        processQueue();
      }
    }
  }, [options, log]);

  const trackEvent = useCallback(
    (name: string, properties?: Record<string, any>) => {
      if (!enabled) {
        return;
      }

      const event: AnalyticsEvent = {
        name,
        properties,
        timestamp: Date.now(),
      };

      eventsQueue.current.push(event);
      log('Event queued:', event);
      processQueue();
    },
    [enabled, log, processQueue]
  );

  // Track page views
  useEffect(() => {
    if (!enabled || !trackPageViews || excludePaths.includes(pathname || '')) {
      return;
    }

    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : '');
    trackEvent('page_view', {
      url,
      pathname,
      search: searchParams?.toString(),
      title: document.title,
    });
  }, [enabled, trackPageViews, pathname, searchParams, excludePaths, trackEvent]);

  // Track clicks
  useEffect(() => {
    if (!enabled || !trackClicks) {
      return;
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button') as HTMLElement;

      if (!clickable || excludeElements.some((selector) => clickable.matches(selector))) {
        return;
      }

      const properties: Record<string, any> = {
        element: clickable.tagName.toLowerCase(),
        text: clickable.textContent?.trim(),
      };

      if (clickable instanceof HTMLAnchorElement) {
        properties.href = clickable.href;
      }

      if (clickable.id) {
        properties.id = clickable.id;
      }

      if (clickable.className) {
        properties.class = clickable.className;
      }

      trackEvent('click', properties);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [enabled, trackClicks, excludeElements, trackEvent]);

  // Track form submissions
  useEffect(() => {
    if (!enabled || !trackForms) {
      return;
    }

    const handleSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement;

      if (excludeElements.some((selector) => form.matches(selector))) {
        return;
      }

      const formData = new FormData(form);
      const fields = Array.from(formData.entries()).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: typeof value === 'string' ? value : '(file)',
        }),
        {}
      );

      trackEvent('form_submit', {
        form_id: form.id,
        form_name: form.getAttribute('name'),
        form_action: form.action,
        form_method: form.method,
        fields,
      });
    };

    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
      form.addEventListener('submit', handleSubmit);
    });

    return () => {
      forms.forEach((form) => {
        form.removeEventListener('submit', handleSubmit);
      });
    };
  }, [enabled, trackForms, excludeElements, trackEvent]);

  return {
    trackEvent,
    queueLength: eventsQueue.current.length,
    isProcessing: isProcessing.current,
  };
}

// Usage example:
// const { trackEvent } = useAnalytics({
//   enabled: true,
//   debug: true,
//   onEvent: async (event) => {
//     await fetch('/api/analytics', {
//       method: 'POST',
//       body: JSON.stringify(event),
//     });
//   },
//   onError: (error) => {
//     console.error('Analytics error:', error);
//   },
//   trackPageViews: true,
//   trackClicks: true,
//   trackForms: true,
//   excludePaths: ['/private'],
//   excludeElements: ['.no-track', '[data-private]'],
// }); 