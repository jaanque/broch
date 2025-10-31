#!/usr/bin/env node

import { buildCli } from './cli';
import asciify from 'asciify-image';
import path from 'path';
import chalk from 'chalk';

const MIN_NODE_VERSION = 12;

/**
 * Muestra el logo de la aplicación como arte ASCII.
 */
async function showLogo(): Promise<void> {
  const logoPath = path.join(__dirname, '..', 'assets', 'logo.png');
  try {
    const asciiArt = await new Promise<string>((resolve, reject) => {
      asciify(logoPath, { fit: 'box', width: 12, color: false }, (err, asciified) => {
        if (err) return reject(err);

        // Procesa el arte ASCII para dejar solo la silueta.
        const silhouette = (asciified as string)
          .split('\n')
          .map(line => line.replace(/;/g, ' ').trimEnd())
          .join('\n')
          .trim(); // Elimina líneas vacías al principio y al final.

        resolve(silhouette);
      });
    });
    console.log(chalk.white(asciiArt));
  } catch (error) {
    console.error(chalk.red('Error al mostrar el logo:'), error);
  }
}

/**
 * Verifica que la versión de Node.js sea compatible.
 */
function checkNodeVersion(): void {
  const majorVersion = parseInt(process.versions.node.split('.')[0], 10);
  if (majorVersion < MIN_NODE_VERSION) {
    console.error(chalk.red(`Error: Se requiere Node.js v${MIN_NODE_VERSION} o superior. Versión actual: ${process.versions.node}`));
    process.exit(1);
  }
}

/**
 * Función principal que inicializa el CLI.
 */
async function main(): Promise<void> {
  try {
    checkNodeVersion();

    const cli = buildCli();
    const argv = await cli.argv;

    // Mostrar ayuda si no se proporcionan comandos o si se solicita explícitamente.
    if (!(argv as any)._[0] || argv.help) {
      await showLogo();
      cli.showHelp();
    }
  } catch (error) {
    console.error(chalk.red('Ha ocurrido un error inesperado:'), error);
    process.exit(1);
  }
}

main();
