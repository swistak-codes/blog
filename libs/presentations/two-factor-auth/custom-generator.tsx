import React, { useEffect, useRef, useState } from 'react';
import styles from './custom-generator.module.scss';
import { generateKey } from './generate-key';
import { generateQrCode } from './generate-qr-code';
import { hotp, totp } from './algorithm';
import { AlgorithmUriOption, OtpType } from './types';
import { algorithmToHmacAlg, bytesToHex, isValidBase32 } from './utils';

const TIMER_RADIUS = 16;
const CIRCUMFERENCE = 2 * Math.PI * TIMER_RADIUS;

// nie wiem, czy ktoś to czyta, ale tak informacyjnie dodam, że ten komponent został wygenerowany przez Copilota z użyciem modelu Raptor Mini
// jest gigantyczny, ale nie chciało mi się tego refaktorować
// ważne, że działa 👍
const CustomGenerator = () => {
  const [type, setType] = useState<OtpType>('totp');
  const [algorithm, setAlgorithm] = useState<AlgorithmUriOption>('SHA1');
  const [digits, setDigits] = useState<number>(6);
  const [issuer, setIssuer] = useState<string>('');
  const [label, setLabel] = useState<string>('');
  const [secret, setSecret] = useState<string>(generateKey());
  const [secretLength, setSecretLength] = useState<number>(20);

  const [period, setPeriod] = useState<number>(30);
  const [counter, setCounter] = useState<number>(1);

  const [uri, setUri] = useState<string | null>(null);
  const [qr, setQr] = useState<string | null>(null);

  const [validSecret, setValidSecret] = useState<boolean>(false);
  const [canShowOtp, setCanShowOtp] = useState<boolean>(false);

  const [hotpCode, setHotpCode] = useState<string>('');
  const [hmacHex, setHmacHex] = useState<string>('');
  const [offsetVal, setOffsetVal] = useState<number | null>(null);
  const [codeVal, setCodeVal] = useState<number | null>(null);
  const [nowVal, setNowVal] = useState<number | null>(null);
  const [counterVal, setCounterVal] = useState<bigint | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(1);

  // walidacja pól
  useEffect(() => {
    const valid =
      isValidBase32(secret) &&
      Number.isInteger(digits) &&
      digits > 0 &&
      (type === 'totp'
        ? Number.isInteger(period) && period > 10
        : Number.isInteger(counter) && counter > 0);
    setValidSecret(isValidBase32(secret));
    setCanShowOtp(valid);
  }, [secret, digits, period, counter, type]);

  // generowanie URI i QR, jeśli wszystko ok
  useEffect(() => {
    let cancelled = false;
    async function updateQr() {
      if (!canShowOtp) {
        setUri(null);
        setQr(null);
        return;
      }
      try {
        const data: any = {
          secret: secret.replace(/\s+/g, ''),
          type,
          algorithm,
          digits,
        } as any;
        if (issuer) data.issuer = issuer;
        if (label) data.label = label;
        if (type === 'totp') data.period = period;
        if (type === 'hotp') data.counter = counter;

        const { uri: generatedUri, qr: generatedQr } =
          await generateQrCode(data);
        if (cancelled) return;
        setUri(generatedUri);
        setQr(generatedQr);
      } catch (e) {
        setUri(null);
        setQr(null);
      }
    }
    updateQr();
    return () => {
      cancelled = true;
    };
  }, [
    canShowOtp,
    secret,
    issuer,
    label,
    digits,
    algorithm,
    period,
    counter,
    type,
  ]);

  // TOTP: odświeżaj co sekundę
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (type === 'totp' && canShowOtp) {
      async function tick() {
        try {
          const result = await totp(
            secret.replace(/\s+/g, ''),
            period,
            digits,
            algorithmToHmacAlg(algorithm),
          );
          setHotpCode(result.hotpCode);
          setHmacHex(bytesToHex(result.hmacResult));
          setOffsetVal(result.offset);
          setCodeVal(result.code);
          setNowVal(result.now ?? null);
          setCounterVal(result.counter ?? null);

          if (typeof result.now === 'number') {
            const elapsed = result.now % period;
            const rem = period - elapsed;
            setRemainingSeconds(rem);
            setProgress(rem / period);
          } else {
            setRemainingSeconds(null);
            setProgress(1);
          }
        } catch (e) {}
      }
      tick();
      intervalRef.current = setInterval(tick, 1000);
    } else if (type === 'hotp' && canShowOtp) {
      (async () => {
        try {
          const result = await hotp(
            secret.replace(/\s+/g, ''),
            BigInt(counter),
            digits,
            algorithmToHmacAlg(algorithm),
          );
          setHotpCode(result.hotpCode);
          setHmacHex(bytesToHex(result.hmacResult));
          setOffsetVal(result.offset);
          setCodeVal(result.code);
          setNowVal(null);
          setCounterVal(BigInt(counter));
          setRemainingSeconds(null);
          setProgress(0);
        } catch (e) {}
      })();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [type, secret, period, digits, algorithm, counter, canShowOtp]);

  function handleGenerateSecret() {
    const generated = generateKey(secretLength);
    setSecret(generated);
  }

  async function handleIncreaseCounter() {
    setCounter((c) => c + 1);
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <label>Typ</label>
        <select value={type} onChange={(e) => setType(e.target.value as any)}>
          <option value="totp">TOTP</option>
          <option value="hotp">HOTP</option>
        </select>
      </div>

      <div className={styles.row}>
        <label>Algorytm</label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value as AlgorithmUriOption)}
        >
          <option value="SHA1">SHA1</option>
          <option value="SHA256">SHA256</option>
          <option value="SHA512">SHA512</option>
        </select>
      </div>

      <div className={styles.row}>
        <label>Liczba cyfr</label>
        <input
          type="number"
          min={1}
          value={digits}
          onChange={(e) => setDigits(Number(e.target.value))}
        />
      </div>

      <div className={styles.row}>
        <label>Serwis</label>
        <input
          type="text"
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
        />
      </div>

      <div className={styles.row}>
        <label>Etykieta</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>

      <div className={styles.row}>
        <label>Klucz (Base32)</label>
        <input
          type="text"
          value={secret}
          onChange={(e) => setSecret(e.target.value.trim())}
        />
        <div className={styles.inlineControls}>
          <input
            type="number"
            min={10}
            max={128}
            value={secretLength}
            onChange={(e) => setSecretLength(Number(e.target.value))}
          />
          <button type="button" onClick={handleGenerateSecret}>
            Generuj klucz
          </button>
        </div>
      </div>
      <div className={styles.row}>
        <small>
          {!validSecret && (
            <span className={styles.invalid}>Nieprawidłowy Base32</span>
          )}
        </small>
      </div>

      {type === 'totp' && (
        <div className={styles.row}>
          <label>Okres (sekundy)</label>
          <input
            type="number"
            min={11}
            value={period}
            onChange={(e) => setPeriod(Number(e.target.value))}
          />
        </div>
      )}

      {type === 'hotp' && (
        <div className={styles.row}>
          <label>Licznik</label>
          <input
            type="number"
            min={1}
            value={counter}
            onChange={(e) => setCounter(Number(e.target.value))}
          />
          <button type="button" onClick={handleIncreaseCounter}>
            Zwiększ licznik
          </button>
        </div>
      )}

      <hr />

      {!canShowOtp && (
        <div className={styles.warning}>
          Wypełnij poprawnie pola, aby wygenerować URI i kod OTP.
        </div>
      )}

      {canShowOtp && (
        <div>
          <div className={styles.row}>
            <label>URI</label>
            <div className={styles.uri} title={uri ?? ''}>
              {uri ?? ''}
            </div>
          </div>

          <div className={styles.qrRow}>
            {qr && <img src={qr} alt="QR Code" />}
            <div className={styles.codeBox}>
              <div className={styles.codeValueRow}>
                <div className={styles.codeStack}>
                  <div className={styles.codeLabel}>Aktualny kod</div>
                  <div className={styles.codeValue}>{hotpCode}</div>
                </div>
                {type === 'totp' && (
                  <div
                    className={styles.timer}
                    title={
                      remainingSeconds !== null ? `${remainingSeconds}s` : ''
                    }
                  >
                    <svg className={styles.timerSvg} viewBox="0 0 36 36">
                      <circle
                        className={styles.timerBg}
                        cx="18"
                        cy="18"
                        r="16"
                      />
                      <circle
                        className={styles.timerFg}
                        cx="18"
                        cy="18"
                        r="16"
                        strokeDasharray={CIRCUMFERENCE}
                        strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
                      />
                    </svg>
                    <div className={styles.timerText}>
                      {remainingSeconds !== null ? remainingSeconds : ''}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.details}>
            <h4>Szczegóły</h4>
            <div>
              Rezultat HMAC (hex): <code>{hmacHex}</code>
            </div>
            <div>
              Offset: <code>{offsetVal ?? '-'}</code>
            </div>
            <div>
              Kod przed modulo: <code>{codeVal ?? '-'}</code>
            </div>
            {type === 'totp' && (
              <div>
                Czas wygenerowania kodu: <code>{nowVal ?? '-'}</code>
              </div>
            )}
            {type === 'totp' && (
              <div>
                Wartość licznika:{' '}
                <code>{counterVal !== null ? counterVal.toString() : '-'}</code>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomGenerator;
