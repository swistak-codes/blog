import dynamic from 'next/dynamic';

const VectorSimilarity = dynamic(
  () =>
    import('@swistak-codes/presentations/vector-similarity/vector-similarity'),
  { ssr: false },
);

export const Presentation = () => {
  return <VectorSimilarity />;
};
