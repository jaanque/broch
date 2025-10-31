#!/usr/bin/env node

import { buildCli } from './cli';
import terminalImage from 'terminal-image';
import path from 'path';

const MIN_NODE_VERSION = 12;

async function showLogo() {
  const logoPath = path.join(__dirname, '..', 'assets', 'logo.png');
  try {
    const image = await terminalImage.file(logoPath, { width: 40 });
    console.log(image);
  } catch (error) {
    // No hacer nada si hay un error
  }
}

function checkNodeVersion() {
  const majorVersion = parseInt(process.versions.node.split('.')[0], 10);
  if (majorVersion < MIN_NODE_VERSION) {
    console.error(`Error: Se requiere Node.js v${MIN_NODE_VERSION} o superior. Versión actual: ${process.versions.node}`);
    process.exit(1);
  }
}

async function main() {
  checkNodeVersion();

  const cli = buildCli();
  const argv = await cli.argv;

  if (!(argv as any)._[0] || argv.help) {
    await showLogo();
    cli.showHelp();
  }
}

main();
