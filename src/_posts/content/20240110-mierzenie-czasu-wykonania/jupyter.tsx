import dynamic from 'next/dynamic';
import 'react-ipynb-renderer-katex/dist/styles/darkbronco.css';
import ipynb from './time_measure_jupyter.json';

const IpynbRenderer = dynamic(
  () => import('react-ipynb-renderer-katex').then((mod) => mod.IpynbRenderer),
  {
    ssr: false,
  },
);

// export const Jupyter = () => <p>dd</p>;
// TODO fix
export const Jupyter = () => <IpynbRenderer ipynb={ipynb} />;
