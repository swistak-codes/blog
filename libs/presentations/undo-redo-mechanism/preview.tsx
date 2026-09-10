import styles from './undo-redo-mechanism.module.scss';
import { useState } from 'react';
import { One } from './one';
import { Two } from './two';

type Tabs = 'one' | 'two';

export const Preview = () => {
  const [currentTab, setCurrentTab] = useState<Tabs>('one');

  return (
    <>
      <div className={styles.controls}>
        <button
          onClick={() => setCurrentTab('one')}
          disabled={currentTab === 'one'}
        >
          Jedna tablica
        </button>
        <button
          onClick={() => setCurrentTab('two')}
          disabled={currentTab === 'two'}
        >
          Oddzielne tablice
        </button>
      </div>
      {currentTab === 'one' && <One />}
      {currentTab === 'two' && <Two />}
    </>
  );
};
