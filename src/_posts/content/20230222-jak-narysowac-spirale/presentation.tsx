import dynamic from 'next/dynamic';

const Spiral = dynamic(() => import('@swistak-codes/presentations/spiral'), {
  ssr: false,
});

export const Presentation = () => {
  return <Spiral />;
};
