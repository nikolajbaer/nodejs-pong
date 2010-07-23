var sys = require("sys"),
    ws = require("ws"),
    http = require('http');

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
    websocket.write(JSON.strinigfy(outgoing));

  }).addListener("close", function () { 
    // emitted when server or client closes connection
    sys.debug("close");
  });
}).listen(8080);

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    //TODO send static files 
    res.end('Hello World\n');
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/, socket at 8080');
