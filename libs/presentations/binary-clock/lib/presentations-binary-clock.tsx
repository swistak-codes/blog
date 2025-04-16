import { BinaryClock } from './binary-clock';
import { BcdClock } from './bcd-clock';

type Props = {
  type: 'binary' | 'bcd';
};

const PresentationsBinaryClock = ({ type }: Props) => {
  if (type === 'binary') {
    return <BinaryClock />;
  } else if (type === 'bcd') {
    return <BcdClock />;
  }
  return null;
};

export default PresentationsBinaryClock;
