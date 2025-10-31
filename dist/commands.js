"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
exports.setupCommands = setupCommands;
const scanner_1 = require("./scanner");
const open_1 = __importDefault(require("open"));
const config_1 = __importDefault(require("./config"));
const chalk_1 = __importDefault(require("chalk"));
const help_1 = require("./help");
// Estructura de datos con la definición de todos los comandos
exports.commands = [
    {
        name: ['map [directory]', 'm [directory]'],
        description: 'Genera el mapa del directorio',
        builder: (yargs) => yargs.positional('directory', {
            describe: 'El directorio a mapear',
            type: 'string',
        }),
        handler: (argv) => (0, scanner_1.scan)(argv.directory, argv.exclude),
    },
    {
        name: ['preview', 'p'],
        description: 'Abre el HTML generado en el navegador',
        handler: () => (0, open_1.default)(config_1.default.outputFileName),
    },
    {
        name: ['version', 'v'],
        description: 'Muestra la versión del paquete',
        handler: () => console.log(`broch version ${chalk_1.default.green('1.0.0')}`),
    },
    {
        name: ['help', 'h'],
        description: 'Muestra la ayuda',
        handler: () => (0, help_1.showHelp)(),
    },
];
// Función que configura los comandos en yargs
function setupCommands(yargs) {
    exports.commands.forEach(cmd => {
        yargs.command(cmd.name, cmd.description, cmd.builder || {}, cmd.handler);
    });
    return yargs;
}
//# sourceMappingURL=commands.js.map