"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHtml = generateHtml;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("./config"));
/**
 * Obtiene el color correspondiente a un tipo de archivo.
 */
const getFileTypeColor = (filePath) => {
    const extension = path_1.default.extname(filePath).substring(1);
    const colors = config_1.default.colors;
    const extensionMap = {
        'ts': 'js', 'tsx': 'js', 'jsx': 'js',
        'svg': 'image', 'png': 'image', 'jpg': 'image', 'jpeg': 'image', 'gif': 'image',
    };
    return colors[extensionMap[extension] || extension] || colors.other;
};
/**
 * Genera el contenido HTML para la leyenda de colores.
 */
const generateLegendHtml = () => {
    return Object.entries(config_1.default.colors).map(([key, color]) => {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        const textColor = (yiq >= 128) ? 'black' : 'white';
        const label = config_1.default.labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
        return `<div style="background-color: ${color}; color: ${textColor}; padding: 3px 6px; margin-bottom: 3px; border-radius: 4px; font-size: 12px;">${label}</div>`;
    }).join('');
};
/**
 * Genera el contenido HTML principal del mapa.
 */
const generateHtmlContent = (nodes, edges, legendHtml) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Broch Map</title>
      <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
      <style>
        body { font-family: sans-serif; }
        #network { width: 100%; height: 98vh; border: 1px solid #e2e2e2; background-color: #f7f7f7; }
        #legend { display: none; position: absolute; top: 15px; left: 15px; background-color: rgba(255, 255, 255, 0.9); border: 1px solid #e2e2e2; border-radius: 8px; padding: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .vis-tooltip { background-color: #fff !important; border: 1px solid #ccc !important; border-radius: 8px !important; padding: 10px !important; box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important; font-family: sans-serif !important; color: #333 !important; }
      </style>
    </head>
    <body>
      <div id="network"></div>
      <div id="legend"><h3>Color Legend</h3>${legendHtml}</div>
      <button id="toggle-legend">Toggle Legend</button>
      <script>
        const nodes = new vis.DataSet(${JSON.stringify(nodes)});
        const edges = new vis.DataSet(${JSON.stringify(edges)});
        const container = document.getElementById('network');
        const data = { nodes, edges };
        const options = {
          nodes: { shape: 'box', margin: 10, font: { size: 14, color: '#333' }, borderWidth: 1, shadow: true },
          edges: { width: 1, color: { color: '#848484', highlight: '#333' }, arrows: { to: { enabled: true, scaleFactor: 0.5 } } },
          physics: { solver: 'forceAtlas2Based', forceAtlas2Based: { gravitationalConstant: -50, centralGravity: 0.01, springLength: 200, springConstant: 0.08 } },
          interaction: { tooltipDelay: 100, hover: true },
          groups: { useDefaultGroups: true }
        };
        const network = new vis.Network(container, data, options);
        document.getElementById('toggle-legend').addEventListener('click', () => {
          const legend = document.getElementById('legend');
          legend.style.display = legend.style.display === 'none' ? 'block' : 'none';
        });
      </script>
    </body>
  </html>
`;
/**
 * Genera un mapa de dependencias en formato HTML.
 */
function generateHtml(files, dependencies, selectedDirectory) {
    const outputFilePath = path_1.default.join(selectedDirectory, config_1.default.outputFileName);
    const nodes = files.map(file => {
        const stats = (0, fs_1.statSync)(file);
        return {
            id: file,
            label: path_1.default.basename(file),
            color: getFileTypeColor(file),
            title: `Path: ${file}<br>Size: ${stats.size} bytes<br>Modified: ${stats.mtime.toLocaleDateString()}`,
            group: path_1.default.dirname(file),
        };
    });
    const edges = [];
    for (const [file, deps] of dependencies.entries()) {
        deps.forEach(dep => {
            if (files.includes(dep)) {
                edges.push({ from: file, to: dep, arrows: 'to' });
            }
        });
    }
    const legendHtml = generateLegendHtml();
    const htmlContent = generateHtmlContent(nodes, edges, legendHtml);
    (0, fs_1.writeFileSync)(outputFilePath, htmlContent);
}
//# sourceMappingURL=html.js.map