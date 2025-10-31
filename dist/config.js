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
        html: '#E44D26', css: '#1572B6', js: '#F7DF1E', php: '#777BB4',
        image: '#4CAF50', rust: '#DE3423', json: '#000000', yml: '#cb171e',
        md: '#000000', py: '#3776AB', java: '#b07219', other: '#CCCCCC',
    },
    labels: {
        js: 'JS/TS', yml: 'YML', md: 'Markdown', py: 'Python', java: 'Java',
    },
};
let config = defaultConfig;
if ((0, fs_1.existsSync)(configFilePath)) {
    const userConfig = JSON.parse((0, fs_1.readFileSync)(configFilePath, 'utf-8'));
    config = Object.assign(Object.assign(Object.assign({}, defaultConfig), userConfig), { colors: Object.assign(Object.assign({}, defaultConfig.colors), (userConfig.colors || {})), labels: Object.assign(Object.assign({}, defaultConfig.labels), (userConfig.labels || {})) });
}
else {
    (0, fs_1.writeFileSync)(configFilePath, JSON.stringify(defaultConfig, null, 2));
}
exports.default = config;
//# sourceMappingURL=config.js.map