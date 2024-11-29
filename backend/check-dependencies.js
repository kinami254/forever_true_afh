const { execSync } = require('child_process');

// List of dependencies based on server.js
const dependencies = [
  'express',
  'dotenv',
  'cors',
  'path',
  'helmet',
  'express-rate-limit',
  'mysql2',
  'multer',
  'nodemailer'
];

// Function to check and install missing modules
const installMissingModules = (modules) => {
  modules.forEach((module) => {
    try {
      require.resolve(module); // Check if the module is installed
      console.log(`Module "${module}" is already installed.`);
    } catch (e) {
      console.log(`Module "${module}" is missing. Installing...`);
      execSync(`npm install ${module}`, { stdio: 'inherit' });
    }
  });
};

// Install dependencies
installMissingModules(dependencies);

console.log('All dependencies are installed.');
