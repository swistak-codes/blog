import dynamic from 'next/dynamic';

const LlmChart = dynamic(
  () => import('@swistak-codes/presentations/llm-distribution-chart'),
  {
    ssr: false,
    loading: () => <div>Wczytywanie wykresu...</div>,
  },
);

export const Presentation = () => {
  return <LlmChart />;
};
