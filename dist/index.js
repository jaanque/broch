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
const asciify_image_1 = __importDefault(require("asciify-image"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const MIN_NODE_VERSION = 12;
/**
 * Muestra el logo de la aplicación como arte ASCII.
 */
function showLogo() {
    return __awaiter(this, void 0, void 0, function* () {
        const logoPath = path_1.default.join(__dirname, '..', 'assets', 'logo.png');
        try {
            const asciiArt = yield new Promise((resolve, reject) => {
                (0, asciify_image_1.default)(logoPath, { fit: 'box', width: 15, color: false }, (err, asciified) => {
                    if (err)
                        return reject(err);
                    resolve(asciified);
                });
            });
            console.log(chalk_1.default.white(asciiArt));
        }
        catch (error) {
            console.error(chalk_1.default.red('Error al mostrar el logo:'), error);
        }
    });
}
/**
 * Verifica que la versión de Node.js sea compatible.
 */
function checkNodeVersion() {
    const majorVersion = parseInt(process.versions.node.split('.')[0], 10);
    if (majorVersion < MIN_NODE_VERSION) {
        console.error(chalk_1.default.red(`Error: Se requiere Node.js v${MIN_NODE_VERSION} o superior. Versión actual: ${process.versions.node}`));
        process.exit(1);
    }
}
/**
 * Función principal que inicializa el CLI.
 */
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            checkNodeVersion();
            const cli = (0, cli_1.buildCli)();
            const argv = yield cli.argv;
            // Mostrar ayuda si no se proporcionan comandos o si se solicita explícitamente.
            if (!argv._[0] || argv.help) {
                yield showLogo();
                cli.showHelp();
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