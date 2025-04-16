import React, { useState } from 'react';
import NextImage from 'next/legacy/image';
import clsx from 'clsx';
import styles from './image.module.scss';
import ReactModal from 'react-modal';
import { ImageData } from '@swistak-codes/types';

type Props = {
  image: ImageData;
  alignCenter?: boolean;
  alignRight?: boolean;
  alignLeft?: boolean;
  fullSize?: boolean;
  caption: JSX.Element;
  alt?: string;
  title?: string;
  maxWidth?: string;
  radius?: string;
  forceWhiteBackground?: boolean;
  notClickable?: boolean;
  unoptimized?: boolean;
  noPlaceholder?: boolean;
};

export const Image = ({
  image,
  alignCenter = false,
  alignRight = false,
  alignLeft = false,
  fullSize = false,
  maxWidth,
  // eslint-disable-next-line react/jsx-no-useless-fragment
  caption = <></>,
  alt = '',
  title = '',
  radius = '0%',
  forceWhiteBackground = true,
  notClickable = false,
  unoptimized = false,
  noPlaceholder = false,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    if (!notClickable) {
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <figure
        className={clsx({
          [styles.figure]: true,
          [styles.alignCenter]: alignCenter,
          [styles.alignRight]: alignRight,
          [styles.alignLeft]: alignLeft,
          [styles.forceWhiteBackground]: forceWhiteBackground,
        })}
        style={{ maxWidth: maxWidth || '100%' }}
      >
        <NextImage
          src={image}
          alt={alt}
          title={title}
          placeholder={noPlaceholder ? 'empty' : 'blur'}
          onClick={handleImageClick}
          style={{ borderRadius: radius || '0' }}
          unoptimized={unoptimized}
          className={clsx({
            [styles.image]: true,
            [styles.notClickable]: notClickable,
          })}
        />
        <figcaption className={styles.caption}>{caption}</figcaption>
      </figure>
      {!notClickable && (
        <ReactModal
          isOpen={isModalOpen}
          contentLabel="Powiększenie zdjęcia"
          onRequestClose={handleModalClose}
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
          closeTimeoutMS={500}
          portalClassName={styles.modal}
          className={styles.modalContent}
          overlayClassName={styles.modalOverlay}
        >
          <div
            onClick={handleModalClose}
            className={styles.modalContentWrapper}
          >
            <div className={styles.modalContent}>
              <NextImage
                src={image}
                alt={alt}
                title={title}
                placeholder={noPlaceholder ? 'empty' : 'blur'}
                layout="fill"
                objectFit="contain"
                unoptimized={unoptimized}
              />
            </div>
            <i
              className={clsx({
                [styles.x]: true,
                'ph ph-x': true,
              })}
            />
          </div>
        </ReactModal>
      )}
    </>
  );
};
