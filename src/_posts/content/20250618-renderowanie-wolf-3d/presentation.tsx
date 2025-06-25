import dynamic from 'next/dynamic';

const RayCasting = dynamic(
  () => import('@swistak-codes/presentations/ray-casting'),
  {
    ssr: false,
  },
);

export const Presentation = () => {
  return <RayCasting />;
};
