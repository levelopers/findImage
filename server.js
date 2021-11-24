// server
const http = require('http');
const getImages = require('./findImage')
const requestListener = async function (req, res) {
  if (req.method == 'GET' && /get-images/g.test(req.url)) {
    const params = req.url.split('?')[1].split('=')[1]
    let result
    try {
      result = await getImages(params)
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
      res.end(JSON.stringify(err))
      return
    }
    if (result) {
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
      res.end(JSON.stringify(result));
      return
    }
  }
}


const server = http.createServer(requestListener);
server.listen(8080);
console.log('server is listening on http://localhost:8080');