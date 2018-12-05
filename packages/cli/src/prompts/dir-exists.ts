import * as inquirer from 'inquirer'

export default (): inquirer.Questions => {
  return [
    {
      choices: [
        {
          name: 'Yes',
          value: true
        },
        {
          name: 'No',
          value: false
        }
      ],
      message: 'Overwrite existing directory?',
      name: 'overwrite',
      type: 'list'
    }
  ]
}
