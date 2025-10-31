
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import { setupCommands } from './commands';

export function buildCli() {
  const cli = yargs(hideBin(process.argv))
    .scriptName('broch')
    .usage(`${chalk.bold('Uso:')} $0 <comando> [opciones]`)
    .help('h')
    .alias('h', 'help')
    .epilogue(`Para más información, visita nuestra documentación en ${chalk.underline('https://github.com/your-repo/broch')}`)
    .strict()
    .demandCommand(0);

  setupCommands(cli);

  return cli;
}
