import type { Algorithm, Color } from '../utils/types';

interface AdditionalConfig {
  tolerance: number;
}

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const mode: Algorithm<AdditionalConfig> = async (
  image,
  additionalConfig,
) => {
  const tolerance = additionalConfig?.tolerance ?? 20;
  // koszyki kolorów definiujemy jako tablicę, gdzie przechowamy kolor i liczbę wystąpień
  const buckets: { color: Color; count: number }[] = [];

  // iterujemy po kolejnych pikselach obrazu
  for (const pixel of image) {
    let wasAdded = false;
    // sprawdzamy, czy piksel pasuje do któregoś z istniejących koszyków
    for (const bucket of buckets) {
      // obliczamy odległość euklidesową między kolorem piksela a kolorem koszyka
      const distance = Math.sqrt(
        (pixel[0] - bucket.color.r) ** 2 +
          (pixel[1] - bucket.color.g) ** 2 +
          (pixel[2] - bucket.color.b) ** 2,
      );
      // jeśli odległość jest mniejsza lub równa tolerancji, dodajemy piksel do koszyka
      if (distance <= tolerance) {
        bucket.count += 1;
        wasAdded = true;
        break;
      }
    }
    // jeśli piksel nie pasował do żadnego koszyka, tworzymy nowy koszyk
    if (!wasAdded) {
      buckets.push({
        color: { r: pixel[0], g: pixel[1], b: pixel[2] },
        count: 1,
      });
    }
  }

  // szukamy koszyka z największą liczbą wystąpień
  let modeColor: Color = { r: 0, g: 0, b: 0 };
  let maxCount = 0;

  // iterujemy przez koszyki, aby znaleźć ten z największą liczbą
  for (const bucket of buckets) {
    if (bucket.count > maxCount) {
      maxCount = bucket.count;
      modeColor = bucket.color;
    }
  }

  // zwracamy dominantę
  return modeColor;
};

export const optimizedMode: Algorithm<AdditionalConfig> = async (
  image,
  additionalConfig,
) => {
  const tolerance = additionalConfig?.tolerance ?? 20;
  // koszyki kolorów są zdefiniowane jako mapa
  const buckets = new Map<string, { color: Color; count: number }>();

  // iterujemy po kolejnych pikselach obrazu
  for (const pixel of image) {
    // określamy klucz koszyka na podstawie zaokrąglonych wartości RGB
    // z racji, że wartości mogą wykroczyć poza zakres [0, 255], używamy funkcji clamp
    const r = clamp(Math.round(pixel[0] / tolerance) * tolerance, 0, 255);
    const g = clamp(Math.round(pixel[1] / tolerance) * tolerance, 0, 255);
    const b = clamp(Math.round(pixel[2] / tolerance) * tolerance, 0, 255);
    const key = `${r}-${g}-${b}`;

    if (buckets.has(key)) {
      // jeśli koszyk już istnieje, zwiększamy licznik
      buckets.get(key)!.count += 1;
    } else {
      // jeśli koszyk nie istnieje, tworzymy nowy
      buckets.set(key, { color: { r, g, b }, count: 1 });
    }
  }

  // szukamy koszyka z największą liczbą wystąpień
  let modeColor: Color = { r: 0, g: 0, b: 0 };
  let maxCount = 0;

  // iterujemy przez koszyki, aby znaleźć ten z największą liczbą
  for (const bucket of buckets.values()) {
    if (bucket.count > maxCount) {
      maxCount = bucket.count;
      modeColor = bucket.color;
    }
  }

  // zwracamy dominantę
  return modeColor;
};
