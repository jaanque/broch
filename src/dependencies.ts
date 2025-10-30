import { readFileSync } from 'fs';
import path from 'path';

const JS_TS_REGEX = /(?:import|require)\s*\(?['"](.*?)['"]\)?/g;
const HTML_REGEX = /(?:href|src)=['"](.*?)['"]/g;
const CSS_REGEX = /@import\s*url\(['"]?(.*?)['"]?\)/g;
const PHP_REGEX = /(?:require|include)\s*['"](.*?)['"]/g;

export function detectDependencies(filePath: string): string[] {
  const fileContent = readFileSync(filePath, 'utf-8');
  const fileDir = path.dirname(filePath);
  const dependencies = new Set<string>();

  let regex: RegExp;
  const ext = path.extname(filePath);

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
        const resolvedPath = path.resolve(fileDir, depPath);
        dependencies.add(resolvedPath);
    }
  }

  return Array.from(dependencies);
}
