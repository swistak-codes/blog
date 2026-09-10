import dynamic from 'next/dynamic';

const UndoRedoMechanism = dynamic(
  () =>
    import(
      '@swistak-codes/presentations/undo-redo-mechanism/undo-redo-mechanism'
    ),
  {
    ssr: false,
  },
);

export const Presentation1 = () => {
  return <UndoRedoMechanism />;
};
