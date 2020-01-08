import * as React from 'react';
import CzmlDataSource from './components/CzmlDataSource';
import Viewer from './components/Viewer';
// import { getCurrentPosition } from './queries/orbitalQuery';

// const { useState, useCallback, useEffect } = React;

type CartographicDegrees = {
  lon: number;
  lat: number;
  alt: number;
};

// type OrbitalState = {
//   isLoading: boolean;
//   isError: boolean;
//   cartographicDegrees?: CartographicDegrees;
// };

// const useCurrentPosition = () => {
//   const [state, setState] = useState<OrbitalState>({
//     isLoading: true,
//     isError: false,
//     cartographicDegrees: undefined,
//   });

//   const fetchCurrentPosition = useCallback(async () => {
//     const res = await getCurrentPosition();
//     if (res.status >= 400) {
//       setState(prevState => {
//         return { ...prevState, isLoading: false, isError: true };
//       });
//     }
//     const cartographicDegrees = res.data as CartographicDegrees;
//     setState(prevState => {
//       return {
//         ...prevState,
//         isLoading: false,
//         isError: false,
//         cartographicDegrees: cartographicDegrees,
//       };
//     });
//   }, []);

//   useEffect(() => {
//     fetchCurrentPosition();
//   }, [fetchCurrentPosition]);

//   return { ...state };
// };

const App: React.FC = () => {
  // const { isError, isLoading, cartographicDegrees } = useCurrentPosition();
  // if (isLoading) return <div>Loading....</div>;
  // if (isError || !cartographicDegrees) return <div>Error!</div>;

  const cartographicDegrees: CartographicDegrees = {
    alt: 416530.30446614645,
    lat: 30.469724008809454,
    lon: -43.93648239793034,
  };
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
        cartographicDegrees: [
          cartographicDegrees.lon,
          cartographicDegrees.lat,
          cartographicDegrees.alt,
        ],
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
  ];
  return (
    <Viewer full>
      <CzmlDataSource data={czml} />
    </Viewer>
  );
};

export default App;
