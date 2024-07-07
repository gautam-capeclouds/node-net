// const serverless = require('serverless-http');
// const app = require('./app'); // Ensure the path is correct

// module.exports.handler = serverless(app); // Exporting the handler correctly



import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

router.get('/gau', (req, res) => {
  res.send('Hello Gautam check');
});

api.use("/api/", router);

export const handler = serverless(api);
