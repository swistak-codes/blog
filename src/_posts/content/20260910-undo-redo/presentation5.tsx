import dynamic from 'next/dynamic';

const UndoRedoReplay = dynamic(
  () =>
    import('@swistak-codes/presentations/undo-redo-replay/undo-redo-replay'),
  {
    ssr: false,
  },
);

export const Presentation5 = () => {
  return <UndoRedoReplay />;
};
