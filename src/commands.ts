import { Argv } from 'yargs';
import { scan } from './scanner';
import open from 'open';
import config from './config';
import chalk from 'chalk';

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
    name: ['map', 'm'],
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
];

// Función que configura los comandos en yargs
export function setupCommands(yargs: Argv): Argv {
  commands.forEach(cmd => {
    yargs.command(cmd.name, cmd.description, cmd.builder || {}, cmd.handler);
  });
  return yargs;
}
