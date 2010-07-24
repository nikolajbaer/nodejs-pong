var sys = require("sys"),
    ws = require("ws"),
    path = require("path"),
    paperboy = require("paperboy"),
    http = require('http'),
    HTTP_PORT = 8001,
    WS_PORT = 8002,
    WEBROOT = path.join(path.dirname(__filename), 'webroot');

ws.createServer(function (websocket) {
  websocket.addListener("connect", function (resource) { 
    // emitted after handshake
    sys.debug("connect: " + resource);

    // server closes connection after 10s, will also get "close" event
    setTimeout(websocket.end, 10 * 1000); 
  }).addListener("data", function (data) { 
    // handle incoming data
    var incoming = JSON.parse(data);

    // TODO do something with this 
    var outgoing = {msg:"Thanks!"};
     
    sys.debug(data);

    // send data to client
    websocket.write(JSON.stringify(outgoing));

  }).addListener("close", function () { 
    // emitted when server or client closes connection
    sys.debug("close");
  });
}).listen(WS_PORT);

http.createServer(function (req, res) {
  paperboy
    .deliver(WEBROOT, req, res)
    .before(function() {
      sys.puts('About to deliver: '+req.url);
    })
    .after(function() {
      sys.puts('Delivered: '+req.url);
    })
    .error(function() {
      sys.puts('Error delivering: '+req.url);
    })
    .otherwise(function() {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('Sorry, no paper this morning!');
      res.end();
    });
}).listen(HTTP_PORT);

console.log('Server running at on http://localhost:'+HTTP_PORT+" with web sockets on "+WS_PORT );


