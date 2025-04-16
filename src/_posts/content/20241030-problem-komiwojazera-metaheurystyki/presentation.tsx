import dynamic from 'next/dynamic';

type Props = {
  algorithms: (
    | 'sa'
    | 'simple-hc'
    | 'steepest-ascent-hc'
    | 'nn'
    | 'rnn'
    | 'christofides'
    | 'held-karp'
    | 'brute-force'
  )[];
};

const Tsp = dynamic(() => import('@swistak-codes/presentations/tsp'), {
  ssr: false,
});

export const Presentation = ({ algorithms }: Props) => {
  return <Tsp algorithms={algorithms} />;
};
