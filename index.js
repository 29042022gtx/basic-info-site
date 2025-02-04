import fs from 'fs/promises';
import http from 'http';
import url from 'url';

http
  .createServer(async (req, res) => {
    let reqURL = url.parse(req.url, true);
    let filePath = `./pages${reqURL.pathname}.html`;
    if (reqURL.pathname == '/') {
      filePath = './pages/index.html';
    }
    const fileOk = await fileAccessible(filePath);
    if (!fileOk) {
      filePath = './pages/404.html';
    }
    try {
      const fileContent = await fs.readFile(filePath);
      res.writeHead(200, { 'content-type': 'text/html' });
      res.write(fileContent);
      res.end();
    } catch (e) {
      res.end();
    }
  })
  .listen(8080);

async function fileAccessible(pathname) {
  try {
    await fs.access(pathname);
    return true;
  } catch (e) {}
  return false;
}
