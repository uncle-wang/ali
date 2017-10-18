// 建立websocket连接
var ws = new WebSocket('ws://' + window.location.hostname + ':3031');

// 错误处理
ws.onerror = function() {

	alert('sorry, something is wrong');
};

ws.onopen = function (e) {

	console.log('Connection to server opened');
};

// 收到消息处理
ws.onmessage = function(message) {

	notification(message.data);
	appendMessage(message.data, false);
	saveMessage(message.data, false);
};

// 页面卸载前关闭websocket连接
window.onbeforeunload = function () {
	ws.close();
};

// 初始化请求通知权限
var initNotification = function() {

	if(window.Notification && Notification.permission !== 'denied') {
		Notification.requestPermission();
	}
};

// 消息通知
var notification = function(message) {

	if (window.Notification && Notification.permission === 'granted') {
		var n = new Notification(new Date().toDateString(), {
			body: message
		});
		setTimeout(function() {
			n.close();
		}, 4000);
	}
};

// 滚动至页面底部
var scrollToBottom = function() {

	setTimeout(function() {

		document.body.scrollTop = 9999999999;
	});
};

// 保存消息记录到localStorage
var saveMessage = function(message, self) {

	var ls = window.localStorage;
	if (ls) {
		var recordList = [];
		var recordListString = ls.getItem('WCHATRECORD');
		if (recordListString) {
			recordList = JSON.parse(recordListString);
		}
		recordList.push({message: message, self: self});
		ls.setItem('WCHATRECORD', JSON.stringify(recordList));
	}
};

// 从localStorage读取记录
var restoreMessage = function() {

	var ls = window.localStorage;
	if (ls) {
		var recordList = [];
		var recordListString = ls.getItem('WCHATRECORD');
		if (recordListString) {
			recordList = JSON.parse(recordListString);
		}
		for (var i = 0; i < recordList.length; i ++) {
			var record = recordList[i];
			appendMessage(record.message, record.self, true);
		}
		scrollToBottom();
	}
};

// 向列表append消息
var appendMessage = function(message, self, multi) {

	var list = document.getElementById('list');
	var item = document.createElement('li');
	if (self) {
		item.setAttribute('class', 'item self');
	}
	else {
		item.setAttribute('class', 'item');
	}
	item.innerText = message;
	list.append(item);
	if (!multi) {
		scrollToBottom();
	}
};

// 发送消息
var sendMessage = function() {

	var inputBox = document.getElementById('send-text');
	var text = inputBox.value;
	if (ws.readyState === 1) {
		if (text !== '') {
			ws.send(text);
			inputBox.value = '';
			appendMessage(text, true);
			saveMessage(text, true);
		}
	}
	else {
		alert('与服务器的连接发生错误，请刷新页面后重试')
	}
	inputBox.blur();
	scrollToBottom();
};

initNotification();
restoreMessage();

document.getElementById('send-btn').onclick = function() {

	sendMessage();
};

document.getElementById('send-form').onsubmit = function() {

	sendMessage();
	return false;
};