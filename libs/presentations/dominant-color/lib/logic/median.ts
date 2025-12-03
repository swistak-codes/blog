import type { Algorithm, Color } from '../utils/types';
import { arithmeticMean } from './means';
import {
  WEISZFELD_MAX_ITERATIONS,
  WEISZFELD_TOLERANCE,
} from '@swistak-codes/presentations/dominant-color/lib/utils/consts';

export const componentWiseMedian: Algorithm = async (image) => {
  // tworzymy tablice
  const sortedR: number[] = [];
  const sortedG: number[] = [];
  const sortedB: number[] = [];

  // wypełniamy je wartościami z obrazka
  for (let i = 0; i < image.length; i++) {
    const pixel = image[i];
    sortedR.push(pixel[0]);
    sortedG.push(pixel[1]);
    sortedB.push(pixel[2]);
  }

  // sortujemy tablice
  sortedR.sort((a, b) => a - b);
  sortedG.sort((a, b) => a - b);
  sortedB.sort((a, b) => a - b);

  // wyznaczamy środkowy indeks
  const mid = Math.floor(image.length / 2);

  // wyznaczamy mediany dla każdej składowej
  const medianR =
    image.length % 2 !== 0
      ? sortedR[mid]
      : Math.round((sortedR[mid - 1] + sortedR[mid]) / 2);
  const medianG =
    image.length % 2 !== 0
      ? sortedG[mid]
      : Math.round((sortedG[mid - 1] + sortedG[mid]) / 2);
  const medianB =
    image.length % 2 !== 0
      ? sortedB[mid]
      : Math.round((sortedB[mid - 1] + sortedB[mid]) / 2);

  // zwracamy wynik
  return { r: medianR, g: medianG, b: medianB };
};

export const geometricMedian: Algorithm = async (image) => {
  // wyznaczamy punkt startowy jako średnią arytmetyczną
  let median = await arithmeticMean(image);
  // iterujemy wskazaną liczbę iteracji, aby zbliżyć się do mediany geometrycznej
  for (let iter = 0; iter < WEISZFELD_MAX_ITERATIONS; iter++) {
    // będziemy obliczać średnią ważoną, stąd potrzebne są licznik i mianownik
    let num: number[] = new Array(3).fill(0);
    let denom = 0;
    // przechodzimy po wszystkich punktach, aby wyznaczyć ich wagi
    for (let i = 0; i < image.length; i++) {
      // obliczamy odległość euklidesową punktu od bieżącej mediany
      let dist = Math.sqrt(
        Math.pow(image[i][0] - median.r, 2) +
          Math.pow(image[i][1] - median.g, 2) +
          Math.pow(image[i][2] - median.b, 2),
      );
      // jeśli punkt pokrywa się z bieżącą medianą — aby uniknąć dzielenia przez zero,
      // ustawiamy minimalną odległość na ustawioną tolerancję
      if (dist < WEISZFELD_TOLERANCE) dist = WEISZFELD_TOLERANCE;
      // obliczamy wagę jako odwrotność odległości
      const w = 1 / dist;
      // dodajemy "punkt * waga" do licznika wszystkich współrzędnych
      num[0] += image[i][0] * w;
      num[1] += image[i][1] * w;
      num[2] += image[i][2] * w;
      // dodajemy wagę do mianownika
      denom += w;
    }
    // obliczamy nowe przybliżenie mediany jako średnią ważoną
    let newMedian: Color = {
      r: Math.round(num[0] / denom),
      g: Math.round(num[1] / denom),
      b: Math.round(num[2] / denom),
    };
    // sprawdzamy, jak duża była zmiana względem poprzedniego przybliżenia
    const change = Math.sqrt(
      Math.pow(median.r - newMedian.r, 2) +
        Math.pow(median.g - newMedian.g, 2) +
        Math.pow(median.b - newMedian.b, 2),
    );
    // jeśli odpowiednio mała, kończymy wykonanie algorytmu
    if (change < WEISZFELD_TOLERANCE) return newMedian;
    // w przeciwnym wypadku kontynuujemy iterowanie z nowym przybliżeniem
    median = newMedian;
  }
  // zwracamy ostatnie przybliżenie
  return median;
};
