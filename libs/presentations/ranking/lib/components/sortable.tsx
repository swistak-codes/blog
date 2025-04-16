import {
  Announcements,
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  MouseSensor,
  ScreenReaderInstructions,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToFirstScrollableAncestor } from '@dnd-kit/modifiers';
import { List } from './list';
import {
  NewIndexGetter,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SortableItem } from './sortable-item';
import { Wrapper } from './wrapper';
import { createPortal } from 'react-dom';
import { Item } from './item';
import { SortableElement } from '../logic/types';

interface Props {
  isDisabled: boolean;
  items: SortableElement[];
  removeItem: (item: SortableElement) => void;
  moveItem: (
    before: SortableElement | undefined,
    after: SortableElement | undefined,
    current: SortableElement,
  ) => void;
}

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

const screenReaderInstructions: ScreenReaderInstructions = {
  draggable: `
  Aby podnieść element sortowalny, naciśnij spację.
  Podczas sortowania użyj klawiszy strzałek, aby przesunąć element.
  Ponownie naciśnij spację, aby upuścić element w nowej pozycji, lub naciśnij escape, aby anulować.
`,
};

export function Sortable({ isDisabled, items, removeItem, moveItem }: Props) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
      onActivation(e) {
        const target = e.event.target;
        if (
          target instanceof HTMLElement &&
          typeof target.click === 'function'
        ) {
          target.click();
        }
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
      onActivation(e) {
        const target = e.event.target;
        if (
          target instanceof HTMLElement &&
          typeof target.click === 'function'
        ) {
          target.click();
        }
      },
    }),
    useSensor(KeyboardSensor, {
      scrollBehavior: 'auto',
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const isFirstAnnouncement = useRef(true);
  const getIndex = useCallback(
    (el: UniqueIdentifier) => items.findIndex((x) => x.id === el),
    [items],
  );
  const getPosition = useCallback(
    (el: UniqueIdentifier) => getIndex(el) + 1,
    [getIndex],
  );
  const activeIndex = useMemo(
    () => (activeId != null ? getIndex(activeId) : -1),
    [activeId, getIndex],
  );

  const announcements: Announcements = useMemo(
    () => ({
      onDragStart({ active: { id } }) {
        return `Podniesiono element sortowalny ${String(
          id,
        )}. Element sortowalny ${id} znajduje się na pozycji ${getPosition(
          id,
        )} z ${items.length}`;
      },
      onDragOver({ active, over }) {
        if (isFirstAnnouncement.current) {
          isFirstAnnouncement.current = false;
          return;
        }

        if (over) {
          return `Element sortowalny ${
            active.id
          } został przeniesiony na pozycję ${getPosition(over.id)} z ${
            items.length
          }`;
        }

        return;
      },
      onDragEnd({ active, over }) {
        if (over) {
          return `Element sortowalny ${
            active.id
          } został upuszczony na pozycję ${getPosition(over.id)} z ${
            items.length
          }`;
        }

        return;
      },
      onDragCancel({ active: { id } }) {
        return `Sortowanie zostało anulowane. Element sortowalny ${id} został upuszczony i powrócił na pozycję ${getPosition(
          id,
        )} z ${items.length}.`;
      },
    }),
    [getPosition, items.length],
  );

  useEffect(() => {
    if (activeId == null) {
      isFirstAnnouncement.current = true;
    }
  }, [activeId]);

  const handleRemove = useCallback(
    (id: UniqueIdentifier) => {
      const toRemove = items.find((x) => x.id === id);
      toRemove && removeItem(toRemove);
    },
    [items, removeItem],
  );

  const handleDragStart = useCallback(({ active }: DragStartEvent) => {
    if (!active) {
      return;
    }
    setActiveId(active.id);
  }, []);

  const handleDragEnd = useCallback(
    ({ over }: DragEndEvent) => {
      setActiveId(null);
      if (over) {
        const overIndex = getIndex(over.id);
        if (activeIndex !== overIndex) {
          if (overIndex === 0) {
            // to beginning
            moveItem(undefined, items[0], items[activeIndex]);
          } else if (overIndex < 0 || overIndex === items.length - 1) {
            // to end
            moveItem(items[items.length - 1], undefined, items[activeIndex]);
          } else {
            // in the middle
            moveItem(
              items[overIndex - 1],
              items[overIndex],
              items[activeIndex],
            );
          }
        }
      }
    },
    [getIndex, activeIndex, items, moveItem],
  );

  const handleDragCancel = useCallback(() => setActiveId(null), []);

  return (
    <DndContext
      accessibility={{
        announcements,
        screenReaderInstructions,
      }}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      modifiers={[restrictToFirstScrollableAncestor]}
    >
      <Wrapper>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <List>
            {items.map((value, index) => (
              <SortableItem
                key={value.id}
                id={value.id}
                index={index}
                disabled={isDisabled}
                onRemove={handleRemove}
                element={value}
              />
            ))}
            {items.length === 0 && (
              <Item
                value={{ id: 'empty', rank: 'empty' }}
                disabled={true}
                dragging={false}
                sorting={false}
                index={0}
                transform={undefined}
                transition={undefined}
                listeners={undefined}
                data-index={0}
                data-id={'empty'}
                dragOverlay={false}
              />
            )}
          </List>
        </SortableContext>
      </Wrapper>
    </DndContext>
  );
}
