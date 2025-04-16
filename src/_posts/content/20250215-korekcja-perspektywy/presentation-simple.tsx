import dynamic from 'next/dynamic';

const Simple = dynamic(
  () =>
    import(
      '@swistak-codes/presentations/perspective-react-matrix3d/react-matrix3d'
    ),
  {
    ssr: false,
  },
);

export const PresentationSimple = () => {
  return <Simple />;
};
