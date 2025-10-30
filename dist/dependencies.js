"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectDependencies = detectDependencies;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const JS_TS_REGEX = /(?:import|require)\s*\(?['"](.*?)['"]\)?/g;
const HTML_REGEX = /(?:href|src)=['"](.*?)['"]/g;
const CSS_REGEX = /@import\s*url\(['"]?(.*?)['"]?\)/g;
const PHP_REGEX = /(?:require|include)\s*['"](.*?)['"]/g;
function detectDependencies(filePath) {
    const fileContent = (0, fs_1.readFileSync)(filePath, 'utf-8');
    const fileDir = path_1.default.dirname(filePath);
    const dependencies = new Set();
    let regex;
    const ext = path_1.default.extname(filePath);
    switch (ext) {
        case '.js':
        case '.ts':
        case '.jsx':
        case '.tsx':
            regex = JS_TS_REGEX;
            break;
        case '.html':
            regex = HTML_REGEX;
            break;
        case '.css':
            regex = CSS_REGEX;
            break;
        case '.php':
            regex = PHP_REGEX;
            break;
        default:
            return [];
    }
    let match;
    while ((match = regex.exec(fileContent)) !== null) {
        const depPath = match[1];
        if (depPath && !depPath.startsWith('http')) {
            const resolvedPath = path_1.default.resolve(fileDir, depPath);
            dependencies.add(resolvedPath);
        }
    }
    return Array.from(dependencies);
}
//# sourceMappingURL=dependencies.js.map