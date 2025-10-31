import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import { setupCommands } from './commands';
import { showHelp } from './help';

export function buildCli() {
  const cli = yargs(hideBin(process.argv))
    .scriptName('broch')
    .usage(`${chalk.bold('Uso:')} $0 <comando> [opciones]`)
    .help(false) // Desactiva la ayuda por defecto
    .version(false) // Desactiva la versión por defecto
    .strict()
    .demandCommand(1, '') // Requiere al menos un comando
    .strictCommands() // Activa el manejo estricto de comandos
    .fail((msg, err) => {
      showHelp();
      process.exit(1);
    });

  setupCommands(cli);

  return cli;
}
