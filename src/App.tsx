import * as React from 'react';
import { Viewer, Globe, Clock } from 'resium';
import SateliteOrbital from './components/SateliteOrbital';

const App: React.FC = () => {
  return (
    <Viewer full>
      <Globe enableLighting />
      <Clock shouldAnimate />
      <SateliteOrbital />
    </Viewer>
  );
};

export default App;
