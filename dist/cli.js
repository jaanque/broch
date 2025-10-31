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
function buildCli() {
    const cli = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
        .scriptName('broch')
        .usage(`${chalk_1.default.bold('Uso:')} $0 <comando> [opciones]`)
        .help('h')
        .alias('h', 'help')
        .epilogue(`Para más información, visita nuestra documentación en ${chalk_1.default.underline('https://github.com/your-repo/broch')}`)
        .strict()
        .demandCommand(0);
    (0, commands_1.setupCommands)(cli);
    return cli;
}
//# sourceMappingURL=cli.js.map