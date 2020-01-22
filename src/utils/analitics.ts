import { useEffect, useCallback } from 'react';
import * as ReactGA from 'react-ga';
import * as H from 'history';

const trackingCode = process.env.GA_TRACKING_CODE || '';

ReactGA.initialize(trackingCode, {
  testMode: !trackingCode,
});

export const useTracker = (history: H.History) => {
  const trackPage = useCallback((location: H.Location) => {
    const page = location.pathname;
    ReactGA.pageview(page);
  }, []);

  useEffect(() => {
    trackPage(history.location);
  }, [history]);
};
