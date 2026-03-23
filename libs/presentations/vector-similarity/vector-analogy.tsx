import { useState, useMemo, useEffect } from 'react';
import styles from './styles.module.scss';
import data from './analogy-results.json';

const modelKeys = Object.keys(data) as Array<keyof typeof data>;

const formatPct = (val: number | null) =>
  val == null ? 'N/A' : `${(val * 100).toFixed(1)}%`;

const categoryNames: Record<string, string> = {
  capitals: 'Stolice',
  nationalities: 'Narodowości',
  plurals: 'Liczba mnoga',
  occupations: 'Zawody',
  gender: 'Płeć',
};

const formatQuery = (q: string) => {
  const m = q.match(/^([^:]+):([^:]+)::([^:]+):\?$/);
  if (m) {
    return `${m[1]} - ${m[2]} + ${m[3]}`;
  }
  return q;
};

const VectorAnalogy = () => {
  const [model, setModel] = useState<keyof typeof data>(modelKeys[0]);
  const categoryKeys = useMemo(
    () => Object.keys(data[model].categories),
    [model],
  );
  const [category, setCategory] = useState<string>(categoryKeys[0]);

  useEffect(() => {
    if (!categoryKeys.includes(category)) {
      setCategory(categoryKeys[0]);
    }
  }, [categoryKeys, category]);

  const summary = useMemo(() => {
    return data[model].categories[category]?.summary;
  }, [model, category]);

  const tests = useMemo(() => {
    return data[model].categories[category]?.tests || [];
  }, [model, category]);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <label className={styles.label} htmlFor="model-select">
          Model
        </label>
        <select
          id="model-select"
          className={styles.select}
          value={model}
          onChange={(e) => setModel(e.target.value as keyof typeof data)}
        >
          {modelKeys.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.row}>
        <label className={styles.label} htmlFor="category-select">
          Kategoria
        </label>
        <select
          id="category-select"
          className={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categoryKeys.map((c) => (
            <option key={c} value={c}>
              {categoryNames[c] || c}
            </option>
          ))}
        </select>
      </div>

      {summary && (
        <div className={styles.row} style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <span>Łącznie testów: {summary.testsCount}</span>
          <span>
            Ocenione: {summary.validTestsCount} / {summary.testsCount}
          </span>
          <span>Hit@1: {formatPct(summary.hitAt1)}</span>
          <span>Hit@5: {formatPct(summary.hitAt5)}</span>
          <span>Hit@10: {formatPct(summary.hitAt10)}</span>
          <span>
            MRR:{' '}
            {summary.meanReciprocalRank != null
              ? summary.meanReciprocalRank.toFixed(2)
              : 'N/A'}
          </span>
        </div>
      )}

      <div>
        {tests.map((t, idx) => (
          <div
            key={idx}
            className={styles.rowItem}
            style={{ padding: '0.5rem 0' }}
          >
            <div>
              <strong>{formatQuery(t.query)}</strong>
            </div>
            <div>Oczekiwane: {t.expected}</div>
            <div>
              Pozycja:{' '}
              {t.missingEmbeddings
                ? 'N/A'
                : t.rank != null
                  ? `#${t.rank}`
                  : 'N/A'}
              {t.missingEmbeddings && (
                <span title="Brak wektorów" style={{ marginLeft: '0.25rem' }}>
                  ⚠️
                </span>
              )}
            </div>
            <div>
              Kosinus:{' '}
              {t.cosineExpected != null ? t.cosineExpected.toFixed(3) : 'N/A'}
            </div>
            <div>
              Top‑1: {t.hitAt1 ? '✅' : '❌'} Top‑5: {t.hitAt5 ? '✅' : '❌'}{' '}
              Top‑10: {t.hitAt10 ? '✅' : '❌'}
            </div>
            {t.top10 && t.top10.length > 0 && (
              <details>
                <summary>Szczegóły</summary>
                <ul style={{ paddingLeft: '1rem', margin: 0 }}>
                  {t.top10.map((item, j) => (
                    <li
                      key={j}
                      style={{
                        fontWeight: item.word === t.expected ? 600 : undefined,
                      }}
                    >
                      {item.word} {item.score.toFixed(3)}
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VectorAnalogy;
