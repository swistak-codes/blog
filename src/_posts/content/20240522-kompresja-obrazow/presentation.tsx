import dynamic from 'next/dynamic';

const Dct = dynamic(() => import('@swistak-codes/presentations/dct'), {
  ssr: false,
});

export const Presentation = () => {
  return <Dct />;
};
