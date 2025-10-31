#!/usr/bin/env node

import { buildCli } from './cli';
import asciify from 'asciify-image';
import path from 'path';

const MIN_NODE_VERSION = 12;

async function showLogo() {
  const logoPath = path.join(__dirname, '..', 'assets', 'logo.png');
  try {
    const asciiArt = await new Promise((resolve, reject) => {
      asciify(logoPath, { fit: 'box', width: 40 }, (err, asciified) => {
        if (err) return reject(err);
        resolve(asciified);
      });
    });
    console.log(asciiArt);
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
