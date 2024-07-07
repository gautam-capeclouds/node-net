const serverless = require('serverless-http');
const app = require('./app'); // Ensure the path is correct

module.exports.handler = serverless(app); // Exporting the handler correctly
