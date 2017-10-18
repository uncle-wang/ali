var
webSocket = require('ws'),
wsServer = webSocket.Server,
wss = new wsServer({port: 3031});

// 所有连接的client
var clients = [];

wss.on('connection', function(ws) {

	clients.push(ws);

	ws.on('message', function(message) {

		for (var i = 0; i < clients.length; i ++) {
			clients[i].send(message);
		}
	});
});