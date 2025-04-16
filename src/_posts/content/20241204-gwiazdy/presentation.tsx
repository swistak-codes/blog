import dynamic from 'next/dynamic';

const Stars1 = dynamic(() => import('@swistak-codes/presentations/stars1'), {
  ssr: false,
});

export const Presentation = () => {
  return <Stars1 />;
};
