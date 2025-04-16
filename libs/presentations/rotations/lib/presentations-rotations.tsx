import { MouseEvent, useRef, useState } from 'react';
import { Arrow } from './arrow';
import styles from './styles.module.scss';
import clsx from 'clsx';

const AXIS_VALS = [10, 20, 30, 40, 50, 60, 70, 80, 90];

export interface PresentationsRotationsProps {
  onlyClick?: boolean;
  showAxis?: boolean;
  showXY?: boolean;
  showAtan2?: boolean;
  showAtan?: boolean;
}

export const PresentationsRotations = ({
  onlyClick = false,
  showAtan = false,
  showAtan2 = false,
  showXY = false,
  showAxis = false,
}: PresentationsRotationsProps) => {
  const [angle, setAngle] = useState(0);
  const [atan, setAtan] = useState(0);
  const [xy, setXy] = useState([0, 0]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRotate = (e: MouseEvent) => {
    if (containerRef.current == null) {
      return;
    }
    const containerRect = containerRef.current.getBoundingClientRect();
    const arrowX = containerRect.left + containerRect.width / 2;
    const arrowY = containerRect.top + containerRect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const y = mouseY - arrowY;
    const x = mouseX - arrowX;
    const angle = Math.atan2(y, x);
    setAngle(angle);
    if (setAtan) {
      const atan = Math.atan(y / x);
      setAtan(atan);
    }
    if (showXY) {
      setXy([x, y]);
    }
  };

  const handleMouseOver = (e: MouseEvent) => {
    if (onlyClick) {
      return;
    }
    handleRotate(e);
  };

  return (
    <>
      <div
        className={styles.container}
        ref={containerRef}
        onClick={handleRotate}
        onMouseMove={handleMouseOver}
      >
        {showAxis && (
          <>
            {AXIS_VALS.map((val) => (
              <>
                <div
                  className={clsx({
                    [styles.verticalLine]: true,
                    [styles.centerVertical]: val === 50,
                  })}
                  style={{
                    left: `${val}%`,
                  }}
                  key={'v' + val}
                />
                <div
                  className={clsx({
                    [styles.horizontalLine]: true,
                    [styles.centerHorizontal]: val === 50,
                  })}
                  style={{
                    top: `${val}%`,
                  }}
                  key={'h' + val}
                />
              </>
            ))}
          </>
        )}
        <Arrow
          className={styles.rotatedArrow}
          style={{
            transform: `translate(-50%, -50%) rotate(${angle}rad)`,
          }}
        />
      </div>
      {(showXY || showAtan || showAtan2) && (
        <ul className={styles.textContainer}>
          {showXY && (
            <>
              <li>x = {xy[0].toFixed(0)}</li>
              <li>y = {xy[1].toFixed(0)}</li>
            </>
          )}
          {showAtan && (
            <li>
              atan(y / x) = {atan.toFixed(4)} rad ={' '}
              {((atan * 180) / Math.PI).toFixed(4)} stopni
            </li>
          )}
          {showAtan && (
            <li>
              atan2(y, x) = {angle.toFixed(4)} rad ={' '}
              {((angle * 180) / Math.PI).toFixed(4)} stopni
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default PresentationsRotations;
