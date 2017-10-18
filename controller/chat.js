var app = require('./../express').app;
var path = require('path');
var viewPath = path.join(path.resolve(__dirname, '..'), 'views/chat');

app

.use('/chat', function(req, res, next) {

	require('./../service/chat/websocket');
	next();
})

.get('/chat', function(req, res) {

	res.sendFile(path.join(viewPath, 'chat.html'));
});