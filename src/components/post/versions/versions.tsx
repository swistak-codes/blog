import styles from './versions.module.scss';
import clsx from 'clsx';

interface Props {
  youtube?: string;
  english?: string;
}

export const Versions = ({ youtube, english }: Props) => (
  <>
    {youtube && (
      <div className={clsx(styles['container'], styles['youtube'])}>
        <i className="ph ph-youtube-logo"></i>
        <div>
          Wolisz wersję wideo?{' '}
          <a href={youtube} target="_blank" rel="noreferrer">
            Znajdziesz ją na YouTube!
          </a>
        </div>
      </div>
    )}
    {english && (
      <div className={clsx(styles['container'], styles['english'])}>
        <i className="ph ph-translate"></i>
        <div>
          Are you English-speaking?{' '}
          <a href={english} target="_blank" rel="noreferrer">
            Check out the English version!
          </a>
        </div>
      </div>
    )}
  </>
);
