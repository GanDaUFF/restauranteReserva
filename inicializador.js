const { exec } = require('child_process');
const path = require('path');

const raiz = process.cwd(); // pega a pasta onde o .exe está
const frontendPath = path.join(raiz, 'frontend');
const backendPath = path.join(raiz, 'backend');

console.log('Iniciando o frontend...');
exec(`start cmd /k "cd /d ${frontendPath} && npm run build && npm start"`);

console.log('Iniciando o backend...');
exec(`start cmd /k "cd /d ${backendPath} && npm run dev"`);
