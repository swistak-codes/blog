import styles from './gradient.module.scss';
import clsx from 'clsx';

type Props = {
  type:
    | 'linear'
    | 'linearAngle'
    | 'linearMultiple'
    | 'linearPartial'
    | 'radial'
    | 'conic';
};

const labels: Record<Props['type'], string> = {
  linearAngle:
    'Gradient liniowy rysowany od koloru magenta do żółtego narysowany pod kątem 45 stopni',
  conic:
    'Gradient układający się w stożek rysowany od koloru blado-fioletowego do blado-różowego',
  linear: 'Gradient liniowy rysowany od koloru czerwonego do zielonego',
  linearMultiple:
    'Gradient liniowy przechodzący od koloru czerwonego, przez żółty, przez zielony, przez niebieski aż do magenta',
  radial:
    'Gradient kołowy, gdzie w środku jest pełna przezroczystość, a na zewnątrz czerwony kolor',
  linearPartial:
    'Gradient liniowy przechodzący od czarnego do białego, jednak samo przejście kolorów odbywa się jedynie w przedziale 40%-60% szerokości wypełnionej figury.',
};

export const Gradient = ({ type }: Props) => (
  <div
    className={clsx(styles.container, styles[type])}
    aria-label={labels[type]}
    role="img"
  ></div>
);
