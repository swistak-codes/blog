import { UniqueIdentifier } from '@dnd-kit/core';
import { NewIndexGetter, useSortable } from '@dnd-kit/sortable';
import { Item } from './item';
import { SortableElement } from '../logic/types';

interface SortableItemProps {
  disabled?: boolean;
  getNewIndex?: NewIndexGetter;
  id: UniqueIdentifier;
  index: number;
  onRemove(id: UniqueIdentifier): void;
  element: SortableElement;
}

export function SortableItem({
  disabled,
  id,
  index,
  onRemove,
  element,
}: SortableItemProps) {
  const {
    attributes,
    isDragging,
    isSorting,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    disabled,
  });

  return (
    <Item
      ref={setNodeRef}
      value={element}
      disabled={disabled}
      dragging={isDragging}
      sorting={isSorting}
      index={index}
      onRemove={() => onRemove(id)}
      transform={transform}
      transition={transition}
      listeners={listeners}
      data-index={index}
      data-id={id}
      dragOverlay={isDragging}
      {...attributes}
    />
  );
}
