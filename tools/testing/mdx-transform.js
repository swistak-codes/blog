const babelJest = require('babel-jest');

module.exports = {
  process(src, filepath, config) {
    // TODO wymyśleć coś innego, przecież to jest idiotyczne; chociaż działa
    const searchString = '\n};\n';
    const endOfMeta = src.indexOf(searchString) + searchString.length;

    const toTransform = src.slice(0, endOfMeta);
    const babelProcess = babelJest.default?.process ?? babelJest.process;
    return babelProcess(toTransform, filepath, {
      ...config,
      presets: [
        [
          '@nrwl/react/babel',
          {
            runtime: 'automatic',
            useBuiltIns: 'usage',
          },
        ],
      ],
      plugins: [['styled-components', { pure: true, ssr: true }]],
    }).code;
  },
};
