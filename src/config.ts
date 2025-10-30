import Configstore from 'configstore';
import inquirer from 'inquirer';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const conf = new Configstore(pkg.name, {
  colors: {
    html: 'orange',
    css: 'green',
    js: 'blue',
    php: 'darkblue',
    image: 'pink',
    rust: 'gray',
    other: 'lightgray',
  },
  outputFileName: 'brochMap.html',
});

async function editColors() {
  const { fileType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'fileType',
      message: 'Select a file type to change its color:',
      choices: Object.keys(conf.get('colors') as object),
    },
  ]);

  const { color } = await inquirer.prompt([
    {
      type: 'input',
      name: 'color',
      message: `Enter the new color for ${fileType}:`,
      default: conf.get(`colors.${fileType}`),
    },
  ]);

  conf.set(`colors.${fileType}`, color);
  console.log(`${fileType} color updated to ${color}`);
}

async function editOutputFileName() {
  const { outputFileName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'outputFileName',
      message: 'Enter the new output file name:',
      default: conf.get('outputFileName'),
    },
  ]);
  conf.set('outputFileName', outputFileName);
  console.log(`Output file name updated to ${outputFileName}`);
}

export async function configMenu() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What do you want to configure?',
      choices: ['Edit file colors', 'Edit output file name', 'Exit'],
    },
  ]);

  switch (action) {
    case 'Edit file colors':
      await editColors();
      break;
    case 'Edit output file name':
      await editOutputFileName();
      break;
    case 'Exit':
      return;
  }
}

export default conf;
