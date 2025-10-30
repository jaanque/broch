"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHtml = generateHtml;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("./config"));
const getFileTypeColor = (filePath) => {
    const extension = path_1.default.extname(filePath).substring(1);
    const colors = config_1.default.get('colors');
    if (colors[extension]) {
        return colors[extension];
    }
    const imageExtensions = ['png', 'gif', 'svg', 'jpg', 'jpeg'];
    if (imageExtensions.includes(extension)) {
        return colors.image;
    }
    return colors.other;
};
const getFileMetadata = (filePath) => {
    try {
        const stats = (0, fs_1.statSync)(filePath);
        return `Path: ${filePath}<br>Size: ${stats.size} bytes<br>Modified: ${stats.mtime.toLocaleDateString()}`;
    }
    catch (e) {
        return `Path: ${filePath}`;
    }
};
function generateHtml(files, dependencies) {
    const outputFileName = config_1.default.get('outputFileName');
    const nodes = files.map(file => ({
        id: file,
        label: path_1.default.basename(file),
        color: getFileTypeColor(file),
        title: getFileMetadata(file),
        group: path_1.default.dirname(file),
    }));
    const edges = [];
    for (const [file, deps] of dependencies.entries()) {
        for (const dep of deps) {
            if (files.includes(dep)) {
                edges.push({ from: file, to: dep });
            }
        }
    }
    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Broch Map</title>
        <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
        <style type="text/css">
          #network {
            width: 100%;
            height: 98vh;
            border: 1px solid lightgray;
          }
          #legend {
            display: none;
            position: absolute;
            top: 10px;
            left: 10px;
            background-color: white;
            border: 1px solid black;
            padding: 10px;
          }
        </style>
      </head>
      <body>
        <div id="network"></div>
        <div id="legend">
          <h3>Color Legend</h3>
          <div style="background-color: orange; color: white;">HTML</div>
          <div style="background-color: green; color: white;">CSS</div>
          <div style="background-color: blue; color: white;">JS/TS</div>
          <div style="background-color: darkblue; color: white;">PHP</div>
          <div style="background-color: pink;">Images</div>
          <div style="background-color: gray; color: white;">Rust/Go</div>
          <div style="background-color: lightgray;">Other</div>
        </div>
        <button id="toggle-legend">Toggle Legend</button>
        <script type="text/javascript">
          const nodes = new vis.DataSet(${JSON.stringify(nodes)});
          const edges = new vis.DataSet(${JSON.stringify(edges)});
          const container = document.getElementById('network');
          const data = { nodes, edges };
          const options = {
            nodes: {
              shape: 'box',
            },
            physics: {
                enabled: true,
                barnesHut: {
                    gravitationalConstant: -2000,
                    centralGravity: 0.3,
                    springLength: 95,
                    springConstant: 0.04,
                    damping: 0.09,
                    avoidOverlap: 0.1
                }
            },
            interaction: {
              tooltipDelay: 200,
            },
            groups: {
              useDefaultGroups: true,
            }
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
    (0, fs_1.writeFileSync)(outputFileName, htmlContent);
    console.log(`Map generated: ${outputFileName}`);
}
//# sourceMappingURL=html.js.map