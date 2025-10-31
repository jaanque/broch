import { Argv } from 'yargs';
import { scan } from './scanner';
import open from 'open';
import config from './config';
import chalk from 'chalk';
import { showHelp } from './help';

// Definición de la estructura para los comandos
interface Command {
  name: string[];
  description: string;
  builder?: (yargs: Argv) => Argv;
  handler: (argv: any) => void;
}

// Estructura de datos con la definición de todos los comandos
export const commands: Command[] = [
  {
    name: ['map [directory]', 'm [directory]'],
    description: 'Genera el mapa del directorio',
    builder: (yargs) => yargs.positional('directory', {
      describe: 'El directorio a mapear',
      type: 'string',
    }),
    handler: (argv) => scan(argv.directory, argv.exclude),
  },
  {
    name: ['preview', 'p'],
    description: 'Abre el HTML generado en el navegador',
    handler: () => open(config.outputFileName),
  },
  {
    name: ['version', 'v'],
    description: 'Muestra la versión del paquete',
    handler: () => console.log(`broch version ${chalk.green('1.0.0')}`),
  },
  {
    name: ['help', 'h'],
    description: 'Muestra la ayuda',
    handler: () => showHelp(),
  },
];

// Función que configura los comandos en yargs
export function setupCommands(yargs: Argv): Argv {
  commands.forEach(cmd => {
    yargs.command(cmd.name, cmd.description, cmd.builder || {}, cmd.handler);
  });
  return yargs;
}
