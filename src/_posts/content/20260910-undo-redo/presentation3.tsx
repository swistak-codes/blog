import dynamic from 'next/dynamic';

const UndoRedoCommand = dynamic(
  () =>
    import('@swistak-codes/presentations/undo-redo-command/undo-redo-command'),
  {
    ssr: false,
  },
);

export const Presentation3 = () => {
  return <UndoRedoCommand />;
};
