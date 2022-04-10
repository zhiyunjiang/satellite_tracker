import { VFC } from 'react';
import { Tle } from '@/models/Tle/types';
import {
  SContainer,
  SHeader,
  SIcon,
  SHeaderText,
  SBody,
  SItem,
  SItemLabel,
  SItemContent,
} from './styles';
import { useLocationPanel } from './hooks';

type Props = {
  tle: Tle;
};

const LocationPanel: VFC<Props> = ({ tle }) => {
  const { longitude, latitude, heigth } = useLocationPanel(tle);

  return (
    <SContainer>
      <SHeader>
        <SIcon iconName="location-crosshairs" />
        <SHeaderText>Location</SHeaderText>
      </SHeader>
      <SBody>
        <SItem>
          <SItemLabel>
            <span>Longitude</span>
            <span>:</span>
          </SItemLabel>
          <SItemContent>{longitude && `${longitude}°`}</SItemContent>
        </SItem>
        <SItem>
          <SItemLabel>
            <span>Latitude</span>
            <span>:</span>
          </SItemLabel>
          <SItemContent>{latitude && `${latitude}°`}</SItemContent>
        </SItem>
        <SItem>
          <SItemLabel>
            <span>Height</span>
            <span>:</span>
          </SItemLabel>
          <SItemContent>{heigth && `${heigth} km`}</SItemContent>
        </SItem>
      </SBody>
    </SContainer>
  );
};

export default LocationPanel;
