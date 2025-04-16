import dynamic from 'next/dynamic';

const Gradient = dynamic(
  () => import('@swistak-codes/presentations/gradient'),
  {
    ssr: false,
  }
);

type Props = {
  type: 'linearRgb' | 'linearHsl' | 'polynomial' | 'bezier3d';
};

export const Presentation = ({ type }: Props) => {
  return <Gradient type={type} />;
};
