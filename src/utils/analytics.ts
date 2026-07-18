interface AnalyticsEvent {
  event: string;
  timestamp: number;
  data?: Record<string, unknown>;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private readonly storageKey = 'no-analytics';

  constructor() {
    this.loadEvents();
  }

  private loadEvents() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.events = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load analytics:', e);
    }
  }

  private saveEvents() {
    try {
      // Keep only last 1000 events
      const recentEvents = this.events.slice(-1000);
      localStorage.setItem(this.storageKey, JSON.stringify(recentEvents));
      this.events = recentEvents;
    } catch (e) {
      console.warn('Failed to save analytics:', e);
    }
  }

  track(event: string, data?: Record<string, unknown>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      timestamp: Date.now(),
      data,
    };

    this.events.push(analyticsEvent);
    this.saveEvents();

    // Log to console in development
    if (import.meta.env.DEV) {
      console.log('[Analytics]', event, data);
    }
  }

  getStats() {
    const now = Date.now();
    const last24h = now - 24 * 60 * 60 * 1000;
    const last7d = now - 7 * 24 * 60 * 60 * 1000;

    const recent24h = this.events.filter(e => e.timestamp > last24h);
    const recent7d = this.events.filter(e => e.timestamp > last7d);

    return {
      total: this.events.length,
      last24h: recent24h.length,
      last7d: recent7d.length,
    };
  }

  getMostPopularResponses(limit = 10) {
    const responseViews = this.events
      .filter(e => e.event === 'response_viewed' && e.data?.reason)
      .reduce((acc, e) => {
        const reason = e.data!.reason as string;
        acc[reason] = (acc[reason] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(responseViews)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([reason, count]) => ({ reason, count }));
  }
}

export const analytics = new Analytics();
