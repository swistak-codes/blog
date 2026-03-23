import dynamic from 'next/dynamic';

const VectorAnalogy = dynamic(
  () => import('@swistak-codes/presentations/vector-similarity/vector-analogy'),
  { ssr: false },
);

export const Presentation2 = () => {
  return <VectorAnalogy />;
};
