#!/usr/bin/env node
import inquirer from 'inquirer';
import fs from 'fs';
import { exec } from 'child_process';
import { getProjectRoot } from '../utils/utils.js';

inquirer
   .prompt([
      {
         type: 'confirm',
         name: 'nextjs',
         message: 'You are use Next.js?',
      },
      {
         type: 'confirm',
         name: 'typescript',
         message: 'You are use TypeScript?',
      }
   ])
   .then((answers) => {
      if (answers.nextjs) {
         exec('npm i -D jest @testing-library/react @testing-library/dom @types/react @types/react-dom', (error) => {
            if (error) {
               console.error(`exec error: ${error.message}`);
               process.exit(1);
            }
         });
      } else if (answers.typescript) {
         exec('npm i -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node', (error) => {
            if (error) {
               console.error(`exec error: ${error.message}`);
               process.exit(1);
            }
         });
      } else {
         exec('npm i -D jest @testing-library/react @testing-library/dom', (error) => {
            if (error) {
               console.error(`exec error: ${error.message}`);
               process.exit(1);
            }
         });
      };

      fs.writeFileSync(`${getProjectRoot()}/gc.config.json`, JSON.stringify(answers));
      console.warn('Config file created successfully');
   });