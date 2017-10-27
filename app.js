var
expressInsatance = require('./express'),
express = expressInsatance.express,
app = expressInsatance.app;

require('./controller/chat');

app

// 资源路径
.use('/resources', express.static('public'))

// jade模板引擎
.set('view engine', 'pug')

// 设置模板路径
.set('views', './views')

// 根路径
.get('/', function(req, res) {

	res.send('hello world');
})

// 404
.use(function(req, res) {

	res.status(404).send();
})

// 服务
.listen(6932, function (req, res) {

	console.log('app is running at port 6932');
});