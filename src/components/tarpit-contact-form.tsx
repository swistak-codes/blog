import React, { FormEvent, useRef, useState } from 'react';
import { push } from '@socialgouv/matomo-next';

const HEAVY_ITERATIONS = 300_000_000;

function cpuTarpit(iterations: number) {
  let result = BigInt(0);
  for (let i = 0; i < iterations; i++) {
    result +=
      BigInt(Math.sqrt(i)) *
      BigInt(Math.sqrt(Math.sin(i) * Math.cos(i))) ** BigInt(result);
    if (i % 100 === 0) {
      // eslint-disable-next-line no-alert
      if ((window as any).__STOP_TARPIT) break;
    }
  }
  return result;
}

export default function TarpitContactForm() {
  const [status, setStatus] = useState('');
  const [tarpitActive, setTarpitActive] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const honeypotRef = useRef(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('');
    setTarpitActive(true);
    setFormDisabled(true);
    const formData = new FormData(e.target as HTMLFormElement);
    setStatus('Wykryto bota. Proszę czekać...');
    push([
      'trackEvent',
      'Contact Form Bot',
      JSON.stringify([...formData.entries()]),
    ]);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    cpuTarpit(HEAVY_ITERATIONS);
    setStatus('Zgłoszenie odrzucone.');
    setFormDisabled(false);
    setTarpitActive(false);
  };

  return (
    <>
      <div style={{ fontSize: '2rem', margin: '2rem' }}>
        Jeśli jesteś człowiekiem, nie uzupełniaj poniższego formularza. Jest to
        tylko pułapka na boty.
        <br />
        <br />
        Jeśli chcesz się skontaktować, prawdziwy kontakt do mnie znajdziesz w
        stopce strony.
      </div>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        style={{ maxWidth: 400, margin: '0 auto' }}
      >
        <div>
          <label htmlFor="name">Imię</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            disabled={formDisabled}
          />
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            disabled={formDisabled}
          />
        </div>
        <div>
          <label htmlFor="message">Wiadomość</label>
          <textarea
            name="message"
            id="message"
            rows={5}
            required
            disabled={formDisabled}
          />
        </div>
        <div style={{ display: 'none' }}>
          <label htmlFor="website">Strona WWW</label>
          <input
            type="text"
            name="website"
            id="website"
            ref={honeypotRef}
            autoComplete="off"
            tabIndex={-1}
          />
        </div>
        <button type="submit" disabled={formDisabled}>
          Wyślij
        </button>
        <div style={{ marginTop: 12, color: tarpitActive ? 'red' : 'green' }}>
          {status}
        </div>
      </form>
    </>
  );
}
