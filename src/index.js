#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .command('map', 'Genera el mapa del directorio', () => {
    console.log('Generando mapa...');
})
    .alias('m', 'map')
    .command('preview', 'Abre directamente el HTML generado en el navegador', () => {
    console.log('Abriendo preview...');
})
    .alias('p', 'preview')
    .command('config', 'Menú de configuración interactivo', () => {
    console.log('Abriendo configuración...');
})
    .command('version', 'Muestra la versión del paquete', () => {
    console.log('broch version 1.0.0');
})
    .alias('v', 'version')
    .help()
    .alias('h', 'help')
    .argv;
//# sourceMappingURL=index.js.map