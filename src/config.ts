import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';

const CONFIG_FILE_NAME = 'broch.config.json';
const configFilePath = path.resolve(process.cwd(), CONFIG_FILE_NAME);

const defaultConfig = {
  outputFileName: 'brochMap.html',
  colors: {
    html: '#E44D26', // Orange
    css: '#1572B6',  // Blue
    js: '#F7DF1E',   // Yellow
    php: '#777BB4',  // Purple
    image: '#4CAF50',// Green
    rust: '#DE3423', // Rust Orange
    other: '#CCCCCC',// Light Gray
  },
};

let config = defaultConfig;

if (existsSync(configFilePath)) {
  const userConfig = JSON.parse(readFileSync(configFilePath, 'utf-8'));
  // Deep merge user config with default config
  config = {
    ...defaultConfig,
    ...userConfig,
    colors: {
      ...defaultConfig.colors,
      ...(userConfig.colors || {}),
    },
  };
} else {
  writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2));
}

export default config;
