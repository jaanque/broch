import * as glob from 'glob';
import { lstatSync, readdirSync } from 'fs';
import { detectDependencies } from './dependencies';
import { generateHtml } from './html';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';

const isDirectory = (source: string) => {
    try {
      return lstatSync(source).isDirectory();
    } catch (e) {
      return false;
    }
};
const getDirectories = (source: string) =>
    readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);

export async function scan(directory?: string, excludePatterns?: string) {
    let selectedDirectory = directory;
    if (!selectedDirectory) {
        const directories = getDirectories(process.cwd());
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'selectedDirectory',
                message: chalk.bold('Selecciona el directorio a escanear:'),
                choices: ['.', ...directories],
            },
        ]);
        selectedDirectory = answer.selectedDirectory;
    }

    if (!selectedDirectory) {
        console.log(chalk.yellow('No se ha seleccionado ningún directorio.'));
        return;
    }

    let exclusions: string[] = ['node_modules/**', '.git/**'];
    if (excludePatterns) {
        exclusions.push(...excludePatterns.split(',').map((p: string) => p.trim()));
    }

    const spinner = ora('Escaneando archivos...').start();

    try {
        const searchPath = selectedDirectory || '.';
        const files = glob.sync(`${searchPath}/**/*`, { ignore: exclusions, dot: true, nodir: true });
        const absoluteFiles = files.map(file => path.resolve(file));
        const filesSet = new Set(absoluteFiles);
        const dependencies = new Map<string, string[]>();

        for (const file of absoluteFiles) {
            const deps = detectDependencies(file, filesSet);
            if (deps.length > 0) {
                dependencies.set(file, deps);
            }
        }

        generateHtml(absoluteFiles, dependencies, selectedDirectory);
        spinner.succeed(chalk.green('Mapa generado exitosamente.'));

    } catch (error) {
        spinner.fail(chalk.red('Ha ocurrido un error durante el escaneo.'));
        if (error instanceof Error) {
            console.error(chalk.red(error.message));
        } else {
            console.error(chalk.red('Un error desconocido ha ocurrido.'));
        }
    }
}
