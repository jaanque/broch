#!/usr/bin/env node

import { buildCli } from './cli';

const MIN_NODE_VERSION = 12;

function checkNodeVersion() {
  const majorVersion = parseInt(process.versions.node.split('.')[0], 10);
  if (majorVersion < MIN_NODE_VERSION) {
    console.error(`Error: Se requiere Node.js v${MIN_NODE_VERSION} o superior. Versión actual: ${process.versions.node}`);
    process.exit(1);
  }
}

function main() {
  checkNodeVersion();

  const cli = buildCli();
  const argv = cli.argv;

  if (!(argv as any)._[0]) {
      cli.showHelp();
  }
}

main();
