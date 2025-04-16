import dynamic from 'next/dynamic';

const Ranking = dynamic(() => import('@swistak-codes/presentations/ranking'), {
  ssr: false,
});

interface Props {
  algorithm: 'simple' | 'lexorank';
}

export const Presentation = ({ algorithm }: Props) => {
  return <Ranking algorithm={algorithm} />;
};
