module.exports = {
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  subjectLimit: 100,
  scopes: [],
  messages: {},
  types: [
    {
      emoji: '✨',
      value: 'upd',
      name: 'A new feature.'
    },
    {
      emoji: '✨',
      value: 'feat',
      name: 'A new feature.'
    },
    {
      emoji: '🐛',
      value: 'fix',
      name: 'A bug fix.'
    },
    {
      emoji: '🎨',
      value: 'refactor',
      name: 'A code refactoring change.'
    },
    {
      emoji: '💄',
      value: 'style',
      name: 'Updating the UI and style files.'
    },
    {
      emoji: '📚',
      value: 'docs',
      name: 'Documentation change.'
    },
    {
      emoji: '🔩',
      value: 'chore',
      name: 'A chore change.'
    },
    {
      emoji: '⚡',
      value: 'impr',
      name: 'Improving performance.'
    },
    {
      emoji: '🍱',
      value: 'assets',
      name: 'Adding or updating assets.'
    },
    {
      emoji: '📦',
      value: 'package',
      name: 'Updating compiled files or packages.'
    },
    {
      emoji: '🚧',
      value: 'construction',
      name: 'Work in progress.'
    },
    {
      emoji: '⏪',
      value: 'rewind',
      name: 'Reverting changes.'
    },
    {
      emoji: '🎉',
      value: 'initial',
      name: 'Initial commit.'
    }
  ]
};
