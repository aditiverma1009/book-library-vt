module.exports = {
  env: {
    browser: true,
    es2021: true
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
    indent: ['error', 2],
    quotes: [
      2,
      'single'
    ],
    'comma-dangle': ['error', 'never']
  }
};
