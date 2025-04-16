import dynamic from 'next/dynamic';

type Props = {
  type: 'binary' | 'bcd';
};

const Clock = dynamic(
  () => import('@swistak-codes/presentations/binary-clock'),
  {
    ssr: false,
  }
);

export const Presentation = ({ type }: Props) => {
  return <Clock type={type} />;
};
