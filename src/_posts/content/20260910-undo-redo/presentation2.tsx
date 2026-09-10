import dynamic from 'next/dynamic';

const UndoRedoMemento = dynamic(
  () =>
    import('@swistak-codes/presentations/undo-redo-memento/undo-redo-memento'),
  {
    ssr: false,
  },
);

export const Presentation2 = () => {
  return <UndoRedoMemento />;
};
