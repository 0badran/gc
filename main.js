#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs';
import { convertCase, getProjectRoot } from './utils/utils.js';
import { createCRUD, createService, deleteService, getService, updateService } from './src/create_service.js';
import generateComponent from './src/create_component.js';

const packageJson = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

program
   .name('toolg, tool-generator')
   .version(packageJson.version, '-v, --version', 'Display the version of the tool') // Properly defining version
   .argument('<name>', 'The name for tools to generate')
   .description('Create a component by default or a service with the -s flag')
   .helpOption('-h, --help', 'Display help for command')
   .option('-s, --service <char>', 'Create a service like(delete, update, create, read, all) services')
   .description('-s <service> [c|r|u|d|a]')
   .parse();

const args = program.args;
const opts = program.opts();
const tmp = args[0];

if (!fs.existsSync('toolg.config.json')) {
   console.error('Config file not found:');
   console.warn('Run `npx toolg-init` to create a config file');
   process.exit(1);
}

export const rootPath = getProjectRoot();
export const rootFiles = fs.readdirSync(rootPath);
export const hasAppFolder = rootFiles.includes('app');
export const targetPath = `${rootPath}/${hasAppFolder ? 'app' : 'src'}`;
export const config = JSON.parse(fs.readFileSync('toolg.config.json', 'utf-8'));
export const fileType = config.typescript ? 'ts' : 'js';

fs.mkdirSync(`${targetPath}/${opts.service ? 'services' : 'components'}`, { recursive: true });
if (opts.service) {
   const name = convertCase(tmp);
   const service = opts.service;
   switch (service) {
      case 'c':
      case 'create':
         createService(name);
         break;
      case 'r':
      case 'read':
         getService(name);
         break;
      case 'u':
      case 'update':
         updateService(name);
         break;
      case 'd':
      case 'delete':
         deleteService(name);
         break;
      case 'a':
      case 'all':
         createCRUD(name);
         break;
      default:
         console.error('Invalid service option:', service);
         console.warn('Use c, r, u, d, or a instead');
   }
} else {
   const name = convertCase(tmp, 'pascal');
   generateComponent(name);
}
