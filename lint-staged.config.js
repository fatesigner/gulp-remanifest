module.exports = {
  'build/**/*.{js,jsx}': [
    'eslint --fix --cache --quiet',
    'prettier --write --ignore-path .eslintignore',
    'git add'
  ],
  'src/**/*.{js,jsx}': [
    'eslint --fix --cache --quiet',
    'prettier --write --ignore-path .eslintignore',
    'git add'
  ]
};
