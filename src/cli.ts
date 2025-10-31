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
    .epilogue(`Nota: Al ejecutar broch por primera vez, se creará el archivo "broch.config.json" para la configuración del paquete.\nPara más información, visita nuestra documentación en ${chalk.underline('https://github.com/your-repo/broch')}`)
    .strict()
    .demandCommand(0)
    .strictCommands() // Activa el manejo estricto de comandos
    .fail((msg, err) => {
      // Personaliza el mensaje para comandos desconocidos
      if (msg && msg.includes('Unknown command')) {
        const args = hideBin(process.argv);
        const command = args[0] || ''; // Obtiene el comando de los argumentos del proceso
        console.error(chalk.red(`\nError: El comando "${command}" no es correcto.`));
        console.info(chalk.cyan('Por favor, ejecuta "broch --help" para más información.\n'));
      } else {
        console.error(chalk.red(`\nError: ${msg || 'Ha ocurrido un error.'}`));
      }
      process.exit(1);
    });

  setupCommands(cli);

  return cli;
}
