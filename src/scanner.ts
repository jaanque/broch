import * as glob from 'glob';
import { lstatSync, readdirSync } from 'fs';
import { detectDependencies } from './dependencies';
import cliProgress from 'cli-progress';
import { generateHtml } from './html';
import path from 'path';
import inquirer from 'inquirer';

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
                message: 'Select a directory to map:',
                choices: ['.', ...directories],
            },
        ]);
        selectedDirectory = answer.selectedDirectory;
    }

    let exclusions: string[] = ['node_modules/**', '.git/**'];
    if (excludePatterns) {
        exclusions.push(...excludePatterns.split(',').map((p: string) => p.trim()));
    }

    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(100, 0);

    const duration = 4000;
    const interval = 50;
    let progress = 0;

    const timer = setInterval(() => {
        progress += (interval / duration) * 100;
        progressBar.update(Math.min(progress, 100));
    }, interval);

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

        setTimeout(() => {
            clearInterval(timer);
            progressBar.stop();
            generateHtml(absoluteFiles, dependencies, selectedDirectory);
        }, duration);
    } catch (error) {
        clearInterval(timer);
        progressBar.stop();
        console.error('Failed to scan files.', error);
    }
}
