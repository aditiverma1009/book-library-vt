module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'no-console': 'off',
    'arrow-body-style': 0,
    indent: ['error', 2],
    quotes: [
      2,
      'single'
    ],
    'comma-dangle': ['error', 'never']
  }
};
