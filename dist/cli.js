"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCli = buildCli;
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const chalk_1 = __importDefault(require("chalk"));
const commands_1 = require("./commands");
function buildCli() {
    const cli = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
        .scriptName('broch')
        .usage(`${chalk_1.default.bold('Uso:')} $0 <comando> [opciones]`)
        .help('h')
        .alias('h', 'help')
        .epilogue(`Nota: Al ejecutar broch por primera vez, se creará el archivo "broch.config.json" para la configuración del paquete.\nPara más información, visita nuestra documentación en ${chalk_1.default.underline('https://github.com/your-repo/broch')}`)
        .strict()
        .demandCommand(0)
        .strictCommands() // Activa el manejo estricto de comandos
        .fail((msg, err) => {
        // Personaliza el mensaje para comandos desconocidos
        if (msg && msg.includes('Unknown command')) {
            const args = (0, helpers_1.hideBin)(process.argv);
            const command = args[0] || ''; // Obtiene el comando de los argumentos del proceso
            console.error(chalk_1.default.red(`\nError: El comando "${command}" no es correcto.`));
            console.info(chalk_1.default.cyan('Por favor, ejecuta "broch --help" para más información.\n'));
        }
        else {
            console.error(chalk_1.default.red(`\nError: ${msg || 'Ha ocurrido un error.'}`));
        }
        process.exit(1);
    });
    (0, commands_1.setupCommands)(cli);
    return cli;
}
//# sourceMappingURL=cli.js.map