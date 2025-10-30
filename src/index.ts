#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { scan } from './scanner';
import open from 'open';
import config from './config';

const cli = yargs(hideBin(process.argv));

cli.command('map, -m [directory]', 'Genera el mapa del directorio', (yargs) => {
  return yargs.positional('directory', {
    describe: 'El directorio a mapear',
    type: 'string',
  });
}, (argv) => {
  scan(argv.directory, argv.exclude as string);
})
.option('exclude', {
  alias: 'e',
  describe: 'Patrones glob a excluir (separados por comas)',
  type: 'string',
});

cli.command('preview, -p', 'Abre directamente el HTML generado en el navegador', () => {
  open(config.outputFileName);
});

cli.command('version, -v', 'Muestra la versión del paquete', () => {
  console.log('broch version 1.0.0');
});

cli.help('help, -h')
.usage('Uso: $0 <comando> [opciones]')
.epilogue('Para más información, visita nuestra documentación en https://github.com/your-repo/broch')
.argv;
