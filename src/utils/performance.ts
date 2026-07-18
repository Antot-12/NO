interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];

  /**
   * Measure API call duration
   */
  measureApiCall<T>(fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    return fn().finally(() => {
      const duration = performance.now() - start;
      this.recordMetric('api_call_duration', duration);
    });
  }

  /**
   * Record a custom metric
   */
  recordMetric(name: string, value: number) {
    this.metrics.push({
      name,
      value,
      timestamp: Date.now(),
    });

    // Log slow operations
    if (name === 'api_call_duration' && value > 5000) {
      console.warn(`Slow API call: ${value.toFixed(0)}ms`);
    }

    // Keep only last 100 metrics
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }

    if (import.meta.env.DEV) {
      console.log(`[Performance] ${name}: ${value.toFixed(2)}ms`);
    }
  }

  /**
   * Get average for a specific metric
   */
  getAverage(metricName: string): number {
    const filtered = this.metrics.filter(m => m.name === metricName);
    if (filtered.length === 0) return 0;

    const sum = filtered.reduce((acc, m) => acc + m.value, 0);
    return sum / filtered.length;
  }

  /**
   * Get all metrics summary
   */
  getSummary() {
    const metricNames = [...new Set(this.metrics.map(m => m.name))];
    return metricNames.reduce((acc, name) => {
      const values = this.metrics.filter(m => m.name === name).map(m => m.value);
      acc[name] = {
        count: values.length,
        average: values.reduce((a, b) => a + b, 0) / values.length,
        min: Math.min(...values),
        max: Math.max(...values),
      };
      return acc;
    }, {} as Record<string, { count: number; average: number; min: number; max: number }>);
  }

  /**
   * Report Web Vitals if available
   */
  reportWebVitals() {
    if ('web-vital' in window) {
      // This would integrate with web-vitals library if installed
      console.log('Web Vitals reporting enabled');
    }
  }
}

export const performanceMonitor = new PerformanceMonitor();
