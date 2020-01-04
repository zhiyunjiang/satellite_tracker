import * as React from 'react';
import CzmlDataSource from './components/CzmlDataSource';
import Viewer from './components/Viewer';

const czml = [
  {
    id: 'document',
    name: 'CZML',
    version: '1.0',
  },
  {
    id: 'shape1',
    name: 'TOKYO',
    position: {
      cartographicDegrees: [139.77, 35.68, 20000.0],
    },
    ellipse: {
      semiMinorAxis: 50000.0,
      semiMajorAxis: 50000.0,
      height: 20000,
      material: {
        solidColor: {
          color: {
            rgba: [0, 255, 0, 100],
          },
        },
      },
      outline: true,
      outlineColor: {
        rgba: [255, 0, 0, 0],
      },
    },
  },
  {
    id: 'shape2',
    name: 'line',
    description: 'ライン',
    polyline: {
      positions: {
        cartographicDegrees: [141.064, 38.366, 0, 135.19, 35.567, 0, 132.318, 34.297, 0],
      },
      material: {
        solidColor: {
          color: {
            rgba: [255, 255, 255, 100],
          },
        },
      },
      width: 0.5,
    },
  },
];

const App = () => {
  return (
    <Viewer full>
      <CzmlDataSource data={czml} />
    </Viewer>
  );
};

export default App;
