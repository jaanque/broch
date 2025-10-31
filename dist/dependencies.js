"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectDependencies = detectDependencies;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
// Expresiones regulares para detectar dependencias en diferentes tipos de archivos.
const JS_TS_REGEX = /(?:import|require|from)\s*\(?['"](.*?\.[\w\d]+|.*?)['"]\)?/g;
const HTML_REGEX = /(?:href|src)=['"](.*?)['"]/g;
const CSS_REGEX = /@import\s*(?:url\(['"]?(.*?)['"]?\)|['"](.*?)['"])/g;
const PHP_REGEX = /(?:require|include|require_once|include_once)\s*\(?['"](.*?)['"]\)?/g;
/**
 * Resuelve una ruta de dependencia a un archivo existente en la lista de archivos escaneados.
 * @param depPath - La ruta de la dependencia a resolver.
 * @param fileDir - El directorio del archivo que contiene la dependencia.
 * @param allFiles - Un Set con todas las rutas de los archivos escaneados.
 * @returns La ruta resuelta o null si no se puede resolver.
 */
function resolveDependency(depPath, fileDir, allFiles) {
    const extensions = ['', '.ts', '.tsx', '.js', '.jsx', '.json'];
    const resolvedPath = path_1.default.resolve(fileDir, depPath);
    // 1. Intentar resolver la ruta directamente.
    if (allFiles.has(resolvedPath)) {
        return resolvedPath;
    }
    // 2. Intentar añadir extensiones.
    for (const ext of extensions) {
        if (allFiles.has(resolvedPath + ext)) {
            return resolvedPath + ext;
        }
    }
    // 3. Intentar resolver un archivo `index` en un directorio.
    for (const ext of extensions.slice(1)) {
        const indexPath = path_1.default.join(resolvedPath, `index${ext}`);
        if (allFiles.has(indexPath)) {
            return indexPath;
        }
    }
    return null;
}
/**
 * Detecta las dependencias de un archivo.
 * @param filePath - La ruta del archivo a analizar.
 * @param allFiles - Un Set con todas las rutas de los archivos escaneados.
 * @returns Un array con las dependencias resueltas.
 */
function detectDependencies(filePath, allFiles) {
    try {
        const fileContent = (0, fs_1.readFileSync)(filePath, 'utf-8');
        const fileDir = path_1.default.dirname(filePath);
        const dependencies = new Set();
        const ext = path_1.default.extname(filePath);
        const regex = {
            '.js': JS_TS_REGEX,
            '.ts': JS_TS_REGEX,
            '.jsx': JS_TS_REGEX,
            '.tsx': JS_TS_REGEX,
            '.html': HTML_REGEX,
            '.css': CSS_REGEX,
            '.php': PHP_REGEX,
        }[ext];
        if (!regex) {
            return [];
        }
        let match;
        while ((match = regex.exec(fileContent)) !== null) {
            const depPath = match[1] || match[2];
            // Filtrar dependencias de node_modules y URLs externas.
            if (depPath && depPath.startsWith('.')) {
                const resolved = resolveDependency(depPath, fileDir, allFiles);
                if (resolved) {
                    dependencies.add(resolved);
                }
            }
        }
        return Array.from(dependencies);
    }
    catch (error) {
        return []; // Devolver un array vacío si hay un error de lectura.
    }
}
//# sourceMappingURL=dependencies.js.map