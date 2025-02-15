import inquirer from 'inquirer';
import fs from 'fs';
import { exec } from 'child_process';

export function toPascalCase(str) {
   return str
      .replace(/[-_\s]+/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
};

export function createConfig() {
   let config = {};
   inquirer
      .prompt([
         {
            type: 'confirm',
            name: 'typescript',
            message: 'You are use TypeScript?',
         }
      ])
      .then((answers) => {
         config = answers;
         if (answers.typescript) {
            exec('npm i --save-dev @testing-library/react @testing-library/dom @types/react @types/react-dom', (error) => {
               if (error) {
                  console.error(`exec error: ${error.message}`);
                  process.exit(1);
               }
            });
         } else {
            exec('npm i --save-dev @testing-library/react @testing-library/dom', (error) => {
               if (error) {
                  console.error(`exec error: ${error.message}`);
                  process.exit(1);
               }
            });
         }
         fs.writeFileSync('config.json', JSON.stringify(answers));
         console.warn('Config file created successfully');
      })
      .catch((error) => {
         console.error('Try again, after read error:', + error?.message);
      });
   return config;
}