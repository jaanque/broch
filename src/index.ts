#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { scan } from './scanner';
import { configMenu } from './config';
import open from 'open';
import conf from './config';

yargs(hideBin(process.argv))
  .command('map [directory]', 'Genera el mapa del directorio', (yargs) => {
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
  })
  .alias('m', 'map')
  .command('preview', 'Abre directamente el HTML generado en el navegador', () => {
    const outputFileName = conf.get('outputFileName') as string;
    open(outputFileName);
  })
  .alias('p', 'preview')
  .command('config', 'Menú de configuración interactivo', () => {
    configMenu();
  })
  .command('version', 'Muestra la versión del paquete', () => {
    console.log('broch version 1.0.0');
  })
  .alias('v', 'version')
  .help()
  .alias('h', 'help')
  .argv;
