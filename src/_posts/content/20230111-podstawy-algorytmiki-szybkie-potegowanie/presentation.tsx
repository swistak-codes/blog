import dynamic from 'next/dynamic';

const ExponentationChart = dynamic(
  () => import('@swistak-codes/presentations/exponentation-chart'),
  {
    ssr: false,
    loading: () => <div>Wczytywanie wykresu...</div>,
  }
);

const datasets = {
  exp2bigint: 'exp2bigint',
  exp2number: 'exp2number',
  exp3bigint: 'exp3bigint',
  exp3number: 'exp3number',
} as const;

type DatasetName = typeof datasets[keyof typeof datasets];

type Props = {
  dataset: DatasetName;
};

export const Presentation = ({ dataset }: Props) => {
  return <ExponentationChart dataset={dataset} />;
};
