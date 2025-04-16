import dynamic from 'next/dynamic';

const ConvexHull = dynamic(
  () => import('@swistak-codes/presentations/convex-hull'),
  {
    ssr: false,
  }
);

export const Presentation = () => {
  return <ConvexHull />;
};
