import dynamic from 'next/dynamic';

const Crt = dynamic(() => import('@swistak-codes/presentations/crt/crt'), {
  ssr: false,
});

export const Presentation = () => {
  return <Crt />;
};
