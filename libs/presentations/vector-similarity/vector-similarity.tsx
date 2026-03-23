import { useState, useMemo } from 'react';
import styles from './styles.module.scss';
import data from './results.json';

const modelKeys = ['gemini', 'mistral', 'qwen', 'openai'] as const;
const algoKeys = ['euclid', 'manhattan', 'cosine', 'dotProduct'] as const;

const modelNames: Record<string, string> = {
  gemini: 'google/gemini-embedding-001',
  mistral: 'mistral/mistral-embed-2312',
  openai: 'openai/text-embedding-3-small',
  qwen: 'qwen/qwen3-embedding-8b',
};

const algoNames: Record<string, string> = {
  euclid: 'Odległość euklidesowa',
  manhattan: 'Odległość Manhattan',
  cosine: 'Podobieństwo kosinusowe',
  dotProduct: 'Iloczyn skalarny',
};

const VectorSimilarity = () => {
  const words = Object.keys(data);
  const [word, setWord] = useState(words[0] || '');
  const [model, setModel] = useState<(typeof modelKeys)[number]>(modelKeys[0]);
  const [algo, setAlgo] = useState<(typeof algoKeys)[number]>(algoKeys[0]);

  const items = useMemo(() => {
    if (!word) return [];
    const arr: Array<[string, number]> = data[word]?.[model]?.[algo] ?? [];
    return arr;
  }, [word, model, algo]);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <label className={styles.label} htmlFor="word-select">
          Tekst
        </label>
        <select
          id="word-select"
          className={styles.select}
          value={word}
          onChange={(e) => setWord(e.target.value)}
        >
          {words.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.row}>
        <label className={styles.label} htmlFor="model-select">
          Model
        </label>
        <select
          id="model-select"
          className={styles.select}
          value={model}
          onChange={(e) =>
            setModel(e.target.value as (typeof modelKeys)[number])
          }
        >
          {modelKeys.map((m) => (
            <option key={m} value={m}>
              {modelNames[m]}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.row}>
        <label className={styles.label} htmlFor="algo-select">
          Metryka
        </label>
        <select
          id="algo-select"
          className={styles.select}
          value={algo}
          onChange={(e) => setAlgo(e.target.value as (typeof algoKeys)[number])}
        >
          {algoKeys.map((a) => (
            <option key={a} value={a}>
              {algoNames[a]}
            </option>
          ))}
        </select>
      </div>

      <table className={styles.table}>
        <tbody>
          {items.map(([w, d], idx) => (
            <tr key={idx} className={styles.rowItem}>
              <td className={styles.word}>{w}</td>
              <td className={styles.distance}>{d.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VectorSimilarity;
