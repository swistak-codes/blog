import dynamic from 'next/dynamic';

const Full = dynamic(
  () =>
    import('@swistak-codes/presentations/perspective-react-full/react-full'),
  {
    ssr: false,
  },
);

export const PresentationFull = () => {
  return <Full />;
};
