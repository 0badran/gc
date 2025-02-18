#!/usr/bin/env node
import inquirer from 'inquirer';
import fs from 'fs';
import { exec } from 'child_process';
import ora from 'ora';
import { getProjectRoot } from '../utils/utils.js';

inquirer
   .prompt([
      {
         type: 'confirm',
         name: 'nextjs',
         message: 'Are you using Next.js?',
      },
      {
         type: 'confirm',
         name: 'typescript',
         message: 'Are you using TypeScript?',
      }
   ])
   .then((answers) => {
      let command = 'npm i -D jest @testing-library/react @testing-library/dom';
      if (answers.nextjs) {
         command = 'npm i -D jest @testing-library/react @testing-library/dom @types/react @types/react-dom';
      } else if (answers.typescript) {
         command = 'npm i -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node';
      }

      // Create a spinner
      const spinner = ora('Installing dependencies...').start();

      exec(command, (error) => {
         if (error) {
            spinner.fail(`Installation failed: ${error.message}`);
            process.exit(1);
         } else {
            fs.writeFileSync(`${getProjectRoot()}/toolg.config.json`, JSON.stringify(answers, null, 2));
            spinner.succeed('Dependencies installed successfully.');
         }
      });
   });
