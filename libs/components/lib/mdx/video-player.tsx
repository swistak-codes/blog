import type { BaseReactPlayerProps } from 'react-player/base';
import styles from './video-player.module.scss';
import imageStyles from './image.module.scss';
import clsx from 'clsx';
import ReactPlayer from 'react-player/lazy';

type AdditionalProps = {
  caption: JSX.Element;
};

const CDN_ADDRESS = 'https://anesthetize.swistak.codes';

export const VideoPlayer = ({
  caption,
  height,
  width,
  url,
  ...props
}: BaseReactPlayerProps & AdditionalProps) => {
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
            file: {
              attributes: {
                controlsList: 'nodownload',
              },
            },
          }}
          height="100%"
          width="100%"
          url={`${CDN_ADDRESS}${url}`}
          className={styles.player}
          {...props}
        />
      </div>
      <figcaption className={imageStyles.caption}>{caption}</figcaption>
    </figure>
  );
};
