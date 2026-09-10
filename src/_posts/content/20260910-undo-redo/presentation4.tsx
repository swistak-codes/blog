import dynamic from 'next/dynamic';

const UndoRedoDelta = dynamic(
  () => import('@swistak-codes/presentations/undo-redo-delta/undo-redo-delta'),
  {
    ssr: false,
  },
);

export const Presentation4 = () => {
  return <UndoRedoDelta />;
};
