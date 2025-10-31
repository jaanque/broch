"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCli = buildCli;
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const chalk_1 = __importDefault(require("chalk"));
const commands_1 = require("./commands");
const help_1 = require("./help");
function buildCli() {
    const cli = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
        .scriptName('broch')
        .usage(`${chalk_1.default.bold('Uso:')} $0 <comando> [opciones]`)
        .help(false) // Desactiva la ayuda por defecto
        .version(false) // Desactiva la versión por defecto
        .strict()
        .demandCommand(1, '') // Requiere al menos un comando
        .strictCommands() // Activa el manejo estricto de comandos
        .fail((msg, err) => {
        (0, help_1.showHelp)();
        process.exit(1);
    });
    (0, commands_1.setupCommands)(cli);
    return cli;
}
//# sourceMappingURL=cli.js.map