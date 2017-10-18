var
expressInsatance = require('./express'),
express = expressInsatance.express,
app = expressInsatance.app;

// 运行环境
var env = process.env.NODE_ENV;

// 生产环境使用80端口
var port = env === 'production' ? 80 : 3000;

app

// 资源路径
.use('/public/resources', express.static('public'))

// 根路径
.get('/', function(req, res) {

	res.send('hello world');
})

// 404
.use(function(req, res) {

	res.status(404).send();
})

// 服务
.listen(port, function (req, res) {

	console.log('app is running at port ' + port);
});