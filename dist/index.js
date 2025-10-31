#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("./cli");
const commands_1 = require("./commands");
const chalk_1 = __importDefault(require("chalk"));
const boxen_1 = __importDefault(require("boxen"));
const MIN_NODE_VERSION = 12;
/**
 * Muestra la ayuda personalizada con el logo de texto.
 */
function showHelpWithLogo() {
    const logo = chalk_1.default.bold.cyan('B R O C H');
    const usage = `${chalk_1.default.bold('Uso:')}\n${chalk_1.default.cyan('broch <comando>')} ${chalk_1.default.gray('[opciones]')}`;
    const cmdList = commands_1.commands.map(cmd => `  ${chalk_1.default.cyan(cmd.name[0].padEnd(10))} ${chalk_1.default.gray(`(alias: ${cmd.name.slice(1).join(', ')})`)} - ${cmd.description}`).join('\n');
    const cmdSection = `${chalk_1.default.bold('Comandos:')}\n${cmdList}`;
    const optionsList = [
        `  ${chalk_1.default.cyan('--help, -h'.padEnd(10))} - Muestra esta ayuda`,
        `  ${chalk_1.default.cyan('--version, -v'.padEnd(10))} - Muestra la versión`,
        `  ${chalk_1.default.cyan('--exclude, -e'.padEnd(10))} - Excluye patrones`
    ].join('\n');
    const optionsSection = `${chalk_1.default.bold('Opciones:')}\n${optionsList}`;
    const epilogue = chalk_1.default.gray('Para más información, visita la documentación oficial.');
    console.log((0, boxen_1.default)(`${logo}\n\n${usage}\n\n${cmdSection}\n\n${optionsSection}\n\n${epilogue}`, {
        padding: 1, margin: 1, borderStyle: 'round', borderColor: 'cyan', title: chalk_1.default.bold('broch CLI'), titleAlignment: 'center', textAlignment: 'center'
    }));
}
/**
 * Verifica la versión de Node.js.
 */
function checkNodeVersion() {
    const majorVersion = parseInt(process.versions.node.split('.')[0], 10);
    if (majorVersion < MIN_NODE_VERSION) {
        console.error(chalk_1.default.red(`Error: Se requiere Node.js v${MIN_NODE_VERSION} o superior.`));
        process.exit(1);
    }
}
/**
 * Función principal.
 */
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            checkNodeVersion();
            const cli = (0, cli_1.buildCli)();
            const argv = yield cli.argv;
            if (!argv._[0] || argv.help) {
                showHelpWithLogo();
            }
        }
        catch (error) {
            console.error(chalk_1.default.red('Ha ocurrido un error inesperado:'), error);
            process.exit(1);
        }
    });
}
main();
//# sourceMappingURL=index.js.map