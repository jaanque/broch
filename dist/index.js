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
const terminal_image_1 = __importDefault(require("terminal-image"));
const path_1 = __importDefault(require("path"));
const MIN_NODE_VERSION = 12;
function showLogo() {
    return __awaiter(this, void 0, void 0, function* () {
        const logoPath = path_1.default.join(__dirname, '..', 'assets', 'logo.png');
        try {
            const image = yield terminal_image_1.default.file(logoPath, { width: 40 });
            console.log(image);
        }
        catch (error) {
            // No hacer nada si hay un error
        }
    });
}
function checkNodeVersion() {
    const majorVersion = parseInt(process.versions.node.split('.')[0], 10);
    if (majorVersion < MIN_NODE_VERSION) {
        console.error(`Error: Se requiere Node.js v${MIN_NODE_VERSION} o superior. Versión actual: ${process.versions.node}`);
        process.exit(1);
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        checkNodeVersion();
        const cli = (0, cli_1.buildCli)();
        const argv = yield cli.argv;
        if (!argv._[0] || argv.help) {
            yield showLogo();
            cli.showHelp();
        }
    });
}
main();
//# sourceMappingURL=index.js.map