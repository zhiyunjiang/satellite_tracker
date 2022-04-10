import { VFC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';

type IconName = 'location-crosshairs';

type Props = {
  iconName: IconName;
  className?: string;
};

const Icon: VFC<Props> = ({ iconName, className }) => {
  switch (iconName) {
    case 'location-crosshairs': {
      return (
        <FontAwesomeIcon icon={faLocationCrosshairs} className={className} />
      );
    }
    default: {
      const strangeValue: never = iconName;
      throw Error(`iconName is invalid. iconName: ${strangeValue}`);
    }
  }
};

export default Icon;
