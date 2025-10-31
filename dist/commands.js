"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCommands = setupCommands;
const scanner_1 = require("./scanner");
const open_1 = __importDefault(require("open"));
const config_1 = __importDefault(require("./config"));
const chalk_1 = __importDefault(require("chalk"));
function setupCommands(yargs) {
    return yargs
        .command(['map', 'm'], 'Genera el mapa del directorio', (yargs) => {
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
        .command(['preview', 'p'], 'Abre directamente el HTML generado en el navegador', () => {
        (0, open_1.default)(config_1.default.outputFileName);
    })
        .command(['version', 'v'], 'Muestra la versión del paquete', () => {
        console.log(`broch version ${chalk_1.default.green('1.0.0')}`);
    });
}
//# sourceMappingURL=commands.js.map