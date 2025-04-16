import dynamic from 'next/dynamic';

type Props = {
  onlyClick?: boolean;
  showAxis?: boolean;
  showXY?: boolean;
  showAtan2?: boolean;
  showAtan?: boolean;
};

const Rotations = dynamic(
  () => import('@swistak-codes/presentations/rotations'),
  {
    ssr: false,
  }
);

export const Presentation = (props: Props) => {
  return <Rotations {...props} />;
};
