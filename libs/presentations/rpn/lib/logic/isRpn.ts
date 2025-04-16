export const isRpn = (expression: string) =>
  /^(((\d+(.\d+)?)|\+|-|\/|\*)\s)+((\d+(.\d+)?)|\+|-|\/|\*)$/.test(expression);
