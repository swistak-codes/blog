import React, { useEffect } from 'react';
import clsx from 'clsx';
import type { DraggableSyntheticListeners } from '@dnd-kit/core';
import type { Transform } from '@dnd-kit/utilities';
import { Remove } from './remove';
import styles from '../presentations-ranking.module.scss';
import { SortableElement } from '../logic/types';

export interface Props {
  dragOverlay?: boolean;
  color?: string;
  disabled?: boolean;
  dragging?: boolean;
  height?: number;
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  value: SortableElement;
  onRemove?: () => void;
}

export const Item = React.memo(
  React.forwardRef<HTMLLIElement, Props>(
    (
      {
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        height,
        index,
        listeners,
        onRemove,
        sorting,
        style,
        transition,
        transform,
        value,
        wrapperStyle,
        ...props
      },
      ref
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = 'grabbing';

        return () => {
          document.body.style.cursor = '';
        };
      }, [dragOverlay]);

      return (
        <li
          className={clsx(
            styles['wrapper'],
            fadeIn && styles['fade-in'],
            sorting && styles['sorting'],
            dragOverlay && styles['drag-overlay']
          )}
          style={
            {
              ...wrapperStyle,
              transition: [transition, wrapperStyle?.transition]
                .filter(Boolean)
                .join(', '),
              '--translate-x': transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              '--translate-y': transform
                ? `${Math.round(transform.y)}px`
                : undefined,
              '--scale-x': transform?.scaleX
                ? `${transform.scaleX}`
                : undefined,
              '--scale-y': transform?.scaleY
                ? `${transform.scaleY}`
                : undefined,
              '--index': index,
              '--color': color,
            } as React.CSSProperties
          }
          ref={ref}
          {...listeners}
        >
          <div
            className={clsx(
              styles['item'],
              dragging && styles['dragging'],
              dragOverlay && styles['drag-overlay'],
              disabled && styles['disabled'],
              color && styles['color']
            )}
            style={style}
            {...props}
          >
            {value.id === 'empty' ? (
              <>Brak elementów!</>
            ) : (
              <>
                ID: {value.id}
                <br />
                {value.rank}
                <span className={styles['actions']}>
                  <Remove
                    className={styles['remove']}
                    onClick={() => onRemove?.()}
                  />
                </span>
              </>
            )}
          </div>
        </li>
      );
    }
  )
);
