var
webSocket = require('ws'),
wsServer = webSocket.Server,
wss = new wsServer({port: 3031});

// 所有连接的client
var clients = [];

// 移除ws实例
var removeClient = function(ws) {

	var index = clients.indexOf(ws);
	if (index >= 0) {
		clients.splice(index, 1);
	}
};

wss.on('connection', function(ws) {

	clients.push(ws);

	ws.on('message', function(message) {

		for (var i = 0; i < clients.length; i ++) {
			var client = clients[i];
			if (client !== ws) {
				client.send(message);
			}
		}
	});

	ws.on('close', function() {

		removeClient(ws);
	});

	ws.on('error', function() {

		removeClient(ws);
	});
});