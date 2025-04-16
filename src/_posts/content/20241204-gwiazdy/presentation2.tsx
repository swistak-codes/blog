import dynamic from 'next/dynamic';

const Stars2 = dynamic(() => import('@swistak-codes/presentations/stars2'), {
  ssr: false,
});

export const Presentation2 = () => {
  return <Stars2 />;
};
