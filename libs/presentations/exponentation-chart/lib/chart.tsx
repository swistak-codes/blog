import Plotly from 'plotly.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import localeDictionary from './pl';
import Plot from 'react-plotly.js';
import exp2bigintData from './data/exp2bigint.json';
import exp2numberData from './data/exp2number.json';
import exp3bigintData from './data/exp3bigint.json';
import exp3numberData from './data/exp3number.json';
import { useState } from 'react';
import styles from './styles.module.scss';

const datasets = {
  exp2bigint: 'exp2bigint',
  exp2number: 'exp2number',
  exp3bigint: 'exp3bigint',
  exp3number: 'exp3number',
} as const;

type DatasetName = typeof datasets[keyof typeof datasets];

type Props = {
  dataset: DatasetName;
};

const datasetNameToData: Record<DatasetName, any[]> = {
  exp2bigint: exp2bigintData,
  exp2number: exp2numberData,
  exp3bigint: exp3bigintData,
  exp3number: exp3numberData,
};

const datasetNameToTitle: Record<DatasetName, string> = {
  exp2bigint: 'Potęgowanie liczby 2 (BigInt)',
  exp2number: 'Potęgowanie liczby 2',
  exp3bigint: 'Potęgowanie liczby 3 (BigInt)',
  exp3number: 'Potęgowanie liczby 3',
};

export const Chart = ({ dataset }: Props) => {
  const [isLog, setIsLog] = useState(false);

  return (
    <div className={styles.container}>
      <div>
        <Plot
          data={datasetNameToData[dataset]}
          layout={{
            title: datasetNameToTitle[dataset],
            legend: {
              title: { text: 'Algorytm', side: 'top' },
              orientation: 'h',
              y: -0.3,
            },
            modebar: {
              remove: ['lasso2d', 'toImage', 'select2d'],
            },
            xaxis: {
              title: 'Wykładnik',
            },
            yaxis: {
              title: 'Czas [ns]',
              type: isLog ? 'log' : 'linear',
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
      <div>
        <label>
          <input
            type="checkbox"
            checked={isLog}
            onChange={(e) => setIsLog((x) => !x)}
          />
          Skala logarytmiczna?
        </label>
      </div>
    </div>
  );
};
