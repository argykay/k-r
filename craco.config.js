const path = require('path');

const src = path.resolve(__dirname, 'src');

/** Mirrors tsconfig path aliases for webpack (CRA does not apply paths on its own). */
module.exports = {
  webpack: {
    alias: {
      '@assets': path.resolve(src, 'assets'),
      '@components': path.resolve(src, 'components'),
      '@constants': path.resolve(src, 'constants'),
      '@hooks': path.resolve(src, 'hooks'),
      '@i18n': path.resolve(src, 'i18n'),
      '@modules': path.resolve(src, 'modules'),
      '@pages': path.resolve(src, 'pages'),
      '@routing': path.resolve(src, 'routing'),
      '@sections': path.resolve(src, 'sections'),
    },
  },
};
