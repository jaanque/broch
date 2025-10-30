#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const scanner_1 = require("./scanner");
const config_1 = require("./config");
const open_1 = __importDefault(require("open"));
const config_2 = __importDefault(require("./config"));
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .command('map [directory]', 'Genera el mapa del directorio', (yargs) => {
    return yargs.positional('directory', {
        describe: 'El directorio a mapear',
        type: 'string',
    });
}, (argv) => {
    (0, scanner_1.scan)(argv.directory, argv.exclude);
})
    .option('exclude', {
    alias: 'e',
    describe: 'Patrones glob a excluir (separados por comas)',
    type: 'string',
})
    .alias('m', 'map')
    .command('preview', 'Abre directamente el HTML generado en el navegador', () => {
    const outputFileName = config_2.default.get('outputFileName');
    (0, open_1.default)(outputFileName);
})
    .alias('p', 'preview')
    .command('config', 'Menú de configuración interactivo', () => {
    (0, config_1.configMenu)();
})
    .command('version', 'Muestra la versión del paquete', () => {
    console.log('broch version 1.0.0');
})
    .alias('v', 'version')
    .help()
    .alias('h', 'help')
    .argv;
//# sourceMappingURL=index.js.map