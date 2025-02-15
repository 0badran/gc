#!/usr/bin/env node

import { program } from 'commander';
import fs from 'fs';
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { createConfig, toPascalCase } from './utils/index.js';

const config = fs.existsSync('config.json') ? JSON.parse(fs.readFileSync('config.json')) : createConfig();
const pwf = fileURLToPath(import.meta.url);
const pwd = dirname(pwf);
const rootFiles = fs.readdirSync(pwd);
const hasAppFolder = rootFiles.includes('app');

program
   .name('gc, Generate React Component')
   .description('Create a new component')
   .argument('<name>', 'Component name')
   .parse()

const args = program.args;
let componentName = args[0];
componentName = toPascalCase(componentName);
const targetPath = `${pwd}/${hasAppFolder ? 'app' : 'src'}/components/${componentName}`;
const fileType = config.typescript ? 'ts' : 'js';

fs.mkdirSync(targetPath, { recursive: true });
fs.writeFileSync(`${targetPath}/${componentName}.${fileType}x`, `export default function ${componentName}(){
   return (
      <h1>${componentName}</h1>
   )}`);
fs.writeFileSync(`${targetPath}/${componentName}.test.${fileType}`, `import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import ${componentName} from './${componentName}';

test("${componentName} renders successfully", () => {
   render(<${componentName}/>);
   const element = screen.getByText(/${componentName}/i);
   expect(element).toBeInTheDocument();
});`
);

