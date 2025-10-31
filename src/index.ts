#!/usr/bin/env node

import { buildCli } from './cli';
import { commands } from './commands';
import asciify from 'asciify-image';
import path from 'path';
import chalk from 'chalk';
import boxen from 'boxen';

const MIN_NODE_VERSION = 12;

/**
 * Muestra el logo y la ayuda personalizada.
 */
async function showHelpAndLogo(): Promise<void> {
  const logoPath = path.join(__dirname, '..', 'assets', 'logo.png');
  try {
    const asciiArt = await new Promise<string>((resolve, reject) => {
      asciify(logoPath, { fit: 'box', width: 12, color: false }, (err, asciified) => {
        if (err) return reject(err);
        const silhouette = (asciified as string).split('\n').slice(1).map(line => line.replace(/;/g, ' ').trimEnd()).join('\n').trim();
        resolve(silhouette);
      });
    });

    const usage = `${chalk.bold('Uso:')}\n${chalk.cyan('broch <comando>')} ${chalk.gray('[opciones]')}`;
    const cmdList = commands.map(cmd => `  ${chalk.cyan(cmd.name[0].padEnd(10))} ${chalk.gray(`(alias: ${cmd.name.slice(1).join(', ')})`)} - ${cmd.description}`).join('\n');
    const cmdSection = `${chalk.bold('Comandos:')}\n${cmdList}`;
    const optionsList = [
      `  ${chalk.cyan('--help, -h'.padEnd(10))} - Muestra esta ayuda`,
      `  ${chalk.cyan('--version, -v'.padEnd(10))} - Muestra la versión`,
      `  ${chalk.cyan('--exclude, -e'.padEnd(10))} - Excluye patrones`
    ].join('\n');
    const optionsSection = `${chalk.bold('Opciones:')}\n${optionsList}`;
    const epilogue = chalk.gray('Para más información, visita la documentación oficial.');

    console.log(boxen(`${chalk.white(asciiArt)}\n\n${usage}\n\n${cmdSection}\n\n${optionsSection}\n\n${epilogue}`, {
      padding: 1, margin: 1, borderStyle: 'round', borderColor: 'cyan', title: chalk.bold('broch CLI'), titleAlignment: 'center',
    }));
  } catch (error) {
    console.error(chalk.red('Error al mostrar la ayuda:'), error);
  }
}

/**
 * Verifica la versión de Node.js.
 */
function checkNodeVersion(): void {
  const majorVersion = parseInt(process.versions.node.split('.')[0], 10);
  if (majorVersion < MIN_NODE_VERSION) {
    console.error(chalk.red(`Error: Se requiere Node.js v${MIN_NODE_VERSION} o superior.`));
    process.exit(1);
  }
}

/**
 * Función principal.
 */
async function main(): Promise<void> {
  try {
    checkNodeVersion();
    const cli = buildCli();
    const argv = await cli.argv;
    if (!(argv as any)._[0] || argv.help) {
      await showHelpAndLogo();
    }
  } catch (error) {
    console.error(chalk.red('Ha ocurrido un error inesperado:'), error);
    process.exit(1);
  }
}

main();
