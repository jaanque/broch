import * as glob from 'glob';
import ora from 'ora';
import { lstatSync, readdirSync } from 'fs';
import { detectDependencies } from './dependencies';
import { generateHtml } from './html';
import path from 'path';

export async function scan(directory?: string, excludePatterns?: string) {
  let selectedDirectory = directory || '.';

  let exclusions: string[] = ['node_modules/**'];
  if (excludePatterns) {
    exclusions.push(...excludePatterns.split(',').map((p: string) => p.trim()));
  }

  const spinner = ora(`Scanning files in ${selectedDirectory}...`).start();

  try {
    const searchPath = selectedDirectory || '.';
    const files = glob.sync(`${searchPath}/**/*`, { ignore: exclusions, dot: true, nodir: true });

    const absoluteFiles = files.map(file => path.resolve(file));
    const filesSet = new Set(absoluteFiles);

    spinner.succeed(`Found ${absoluteFiles.length} files.`);

    const dependencies = new Map<string, string[]>();
    for (const file of absoluteFiles) {
      const deps = detectDependencies(file, filesSet);
      if (deps.length > 0) {
        dependencies.set(file, deps);
      }
    }

    generateHtml(absoluteFiles, dependencies);
  } catch (error) {
    spinner.fail('Failed to scan files.');
    console.error(error);
  }
}
