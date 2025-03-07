import { useEffect, useRef } from 'react';

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
}

interface UsePerformanceOptions {
  onMetricsReady?: (metrics: PerformanceMetrics) => void;
  onPoorPerformance?: (metrics: PerformanceMetrics) => void;
}

const POOR_PERFORMANCE_THRESHOLDS = {
  fcp: 2000, // 2 seconds
  lcp: 2500, // 2.5 seconds
  fid: 100, // 100 milliseconds
  cls: 0.1, // 0.1
  ttfb: 600, // 600 milliseconds
};

export function usePerformance(options: UsePerformanceOptions = {}) {
  const metricsRef = useRef<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  });

  useEffect(() => {
    // Only run in production and if the browser supports the Performance API
    if (
      process.env.NODE_ENV !== 'production' ||
      !window.performance ||
      !window.PerformanceObserver
    ) {
      return;
    }

    // Time to First Byte
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      metricsRef.current.ttfb = navigationEntry.responseStart;
    }

    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length > 0) {
        const fcp = entries[0] as PerformanceEntry;
        metricsRef.current.fcp = fcp.startTime;
        checkMetrics();
      }
    });

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length > 0) {
        const lcp = entries[entries.length - 1] as PerformanceEntry;
        metricsRef.current.lcp = lcp.startTime;
        checkMetrics();
      }
    });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length > 0) {
        const fid = entries[0] as PerformanceEventTiming;
        metricsRef.current.fid = fid.processingStart - fid.startTime;
        checkMetrics();
      }
    });

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      for (const entry of list.getEntries() as LayoutShift[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      metricsRef.current.cls = clsValue;
      checkMetrics();
    });

    try {
      fcpObserver.observe({ type: 'paint', buffered: true });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      fidObserver.observe({ type: 'first-input', buffered: true });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (error) {
      console.error('Performance monitoring error:', error);
    }

    function checkMetrics() {
      const metrics = metricsRef.current;
      const allMetricsCollected =
        metrics.fcp !== null &&
        metrics.lcp !== null &&
        metrics.fid !== null &&
        metrics.cls !== null &&
        metrics.ttfb !== null;

      if (allMetricsCollected) {
        options.onMetricsReady?.(metrics);

        // Check for poor performance
        const poorMetrics = Object.entries(metrics).some(
          ([key, value]) =>
            value !== null &&
            value > POOR_PERFORMANCE_THRESHOLDS[key as keyof typeof POOR_PERFORMANCE_THRESHOLDS]
        );

        if (poorMetrics) {
          options.onPoorPerformance?.(metrics);
        }
      }
    }

    return () => {
      try {
        fcpObserver.disconnect();
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      } catch (error) {
        console.error('Error disconnecting performance observers:', error);
      }
    };
  }, [options.onMetricsReady, options.onPoorPerformance]);

  return metricsRef.current;
}

// Usage example:
// usePerformance({
//   onMetricsReady: (metrics) => {
//     console.log('Performance metrics:', metrics);
//   },
//   onPoorPerformance: (metrics) => {
//     console.warn('Poor performance detected:', metrics);
//   },
// }); 