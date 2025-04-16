import { CommonProps } from './types';
import { useEffect, useState } from 'react';

type Props = CommonProps & {
  label: string;
};

export const NumberInput = ({ label, valueCallback }: Props) => {
  const [value, setValue] = useState(10);

  useEffect(() => valueCallback([value]), [value, valueCallback]);

  return (
    <label>
      {label}:&nbsp;
      <input
        value={value}
        type="number"
        onChange={(e) => setValue(e.target.valueAsNumber)}
      />
    </label>
  );
};
