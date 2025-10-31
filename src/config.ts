import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';

interface Labels {
  [key: string]: string;
}

const CONFIG_FILE_NAME = 'broch.config.json';
const configFilePath = path.resolve(process.cwd(), CONFIG_FILE_NAME);

const defaultConfig = {
  outputFileName: 'brochMap.html',
  colors: {
    html: '#E44D26', css: '#1572B6', js: '#F7DF1E', php: '#777BB4',
    image: '#4CAF50', rust: '#DE3423', json: '#000000', yml: '#cb171e',
    md: '#000000', py: '#3776AB', java: '#b07219', other: '#CCCCCC',
  },
  labels: {
    js: 'JS/TS', yml: 'YML', md: 'Markdown', py: 'Python', java: 'Java',
  } as Labels,
};

let config = defaultConfig;

if (existsSync(configFilePath)) {
  const userConfig = JSON.parse(readFileSync(configFilePath, 'utf-8'));
  config = {
    ...defaultConfig,
    ...userConfig,
    colors: { ...defaultConfig.colors, ...(userConfig.colors || {}) },
    labels: { ...defaultConfig.labels, ...(userConfig.labels || {}) },
  };
} else {
  writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2));
}

export default config;
