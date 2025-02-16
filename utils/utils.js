import fs from 'fs';
import path from 'path';

export function getProjectRoot() {
   let currentDir = process.cwd(); // Starts at your package's directory
   while (currentDir !== path.parse(currentDir).root) {
      if (fs.existsSync(path.join(currentDir, 'package.json'))) {
         return currentDir;
      }
      currentDir = path.dirname(currentDir); // Move up
   }
   throw new Error('This is not a npm project');
};

export function convertCase(str, format = 'camel') {
   if (!str) return '';

   const words = str
      .replace(/[-_\s]+/g, ' ')
      .trim()
      .split(' ')
      .filter(word => word.length > 0);

   if (words.length === 0) return '';

   let processedWords;
   let separator = '';

   switch (format) {
      case 'camel':
         processedWords = words.map((word, index) =>
            index === 0
               ? word.toLowerCase()
               : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
         );
         separator = '';
         break;
      case 'pascal':
         processedWords = words.map(word =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
         );
         separator = '';
         break;
      case 'snake':
         processedWords = words.map(word => word.toLowerCase());
         separator = '_';
         break;
      case 'kebab':
         processedWords = words.map(word => word.toLowerCase());
         separator = '-';
         break;
   }

   return processedWords.join(separator);
}