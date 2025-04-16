export type Result = {
  result?: number | undefined;
  current: string;
  operation: string;
  stackPre: number[];
  stackPost: number[];
  error?: boolean;
};

const solve = (expression: string[]) => {
  const results: Result[] = [];
  const stack: number[] = [];
  for (const symbol of expression) {
    if (['+', '-', '*', '/'].includes(symbol)) {
      const stackPre = [...stack];
      const a = stack.pop();
      const b = stack.pop();
      if (a != null && b != null) {
        let result;
        switch (symbol) {
          case '+':
            result = b + a;
            break;
          case '-':
            result = b - a;
            break;
          case '*':
            result = b * a;
            break;
          case '/':
            result = b / a;
            break;
        }
        if (result != null) {
          stack.push(result);
          results.push({
            current: symbol,
            operation: `${b} ${symbol} ${a}`,
            stackPre,
            stackPost: [...stack],
            result,
          });
        } else {
          results.push({
            current: symbol,
            operation: `${b} ${symbol} ${a}`,
            stackPre,
            stackPost: [...stack],
            error: true,
          });
          return results;
        }
      } else {
        results.push({
          current: symbol,
          operation: '',
          stackPre,
          stackPost: [...stack],
          error: true,
        });
        return results;
      }
    } else {
      const stackPre = [...stack];
      stack.push(parseFloat(symbol));
      results.push({
        current: symbol,
        operation: '',
        stackPre,
        stackPost: [...stack],
      });
    }
  }
  results.push({
    current: '',
    operation: '=',
    stackPre: [...stack],
    result: stack.pop(),
    stackPost: [...stack],
  });
  return results;
};

export const calculate = (expression: string) => {
  const split = expression
    .split(' ')
    .map((x) => x.trim())
    .filter((x) => !!x);
  return solve(split);
};
