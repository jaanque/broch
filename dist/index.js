#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("./cli");
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
    const cli = (0, cli_1.buildCli)();
    const argv = cli.argv;
    if (!argv._[0]) {
        cli.showHelp();
    }
}
main();
//# sourceMappingURL=index.js.map