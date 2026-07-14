import type { ReactPlayerProps } from 'react-player/types';
import styles from './video-player.module.scss';
import imageStyles from './image.module.scss';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

type AdditionalProps = {
  caption: JSX.Element;
  url: string;
};

const CDN_ADDRESS = 'https://lightbulb-sun.swistak.codes/shared';

export const VideoPlayer = ({
  caption,
  height,
  width,
  url,
  ...props
}: ReactPlayerProps & AdditionalProps) => {
  return (
    <figure className={clsx(imageStyles.figure, imageStyles.alignCenter)}>
      <div
        className={styles.wrapper}
        style={{
          maxWidth: `${width}px`,
          maxHeight: `${height}px`,
          paddingTop: `${
            100 / (parseInt(width + '') / parseInt(height + ''))
          }%`,
        }}
      >
        <ReactPlayer
          config={{
            html: {
              attributes: {
                controlsList: 'nodownload',
              },
            },
          }}
          height="100%"
          width="100%"
          src={`${CDN_ADDRESS}${url}`}
          className={styles.player}
          {...props}
        />
      </div>
      <figcaption className={imageStyles.caption}>{caption}</figcaption>
    </figure>
  );
};
