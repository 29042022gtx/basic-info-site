// import fs from 'fs/promises';
// import http from 'http';
// import url from 'url';

// http
//   .createServer(async (req, res) => {
//     let reqURL = url.parse(req.url, true);
//     let filePath = `./pages${reqURL.pathname}.html`;
//     if (reqURL.pathname == '/') {
//       filePath = './pages/index.html';
//     }
//     const fileOk = await fileAccessible(filePath);
//     if (!fileOk) {
//       filePath = './pages/404.html';
//     }
//     try {
//       const fileContent = await fs.readFile(filePath);
//       res.writeHead(200, { 'content-type': 'text/html' });
//       res.write(fileContent);
//       res.end();
//     } catch (e) {
//       res.end();
//     }
//   })
//   .listen(8080);
const fs = require('node:fs/promises');
const express = require('express');
const app = express();

app.get('/', async (req, res) => {
  try {
    const fileContent = await fs.readFile('./pages/index.html');
    res.end(fileContent)
  } catch (e) {
    console.log(e);
    res.send();
  }
});

app.get('/about', async (req, res) => {
  try {
    const fileContent = await fs.readFile('./pages/about.html');
    res.end(fileContent)
  } catch (e) {
    res.end();
  }
});

app.get('/contact-me', async (req, res) => {
  try {
    const fileContent = await fs.readFile('./pages/contact-me.html');
    res.end(fileContent)
  } catch (e) {
    res.end();
  }
});

app.get('/*', async (req, res) => {
  try {
    const fileContent = await fs.readFile('./pages/404.html');
    res.end(fileContent)
  } catch (e) {
    res.end();
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

async function fileAccessible(pathname) {
  try {
    await fs.access(pathname);
    return true;
  } catch (e) {}
  return false;
}
