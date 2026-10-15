import { ReactNode, useEffect, useId, useRef, useState } from 'react';
import styles from './tabs.module.scss';

type Props = {
  tabs: readonly { label: string; content: ReactNode }[];
  label?: string;
};

export const Tabs = ({ tabs, label = 'Porównanie' }: Props) => {
  const id = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const selectedIndex = Math.min(activeIndex, tabs.length - 1);

  useEffect(() => {
    setEnhanced(true);
  }, []);

  if (!tabs.length) return null;

  return (
    <div className={styles.container} data-enhanced={enhanced}>
      {enhanced && (
        <div className={styles.tabList} role="tablist" aria-label={label}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              ref={(button) => {
                buttons.current[index] = button;
              }}
              className={styles.tab}
              type="button"
              role="tab"
              id={`${id}-tab-${index}`}
              aria-controls={`${id}-panel-${index}`}
              aria-selected={index === selectedIndex}
              tabIndex={index === selectedIndex ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onKeyDown={(event) => {
                let nextIndex: number;

                switch (event.key) {
                  case 'ArrowLeft':
                    nextIndex = (index - 1 + tabs.length) % tabs.length;
                    break;
                  case 'ArrowRight':
                    nextIndex = (index + 1) % tabs.length;
                    break;
                  case 'Home':
                    nextIndex = 0;
                    break;
                  case 'End':
                    nextIndex = tabs.length - 1;
                    break;
                  default:
                    return;
                }

                event.preventDefault();
                buttons.current[nextIndex]?.focus();
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
      {tabs.map((tab, index) => (
        <section
          key={index}
          className={styles.panel}
          id={`${id}-panel-${index}`}
          role={enhanced ? 'tabpanel' : undefined}
          aria-labelledby={`${id}-${enhanced ? 'tab' : 'heading'}-${index}`}
          tabIndex={enhanced && index === selectedIndex ? 0 : undefined}
          data-active={index === selectedIndex}
        >
          <h3 className={styles.heading} id={`${id}-heading-${index}`}>
            {tab.label}
          </h3>
          {typeof tab.content === 'string' ? (
            <p className={styles.text}>{tab.content}</p>
          ) : (
            tab.content
          )}
        </section>
      ))}
    </div>
  );
};
