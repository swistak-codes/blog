import { useEffect, useRef, useState } from 'react';
import { totp } from './algorithm';

const key = 'WC2TJ4YPVYZNY3QMV3PV';

const JustCode = () => {
  const [currentCode, setCurrentCode] = useState('000000');
  const counterRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    if (counterRef.current) {
      clearInterval(counterRef.current);
    }
    counterRef.current = setInterval(async () => {
      const { hotpCode } = await totp(key, 30, 6, 'SHA-1');
      setCurrentCode(hotpCode.toString().padStart(6, '0'));
    }, 1000);

    return () => {
      if (counterRef.current) {
        clearInterval(counterRef.current);
      }
    };
  }, []);

  return <>{currentCode}</>;
};

export default JustCode;
