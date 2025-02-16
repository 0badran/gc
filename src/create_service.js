import fs from 'fs';
import { fileType, targetPath } from '../main.js';
import { convertCase } from '../utils/utils.js';


export function createService(name) {
   fs.writeFileSync(`${targetPath}/services/${name}.${fileType}`, `export async function ${name}(data) {
   try {
      const response = await fetch('<API_URL>', {
         method: 'POST',
         headers: {
         'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
      });
   
      if (!response.ok) throw new Error('Failed to create item');
      return await response.json();
   } catch (error) {
      console.error('Error creating item:', error);
      throw error;
   }
}`);
};

export function getService(name) {
   fs.writeFileSync(`${targetPath}/services/${name}.${fileType}`, `export async function ${name}(id) {
   try {
      const response = await fetch('<API_URL>/'+id);
      if (!response.ok) throw new Error('Item not found');
      return await response.json();
   } catch (error) {
      console.error('Error fetching item: '+id, error);
      throw error;
   }
}`);
};

export function updateService(name) {
   fs.writeFileSync(`${targetPath}/services/${name}.${fileType}`, `export async function ${name}(id, data) {
   try {
      const response = await fetch('<API_URL>/'+id, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update item');
      return await response.json();
   } catch (error) {
      console.error('Error updating item: '+id, error);
      throw error;
   }
}`);
};

export function deleteService(name) {
   fs.writeFileSync(`${targetPath}/services/${name}.${fileType}`, `export async function ${name}(id) {
   try {
      const response = await fetch('<API_URL>/'+id, {
         method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete item');
      return await response.json();
   } catch (error) {
      console.error('Error deleting item: '+id, error);
      throw error;
   }
}`);
};

export function createCRUD(name) {
   name = convertCase(name, 'pascal');
   fs.writeFileSync(`${targetPath}/services/crud${name}.${fileType}`, `export async function create${name}(data) {
      try {
         const response = await fetch('<API_URL>', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
         });
      
         if (!response.ok) throw new Error('Failed to create item');
         return await response.json();
      } catch (error) {
         console.error('Error creating item:', error);
         throw error;
      }
   }

   export async function getAll${name}() {
      try {
         const response = await fetch('<API_URL>');
         if (!response.ok) throw new Error('Failed to fetch items');
         return await response.json();
      } catch (error) {
         console.error('Error fetching items:', error);
         throw error;
      }
   }

   export async function get${name}(id) {
      try {
         const response = await fetch('<API_URL>/'+id);
         if (!response.ok) throw new Error('Item not found');
         return await response.json();
      } catch (error) {
         console.error('Error fetching item: '+id, error);
         throw error;
      }
   }
   
   export async function update${name}(id, data) {
      try {
         const response = await fetch('<API_URL>/'+id, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
         });
         if (!response.ok) throw new Error('Failed to update item');
         return await response.json();
      } catch (error) {
         console.error('Error updating item: '+id, error);
         throw error;
      }
   }
   
   export async function delete${name}(id) {
      try {
         const response = await fetch('<API_URL>/'+id, {
            method: 'DELETE',
         });
         if (!response.ok) throw new Error('Failed to delete item');
         return await response.json();
      } catch (error) {
         console.error('Error deleting item: '+id, error);
         throw error;
      }
   }`);
};