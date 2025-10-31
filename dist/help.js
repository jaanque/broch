"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showHelp = showHelp;
const chalk_1 = __importDefault(require("chalk"));
const boxen_1 = __importDefault(require("boxen"));
function showHelp() {
    const helpText = `
${chalk_1.default.bold('B R O C H')}

${chalk_1.default.bold('Uso:')}
  broch <comando> [opciones]

${chalk_1.default.bold('Comandos:')}
  ${chalk_1.default.cyan('map [directory]')} (alias: m [directory]) - Genera el mapa del directorio
  ${chalk_1.default.cyan('preview')}         (alias: p)            - Abre el HTML generado en el navegador
  ${chalk_1.default.cyan('version')}         (alias: v)            - Muestra la versión del paquete
  ${chalk_1.default.cyan('help')}            (alias: h)            - Muestra esta ayuda

${chalk_1.default.bold('Opciones:')}
  ${chalk_1.default.cyan('--exclude, -e')}   Excluye patrones

${chalk_1.default.dim('Nota: Al ejecutar broch por primera vez, se creará el archivo "broch.config.json" para la configuración del paquete.')}

Para más información, visita la documentación oficial.
  `;
    console.log((0, boxen_1.default)(helpText, {
        title: chalk_1.default.cyan.bold('broch CLI'),
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'cyan',
    }));
}
//# sourceMappingURL=help.js.map