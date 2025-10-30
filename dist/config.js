"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const CONFIG_FILE_NAME = 'broch.config.json';
const configFilePath = path_1.default.resolve(process.cwd(), CONFIG_FILE_NAME);
const defaultConfig = {
    outputFileName: 'brochMap.html',
    colors: {
        html: '#E44D26', // Orange
        css: '#1572B6', // Blue
        js: '#F7DF1E', // Yellow
        php: '#777BB4', // Purple
        image: '#4CAF50', // Green
        rust: '#DE3423', // Rust Orange
        other: '#CCCCCC', // Light Gray
    },
};
let config = defaultConfig;
if ((0, fs_1.existsSync)(configFilePath)) {
    const userConfig = JSON.parse((0, fs_1.readFileSync)(configFilePath, 'utf-8'));
    // Deep merge user config with default config
    config = Object.assign(Object.assign(Object.assign({}, defaultConfig), userConfig), { colors: Object.assign(Object.assign({}, defaultConfig.colors), (userConfig.colors || {})) });
}
else {
    (0, fs_1.writeFileSync)(configFilePath, JSON.stringify(defaultConfig, null, 2));
}
exports.default = config;
//# sourceMappingURL=config.js.map