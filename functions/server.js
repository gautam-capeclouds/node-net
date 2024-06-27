const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.get('/hello', (req, res) => {
  res.send('Hello Gautam');
});

module.exports.handler = serverless(app);
