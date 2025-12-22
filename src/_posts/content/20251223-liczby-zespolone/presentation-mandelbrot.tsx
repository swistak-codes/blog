import dynamic from 'next/dynamic';

const MandelbrotPresentation = dynamic(
  () =>
    import(
      '@swistak-codes/presentations/complex-mandelbrot/complex-mandelbrot'
    ),
  {
    ssr: false,
  },
);

export const PresentationMandelbrot = () => {
  return <MandelbrotPresentation />;
};
