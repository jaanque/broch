import chalk from 'chalk';
import boxen from 'boxen';

export function showHelp() {
  const helpText = `
${chalk.bold('B R O C H')}

${chalk.bold('Uso:')}
  broch <comando> [opciones]

${chalk.bold('Comandos:')}
  ${chalk.cyan('map [directory]')} (alias: m [directory]) - Genera el mapa del directorio
  ${chalk.cyan('preview')}         (alias: p)            - Abre el HTML generado en el navegador
  ${chalk.cyan('version')}         (alias: v)            - Muestra la versión del paquete
  ${chalk.cyan('help')}            (alias: h)            - Muestra esta ayuda

${chalk.bold('Opciones:')}
  ${chalk.cyan('--exclude, -e')}   Excluye patrones

${chalk.dim('Nota: Al ejecutar broch por primera vez, se creará el archivo "broch.config.json" para la configuración del paquete.')}

Para más información, visita la documentación oficial.
  `;

  console.log(
    boxen(helpText, {
      title: chalk.cyan.bold('broch CLI'),
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'cyan',
    })
  );
}
