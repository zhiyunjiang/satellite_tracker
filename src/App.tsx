import * as React from 'react';
import { Cartesian3 } from 'cesium';
import { Viewer, Entity } from 'resium';

const App = () => {
  return (
    <Viewer full>
      <Entity
        name="Tokyo"
        position={Cartesian3.fromDegrees(139.767052, 35.681167, 100)}
        point={{ pixelSize: 10 }}
        description="hoge"
      />
    </Viewer>
  );
};

export default App;
