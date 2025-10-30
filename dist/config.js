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
exports.configMenu = configMenu;
const configstore_1 = __importDefault(require("configstore"));
const inquirer_1 = __importDefault(require("inquirer"));
const fs_1 = require("fs");
const pkg = JSON.parse((0, fs_1.readFileSync)('./package.json', 'utf-8'));
const conf = new configstore_1.default(pkg.name, {
    colors: {
        html: 'orange',
        css: 'green',
        js: 'blue',
        php: 'darkblue',
        image: 'pink',
        rust: 'gray',
        other: 'lightgray',
    },
    outputFileName: 'brochMap.html',
});
function editColors() {
    return __awaiter(this, void 0, void 0, function* () {
        const { fileType } = yield inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'fileType',
                message: 'Select a file type to change its color:',
                choices: Object.keys(conf.get('colors')),
            },
        ]);
        const { color } = yield inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'color',
                message: `Enter the new color for ${fileType}:`,
                default: conf.get(`colors.${fileType}`),
            },
        ]);
        conf.set(`colors.${fileType}`, color);
        console.log(`${fileType} color updated to ${color}`);
    });
}
function editOutputFileName() {
    return __awaiter(this, void 0, void 0, function* () {
        const { outputFileName } = yield inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'outputFileName',
                message: 'Enter the new output file name:',
                default: conf.get('outputFileName'),
            },
        ]);
        conf.set('outputFileName', outputFileName);
        console.log(`Output file name updated to ${outputFileName}`);
    });
}
function configMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        const { action } = yield inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What do you want to configure?',
                choices: ['Edit file colors', 'Edit output file name', 'Exit'],
            },
        ]);
        switch (action) {
            case 'Edit file colors':
                yield editColors();
                break;
            case 'Edit output file name':
                yield editOutputFileName();
                break;
            case 'Exit':
                return;
        }
    });
}
exports.default = conf;
//# sourceMappingURL=config.js.map