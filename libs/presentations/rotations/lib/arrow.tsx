import React from 'react';

export const Arrow = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    version="1.1"
    {...props}
    style={{
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      strokeLinejoin: 'round',
      strokeMiterlimit: 2,
      ...(props.style || {}),
    }}
  >
    <g>
      <path
        d="M-0.022,67.5L-0.022,32.501L32.478,32.501L-0.022,0.001L49.978,0.001L99.979,50.001L49.979,100L-0.022,100L32.478,67.5L-0.022,67.5Z"
        style={{ fill: 'rgb(255,150,0)' }}
      />
    </g>
  </svg>
);
