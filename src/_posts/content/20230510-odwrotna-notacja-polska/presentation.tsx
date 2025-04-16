import dynamic from 'next/dynamic';

const Rpn = dynamic(() => import('@swistak-codes/presentations/rpn'), {
  ssr: false,
});

export const Presentation = () => {
  return <Rpn />;
};
