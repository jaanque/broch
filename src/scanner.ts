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

    console.log(`Scanning files in ${selectedDirectory}...`);
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

    try {
        const searchPath = selectedDirectory || '.';
        const files = glob.sync(`${searchPath}/**/*`, { ignore: exclusions, dot: true, nodir: true });

        const absoluteFiles = files.map(file => path.resolve(file));
        const filesSet = new Set(absoluteFiles);

        console.log(`Found ${absoluteFiles.length} files.`);
        progressBar.start(absoluteFiles.length, 0);

        const dependencies = new Map<string, string[]>();
        for (const file of absoluteFiles) {
            const deps = detectDependencies(file, filesSet);
            if (deps.length > 0) {
                dependencies.set(file, deps);
            }
            progressBar.increment();
            await new Promise(resolve => setTimeout(resolve, 10));
        }

        progressBar.stop();

        generateHtml(absoluteFiles, dependencies, selectedDirectory);
    } catch (error) {
        progressBar.stop();
        console.error('Failed to scan files.', error);
    }
}
