import { Suspense, useState } from 'react';
import { tabComponentMap, Tabs, tabsList } from './helpers/tabs';
import styles from './styles.module.scss';
import clsx from 'clsx';

export const PresentationsGraphAstar = ({ className = '' }) => {
  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.Maze);
  const Component = tabComponentMap[currentTab];

  return (
    <div className={className}>
      <div className={clsx(styles.controlsContainer, styles.bottomPadding)}>
        {tabsList.map(({ name, tab }) => (
          <button
            onClick={() => setCurrentTab(tab)}
            className={clsx({ [styles.selectedButton]: currentTab === tab })}
            key={tab}
          >
            {name}
          </button>
        ))}
      </div>
      <Suspense fallback={<div>Ładowanie prezentacji...</div>}>
        <Component />
      </Suspense>
    </div>
  );
};
