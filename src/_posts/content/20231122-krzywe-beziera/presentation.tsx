import dynamic from 'next/dynamic';

const BezierCurve = dynamic(
  () => import('@swistak-codes/presentations/bezier-curve'),
  {
    ssr: false,
  }
);

export const Presentation = () => {
  return <BezierCurve />;
};
