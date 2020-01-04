import * as React from 'react';
import { Cartesian3, Color } from 'cesium';
import { Viewer, Entity } from 'resium';
import CustomDataSource from './CustomDataSource';

const App = () => {
  return (
    <Viewer full>
      <CustomDataSource name="custom">
        <Entity
          name="added to custom data source"
          description="Tokyo Station"
          position={Cartesian3.fromDegrees(139.767125, 35.681236, 100)}
          point={{ pixelSize: 10, color: Color.RED }}
        />
      </CustomDataSource>
    </Viewer>
  );
};

export default App;
