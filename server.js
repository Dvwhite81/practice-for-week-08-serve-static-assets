const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Your code here
  const indexContents = fs.readFileSync('./index.html', 'utf-8');

  let urlSubs = req.url.split('/');

  if (req.method === 'GET' && req.url.startsWith('/static')) {

    let folder = urlSubs[2];
    let file = urlSubs[3];

    const reqFile = fs.readFileSync(`./assets/${folder}/${file}`);

    if (folder === 'images') {
      res.setHeader('Content-Type', 'image/jpeg');
    }

    if (folder = 'css') {
      res.setHeader('Content-Type', 'text/css');
    }

    return res.end(reqFile);
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  return res.end(indexContents);
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
