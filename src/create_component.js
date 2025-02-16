import fs from 'fs';
import { fileType, targetPath } from '../main.js';

export default function generateComponent(name) {
   fs.writeFileSync(`${targetPath}/components/${name}.${fileType}x`, `export default function ${name}(){
      return (
         <h1>${name}</h1>
      )}`);
   fs.writeFileSync(`${targetPath}/${name}.test.${fileType}`, `import {render, screen} from '@testing-library/react'
   import '@testing-library/jest-dom'
   import ${name} from './${name}';

   test("${name} renders successfully", () => {
      render(<${name}/>);
      const element = screen.getByText(/${name}/i);
      expect(element).toBeInTheDocument();
   });`);
}