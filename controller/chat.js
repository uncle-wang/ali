var app = require('./../express').app;

app

.get('/chat', function(req, res) {

	res.render('chat/login');
});