import dynamic from 'next/dynamic';

const BinarySearch2d = dynamic(
  () =>
    import('@swistak-codes/presentations/binary-search-2d/binary-search-2d'),
  {
    ssr: false,
  },
);

export const Presentation = () => {
  return <BinarySearch2d />;
};
