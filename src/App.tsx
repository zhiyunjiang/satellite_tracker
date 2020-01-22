import * as React from 'react';
import { Viewer, Globe, Clock } from 'resium';
import SateliteOrbital from './components/SateliteOrbital';
import { useTracker } from './utils/analitics';
import { createBrowserHistory } from 'history';

const App: React.FC = () => {
  useTracker(createBrowserHistory());
  return (
    <Viewer full>
      <Globe enableLighting />
      <Clock shouldAnimate />
      <SateliteOrbital />
    </Viewer>
  );
};

export default App;
