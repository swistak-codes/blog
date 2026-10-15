import Plotly from 'plotly.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import localeDictionary from './pl';
import Plot from 'react-plotly.js';
import styles from './styles.module.scss';
import rawData from './random-number-distribution-wide.json';

const data = rawData.map(
  (trace): Plotly.Data => ({
    ...trace,
    x: trace.x.filter((_, index) => trace.y[index] > 0).map(String),
    y: trace.y.filter((value) => value > 0),
    type: 'bar' as const,
    hovertemplate: '%{y:.1f}%<extra>%{fullData.name}</extra>',
  }),
);

const numbers = rawData[0].x
  .filter((_, index) => rawData.some((trace) => trace.y[index] > 0))
  .map(String);

export const Chart = () => {
  return (
    <div className={styles.container}>
      <div>
        <Plot
          data={data}
          layout={{
            barmode: 'group',
            hovermode: 'x unified',
            hoverlabel: { namelength: -1 },
            legend: {
              title: { text: 'Model', side: 'top' },
              orientation: 'h',
              y: -0.3,
            },
            modebar: {
              remove: ['lasso2d', 'toImage', 'select2d'],
            },
            xaxis: {
              title: 'Liczba',
              type: 'category',
              categoryorder: 'array',
              categoryarray: numbers,
              range: [-0.5, numbers.length - 0.5],
              autorange: false,
              tickangle: -45,
            },
            yaxis: {
              title: 'Udział odpowiedzi (%)',
              type: 'linear',
              range: [0, 100],
              autorange: false,
            },
            height: 600,
            autosize: true,
            margin: {
              r: 20,
            },
          }}
          config={{
            responsive: true,
            showEditInChartStudio: false,
            showSendToCloud: false,
            autosizable: true,
            sendData: false,
            locales: {
              pl: localeDictionary,
            },
            locale: 'pl',
          }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};
