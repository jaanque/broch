import * as glob from 'glob';
import { lstatSync, readdirSync } from 'fs';
import { detectDependencies } from './dependencies';
import { generateHtml } from './html';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import cliProgress from 'cli-progress';

/**
 * Comprueba si una ruta es un directorio.
 */
const isDirectory = (source: string): boolean => {
    try {
        return lstatSync(source).isDirectory();
    } catch (e) {
        return false;
    }
};

/**
 * Obtiene los directorios de una ruta.
 */
const getDirectories = (source:string): string[] =>
    readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);


/**
 * Solicita al usuario que seleccione un directorio.
 */
async function selectDirectory(): Promise<string | undefined> {
    const directories = getDirectories(process.cwd());
    const answer = await inquirer.prompt<{ selectedDirectory: string }>([
        {
            type: 'list',
            name: 'selectedDirectory',
            message: chalk.bold('Selecciona el directorio a escanear:'),
            choices: ['.', ...directories],
        },
    ]);
    return answer.selectedDirectory;
}

/**
 * Escanea un directorio y genera un mapa de dependencias.
 */
export async function scan(directory?: string, excludePatterns?: string): Promise<void> {
    try {
        let selectedDirectory = directory;
        if (!selectedDirectory) {
            selectedDirectory = await selectDirectory();
        }

        if (!selectedDirectory) {
            console.log(chalk.yellow('No se ha seleccionado ningún directorio.'));
            return;
        }

        const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
        progressBar.start(100, 0);
        await new Promise(resolve => {
            let value = 0;
            const interval = setInterval(() => {
                value += 1;
                progressBar.update(value);
                if (value >= 100) {
                    clearInterval(interval);
                    progressBar.stop();
                    resolve(null);
                }
            }, 40);
        });

        console.log(chalk.cyan('Escaneando archivos...'));

        const exclusions: string[] = ['node_modules/**', '.git/**'];
        if (excludePatterns) {
            exclusions.push(...excludePatterns.split(',').map((p: string) => p.trim()));
        }

        const files = glob.sync(`${selectedDirectory}/**/*`, { ignore: exclusions, dot: true, nodir: true });
        const absoluteFiles = files.map(file => path.resolve(file));
        const filesSet = new Set(absoluteFiles);
        const dependencies = new Map<string, string[]>();

        for (const file of absoluteFiles) {
            console.log(chalk.cyan(`Analizando: ${file}`));
            const deps = detectDependencies(file, filesSet);
            if (deps.length > 0) {
                dependencies.set(file, deps);
            }
        }

        console.log(chalk.cyan('Generando mapa HTML...'));
        generateHtml(absoluteFiles, dependencies, selectedDirectory);
        console.log(chalk.green('Mapa generado exitosamente.'));

    } catch (error) {
        console.error(chalk.red('Ha ocurrido un error durante el escaneo.'));
        if (error instanceof Error) {
            console.error(chalk.red(error.message));
        } else {
            console.error(chalk.red('Un error desconocido ha ocurrido.'));
        }
    }
}
