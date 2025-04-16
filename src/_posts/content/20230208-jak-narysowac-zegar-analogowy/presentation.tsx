import dynamic from 'next/dynamic';

const Clock = dynamic(() => import('@swistak-codes/presentations/clock'), {
  ssr: false,
});

export const Presentation = () => {
  return <Clock />;
};
