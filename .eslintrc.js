module.exports = {
  'env': {
      'browser': true,
      'commonjs': true,
      'es6': true,
      'node': true,
      'jest':true
  },
  'extends': [
      'eslint:recommended',
      'plugin:react/recommended'
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  'globals': {
      'Atomics': 'readonly',
      'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
      'sourceType': 'module',
      'ecmaFeatures': {
          'jsx': true
      },
      'ecmaVersion': 11
  },
  'plugins': [
      'react'
  ],
  'rules': {
      'indent': [
          'error',
          2
      ],
      "linebreak-style": [
          "error",
           (process.platform === "win32" ? "windows" : "unix")
      ],
      'quotes': [
          'error',
          'double'
      ],
      'semi': [
          'error',
          'always'
      ],
      'react/prop-types': 0
  }   
}