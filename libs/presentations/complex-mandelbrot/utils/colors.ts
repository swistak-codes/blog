export const hslToRgb = (h: number, s: number, l: number) => {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r = 0;
  let g = 0;
  let b = 0;
  if (0 <= hp && hp < 1) {
    r = c;
    g = x;
    b = 0;
  } else if (1 <= hp && hp < 2) {
    r = x;
    g = c;
    b = 0;
  } else if (2 <= hp && hp < 3) {
    r = 0;
    g = c;
    b = x;
  } else if (3 <= hp && hp < 4) {
    r = 0;
    g = x;
    b = c;
  } else if (4 <= hp && hp < 5) {
    r = x;
    g = 0;
    b = c;
  } else if (5 <= hp && hp < 6) {
    r = c;
    g = 0;
    b = x;
  }
  const m = l - c / 2;
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
};

export const getColorForIteration = (iteration: number, maxIter: number) => {
  if (iteration >= maxIter) return [0, 0, 0, 255];
  const t = iteration / maxIter;
  const hue = (360 * (0.95 + 10 * t)) % 360;
  const light = 0.5 * (0.5 + (1 - t) * 0.5);
  const [r, g, b] = hslToRgb(hue, 1, light);
  return [r, g, b, 255];
};
