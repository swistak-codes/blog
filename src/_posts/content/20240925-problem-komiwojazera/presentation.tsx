import dynamic from 'next/dynamic';

type Props = {
  algorithms: ('brute-force' | 'held-karp')[];
};

const Tsp = dynamic(() => import('@swistak-codes/presentations/tsp'), {
  ssr: false,
});

export const Presentation = ({ algorithms }: Props) => {
  return <Tsp algorithms={algorithms} />;
};
