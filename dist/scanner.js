"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.scan = scan;
const glob = __importStar(require("glob"));
const ora_1 = __importDefault(require("ora"));
const fs_1 = require("fs");
const dependencies_1 = require("./dependencies");
const html_1 = require("./html");
const path_1 = __importDefault(require("path"));
const inquirer_1 = __importDefault(require("inquirer"));
const isDirectory = (source) => {
    try {
        return (0, fs_1.lstatSync)(source).isDirectory();
    }
    catch (e) {
        return false;
    }
};
const getDirectories = (source) => (0, fs_1.readdirSync)(source).map(name => path_1.default.join(source, name)).filter(isDirectory);
function scan(directory, excludePatterns) {
    return __awaiter(this, void 0, void 0, function* () {
        let selectedDirectory = directory;
        if (!selectedDirectory) {
            const directories = getDirectories(process.cwd());
            const answer = yield inquirer_1.default.prompt([
                {
                    type: 'list',
                    name: 'selectedDirectory',
                    message: 'Select a directory to map:',
                    choices: ['.', ...directories],
                },
            ]);
            selectedDirectory = answer.selectedDirectory;
        }
        let exclusions = ['node_modules/**', '.git/**'];
        if (excludePatterns) {
            exclusions.push(...excludePatterns.split(',').map((p) => p.trim()));
        }
        const spinner = (0, ora_1.default)(`Scanning files in ${selectedDirectory}...`).start();
        try {
            const searchPath = selectedDirectory || '.';
            const files = glob.sync(`${searchPath}/**/*`, { ignore: exclusions, dot: true, nodir: true });
            const absoluteFiles = files.map(file => path_1.default.resolve(file));
            const filesSet = new Set(absoluteFiles);
            spinner.succeed(`Found ${absoluteFiles.length} files.`);
            const dependencies = new Map();
            for (const file of absoluteFiles) {
                const deps = (0, dependencies_1.detectDependencies)(file, filesSet);
                if (deps.length > 0) {
                    dependencies.set(file, deps);
                }
            }
            (0, html_1.generateHtml)(absoluteFiles, dependencies);
        }
        catch (error) {
            spinner.fail('Failed to scan files.');
            console.error(error);
        }
    });
}
//# sourceMappingURL=scanner.js.map