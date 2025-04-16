import { FormEvent, useState } from 'react';
import { calculate, Result } from './logic/calculate';
import { isRpn } from './logic/isRpn';
import styles from './styles.module.scss';
import clsx from 'clsx';

export function PresentationsRpn() {
  const [hasError, setHasError] = useState(false);
  const [expression, setExpression] = useState('6 2 / 2 1 + *');
  const [result, setResult] = useState<Result[]>([]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!isRpn(expression)) {
      setHasError(true);
      return;
    }
    setHasError(false);
    setResult(calculate(expression));
  };

  return (
    <div className={styles.container}>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="rpn-input">Wpisz wyrażenie w ONP:</label>
          </div>
          <div>
            <input
              type="text"
              id="rpn-input"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
            />
          </div>
          <div
            className={clsx({
              [styles.error]: true,
              [styles.visibleError]: hasError,
            })}
          >
            Wyrażenie może zawierać jedynie liczby, spacje oraz operatory (+, -,
            * lub /).
          </div>
          <div>
            <button type="submit">Oblicz</button>
          </div>
        </form>
        <table
          className={clsx({
            [styles.solution]: true,
            [styles.visibleSolution]: result && result.length > 0,
          })}
        >
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Stos przed operacją</th>
              <th>Operacja</th>
              <th>Wynik</th>
              <th>Stos po operacji</th>
            </tr>
          </thead>
          <tbody>
            {result.map((x, i) => (
              <tr key={i}>
                <td>
                  <pre>{x.current}</pre>
                </td>
                <td>
                  <pre>{JSON.stringify(x.stackPre)}</pre>
                </td>
                <td>
                  <pre>{x.operation}</pre>
                </td>
                <td>
                  <pre>{x.error ? 'BŁĄD!' : x.result}</pre>
                </td>
                <td>
                  <pre>{JSON.stringify(x.stackPost)}</pre>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PresentationsRpn;
