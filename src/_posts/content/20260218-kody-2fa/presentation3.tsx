import dynamic from 'next/dynamic';

const CustomGenerator = dynamic(
  () => import('@swistak-codes/presentations/two-factor-auth/custom-generator'),
  { ssr: false },
);

export const Presentation3 = () => {
  return <CustomGenerator />;
};
