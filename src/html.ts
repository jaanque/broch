import { writeFileSync, statSync } from 'fs';
import path from 'path';
import conf from './config';

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
}

const getFileTypeColor = (filePath: string): string => {
  const extension = path.extname(filePath).substring(1);
  const colors = conf.get('colors') as { [key: string]: string };
  if (colors[extension]) {
    return colors[extension];
  }
  const imageExtensions = ['png', 'gif', 'svg', 'jpg', 'jpeg'];
  if (imageExtensions.includes(extension)) {
    return colors.image;
  }

  return colors.other;
};

const getFileMetadata = (filePath: string): string => {
  try {
    const stats = statSync(filePath);
    return `Path: ${filePath}<br>Size: ${stats.size} bytes<br>Modified: ${stats.mtime.toLocaleDateString()}`;
  } catch (e) {
    return `Path: ${filePath}`;
  }
}

export function generateHtml(files: string[], dependencies: Map<string, string[]>) {
  const outputFileName = conf.get('outputFileName') as string;
  const nodes: Node[] = files.map(file => ({
    id: file,
    label: path.basename(file),
    color: getFileTypeColor(file),
    title: getFileMetadata(file),
    group: path.dirname(file),
  }));

  const edges: Edge[] = [];
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

  writeFileSync(outputFileName, htmlContent);
  console.log(`Map generated: ${outputFileName}`);
}
