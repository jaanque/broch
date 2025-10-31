
import { Argv } from 'yargs';
import { scan } from './scanner';
import open from 'open';
import config from './config';
import chalk from 'chalk';

export function setupCommands(yargs: Argv): Argv {
  return yargs
    .command(
      ['map', 'm'],
      'Genera el mapa del directorio',
      (yargs) => {
        return yargs.positional('directory', {
          describe: 'El directorio a mapear',
          type: 'string',
        });
      },
      (argv) => {
        scan(argv.directory as string | undefined, argv.exclude as string | undefined);
      }
    )
    .option('exclude', {
      alias: 'e',
      describe: 'Patrones glob a excluir (separados por comas)',
      type: 'string',
    })
    .command(
      ['preview', 'p'],
      'Abre directamente el HTML generado en el navegador',
      () => {
        open(config.outputFileName);
      }
    )
    .command(
      ['version', 'v'],
      'Muestra la versión del paquete',
      () => {
        console.log(`broch version ${chalk.green('1.0.0')}`);
      }
    );
}
