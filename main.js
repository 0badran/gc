#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs';
import { convertCase, getProjectRoot } from './utils/utils.js';
import { createCRUD, createService, deleteService, getService, updateService } from './src/create_service.js';
import generateComponent from './src/create_component.js';

if (!fs.existsSync('gc.config.json')) {
   console.error('Config file not found:');
   console.warn('Run `gc --init` to get started');
   process.exit(1);
}

export const rootPath = getProjectRoot();
export const rootFiles = fs.readdirSync(rootPath);
export const hasAppFolder = rootFiles.includes('app');
export const targetPath = `${rootPath}/${hasAppFolder ? 'app' : 'src'}`;
export const config = JSON.parse(fs.readFileSync('gc.config.json', 'utf-8'));
export const fileType = config.typescript ? 'ts' : 'js';

program
   .name('gc, generate-react-component')
   .description('Create a new component')
   .argument('<name>', 'The name for tools to generate')
   .option('-s, --service <char>', 'Create a service like(delete, update, create, read, all) services')
   .description('-s <service> [c|r|u|d|a]')
   .parse();

const args = program.args;
const opts = program.opts();
const tmp = args[0];
let name;

fs.mkdirSync(`${targetPath}/${opts.service ? 'services' : 'components'}`, { recursive: true });
if (opts.service) {
   name = convertCase(tmp);
   const service = opts.service;
   switch (service) {
      case 'c' || 'create':
         createService(name);
         break;
      case 'r' || 'read':
         getService(name);
         break;
      case 'u' || 'update':
         updateService(name);
         break;
      case 'd' || 'delete':
         deleteService(name);
         break;
      case 'a' || 'all':
         createCRUD(name);
         break;
      default:
         console.error('Invalid service option:', service);
         console.warn('Use c, r, u, d, or a instead');
   }
} else {
   name = convertCase(tmp, 'pascal');
   generateComponent(name);
}

