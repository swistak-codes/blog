import dynamic from 'next/dynamic';

const JustCode = dynamic(
  () => import('@swistak-codes/presentations/two-factor-auth/just-code'),
  { ssr: false },
);

export const Presentation2 = () => {
  return <JustCode />;
};
