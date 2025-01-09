import ReactGA from 'react-ga4';

const TRACKING_ID = "G-HJFPDZN7H9"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(TRACKING_ID);

export const trackPageView = (page) => {
  ReactGA.send({ hitType: "pageview", page });
};