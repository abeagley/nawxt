module.exports = [
  {
    choices: [
      {
        name: 'React 16 Official',
        value: '^16.6.3'
      },
      {
        name: 'React 16 Alpha',
        value: '^16.7.0-alpha.2'
      }
    ],
    message: 'Which react version would you like to use?',
    name: 'reactVersion',
    type: 'list'
  },
  {
    choices: [
      {
        name: 'Custom (Modify the tslint.json on your own)',
        value: 'none'
      },
      {
        name: 'Standard.js Style',
        value: 'standard'
      }
    ],
    message: 'Which tslint style would you like to use?',
    name: 'tslintStyle',
    type: 'list'
  }
]
