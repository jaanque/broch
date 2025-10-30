import { writeFileSync, statSync } from 'fs';
import path from 'path';
import config from './config';

interface Node {
  id: string;
  label: string;
  color: string;
  title: string;
  group?: string;
}

interface Edge {
  from: string;
  to: string;
  arrows: string;
}

const getFileTypeColor = (filePath: string): string => {
  const extension = path.extname(filePath).substring(1);
  const colors = config.colors as { [key: string]: string };

  const extensionMap: { [key: string]: string } = {
    'ts': 'js',
    'tsx': 'js',
    'jsx': 'js',
    'svg': 'image',
    'png': 'image',
    'jpg': 'image',
    'jpeg': 'image',
    'gif': 'image',
  };

  const colorKey = extensionMap[extension] || extension;

  return colors[colorKey] || colors.other;
};

const getFileMetadata = (filePath: string): string => {
  try {
    const stats = statSync(filePath);
    const tooltip = document.createElement('div');
    tooltip.innerHTML = `
      <strong>${path.basename(filePath)}</strong><br>
      <small>${filePath}</small><br><br>
      <strong>Size:</strong> ${stats.size} bytes<br>
      <strong>Modified:</strong> ${stats.mtime.toLocaleDateString()}
    `;
    return tooltip.innerHTML;
  } catch (e) {
    return filePath;
  }
}

export function generateHtml(files: string[], dependencies: Map<string, string[]>) {
  const outputFileName = config.outputFileName;

  const nodes: Node[] = files.map(file => ({
    id: file,
    label: path.basename(file),
    color: getFileTypeColor(file),
    title: `Path: ${file}<br>Size: ${statSync(file).size} bytes<br>Modified: ${statSync(file).mtime.toLocaleDateString()}`,
    group: path.dirname(file),
  }));

  const edges: Edge[] = [];
  for (const [file, deps] of dependencies.entries()) {
    for (const dep of deps) {
      if (files.includes(dep)) {
        edges.push({ from: file, to: dep, arrows: 'to' });
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
          body { font-family: sans-serif; }
          #network {
            width: 100%;
            height: 98vh;
            border: 1px solid #e2e2e2;
            background-color: #f7f7f7;
          }
          #legend {
            display: none;
            position: absolute;
            top: 15px;
            left: 15px;
            background-color: rgba(255, 255, 255, 0.9);
            border: 1px solid #e2e2e2;
            border-radius: 8px;
            padding: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
           .vis-tooltip {
            background-color: #fff !important;
            border: 1px solid #ccc !important;
            border-radius: 8px !important;
            padding: 10px !important;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important;
            font-family: sans-serif !important;
            color: #333 !important;
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
              margin: 10,
              font: {
                size: 14,
                color: '#333'
              },
              borderWidth: 1,
              shadow: true
            },
            edges: {
              width: 1,
              color: {
                color: '#848484',
                highlight: '#333'
              },
              arrows: {
                to: { enabled: true, scaleFactor: 0.5 }
              }
            },
            physics: {
              solver: 'forceAtlas2Based',
              forceAtlas2Based: {
                gravitationalConstant: -50,
                centralGravity: 0.01,
                springLength: 200,
                springConstant: 0.08
              }
            },
            interaction: {
              tooltipDelay: 100,
              hover: true
            },
            groups: {
              useDefaultGroups: true,
            }
          };
          const network = new vis.Network(container, data, options);

          network.on("afterDrawing", function (ctx) {
            var nodeId = network.getNodeAt(network.canvas.getPointer());
            if (nodeId) {
                network.body.nodes[nodeId].setOptions({
                    shadow: {
                        enabled: true,
                        color: 'rgba(0,0,0,0.2)',
                        size: 15,
                        x: 5,
                        y: 5
                    }
                });
            }
        });
          document.getElementById('toggle-legend').addEventListener('click', () => {
            const legend = document.getElementById('legend');
            legend.style.display = legend.style.display === 'none' ? 'block' : 'none';
          });
        </script>
      </body>
    </html>
  `;

  writeFileSync(outputFileName, htmlContent);
  console.log(`Map generated: ${outputFileName}`);
}
