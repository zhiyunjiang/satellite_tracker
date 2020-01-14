import * as React from 'react';
import { Viewer, Globe } from 'resium';
import SateliteOrbital from './components/SateliteOrbital';

const App: React.FC = () => {
  return (
    <Viewer full>
      <Globe enableLighting />
      <SateliteOrbital />
    </Viewer>
  );
};

export default App;
