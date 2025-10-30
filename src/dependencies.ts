import { readFileSync } from 'fs';
import path from 'path';

const JS_TS_REGEX = /(?:import|require|from)\s*\(?['"](.*?\.[\w\d]+|.*?)['"]\)?/g;
const HTML_REGEX = /(?:href|src)=['"](.*?)['"]/g;
const CSS_REGEX = /@import\s*(?:url\(['"]?(.*?)['"]?\)|['"](.*?)['"])/g;
const PHP_REGEX = /(?:require|include|require_once|include_once)\s*\(?['"](.*?)['"]\)?/g;

// This helper function tries to resolve a dependency path to a file that actually exists in our scanned list.
function resolveDependency(depPath: string, fileDir: string, allFiles: Set<string>): string | null {
    const extensions = ['', '.ts', '.tsx', '.js', '.jsx', '.json'];

    // 1. Try resolving path directly
    const resolvedPath = path.resolve(fileDir, depPath);
    if (allFiles.has(resolvedPath)) {
        return resolvedPath;
    }

    // 2. Try adding extensions
    for (const ext of extensions) {
        const pathWithExt = resolvedPath + ext;
        if (allFiles.has(pathWithExt)) {
            return pathWithExt;
        }
    }

    // 3. Try index file in directory
     for (const ext of extensions.slice(1)) { // don't use empty ext here
        const indexPath = path.join(resolvedPath, 'index' + ext);
        if (allFiles.has(indexPath)) {
            return indexPath;
        }
    }

    return null; // Could not resolve
}

export function detectDependencies(filePath: string, allFiles: Set<string>): string[] {
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
    const depPath = match[1] || match[2];
    // Basic filter for node modules and external URLs
    if (depPath && depPath.startsWith('.')) {
        const resolved = resolveDependency(depPath, fileDir, allFiles);
        if (resolved) {
            dependencies.add(resolved);
        }
    }
  }
  return Array.from(dependencies);
}
