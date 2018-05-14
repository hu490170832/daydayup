### demo 

```js
require('http').createServer(function (req, res) {
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.end('hello world');
}).listen(3000);

console.log('Server listening on http://localhost:3000/');
```



