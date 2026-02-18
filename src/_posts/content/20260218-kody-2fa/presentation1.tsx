import { useEffect, useRef, useState } from 'react';

export const Presentation1 = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const counterRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    if (counterRef.current) {
      clearInterval(counterRef.current);
    }
    counterRef.current = setInterval(() => {
      const now = new Date();
      setCurrentTime(Math.floor(now.getTime() / 1000 / 30));
    }, 1000);

    return () => {
      if (counterRef.current) {
        clearInterval(counterRef.current);
      }
    };
  }, []);

  return <>{currentTime}</>;
};
