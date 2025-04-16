import { useCallback, useEffect, useState } from 'react';
import { SCROLL_MARGIN } from '../../shared/consts';
import styles from './move-to-top.module.scss';
import commonStyles from '../common.module.scss';
import clsx from 'clsx';

const DESCRIPTION = 'Przewiń do góry';

export const MoveToTop = () => {
  const [opacity, setOpacity] = useState(0);

  const handleWindowScroll = useCallback(() => {
    const scroll = Math.max(
      document.body.scrollTop,
      document.documentElement.scrollTop
    );
    if (scroll < SCROLL_MARGIN) {
      setOpacity(scroll / SCROLL_MARGIN);
    } else {
      setOpacity(1);
    }
  }, [setOpacity]);

  const handleClick = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, [handleWindowScroll]);

  return (
    <button
      className={clsx({ [styles.button]: true, [styles.visible]: opacity > 0 })}
      style={{ opacity }}
      onClick={handleClick}
      title={DESCRIPTION}
    >
      <i className="ph ph-arrow-up" />
      <span className={commonStyles.hideVisually}>{DESCRIPTION}</span>
    </button>
  );
};
