import dynamic from 'next/dynamic';

interface Props {
  variant: 'mean' | 'scale' | 'median' | 'mode';
}

const Color = dynamic(
  () => import('@swistak-codes/presentations/dominant-color'),
  {
    ssr: false,
  },
);

export const Presentation = ({ variant }: Props) => {
  return <Color variant={variant} />;
};
