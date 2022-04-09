import { VFC } from 'react';
import {
  SContainer,
  SHeader,
  SHeaderText,
  SBody,
  SItem,
  SItemLabel,
  SItemContent,
} from './styles';

const LocationPanel: VFC = () => {
  return (
    <SContainer>
      <SHeader>
        <SHeaderText>Location</SHeaderText>
      </SHeader>
      <SBody>
        <SItem>
          <SItemLabel>
            <span>Longitude</span>
            <span>:</span>
          </SItemLabel>
          <SItemContent>-37.89°</SItemContent>
        </SItem>
        <SItem>
          <SItemLabel>
            <span>Latitude</span>
            <span>:</span>
          </SItemLabel>
          <SItemContent>-37.89°</SItemContent>
        </SItem>
        <SItem>
          <SItemLabel>
            <span>Height</span>
            <span>:</span>
          </SItemLabel>
          <SItemContent>431.79 km</SItemContent>
        </SItem>
      </SBody>
    </SContainer>
  );
};

export default LocationPanel;
