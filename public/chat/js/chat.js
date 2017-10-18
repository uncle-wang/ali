var ws = new WebSocket('ws://' + window.location.hostname + ':3031');

ws.onerror = function() {

	alert('sorry, something is wrong');
};

ws.onopen = function (e) {

	console.log(e);
	console.log('Connection to server opened');
};

ws.onmessage = function(message) {

	notification(message.data);
	appendMessage(message.data);
};

window.onbeforeunload = function () {
	ws.close();
};

var initNotification = function() {

	if(window.Notification && Notification.permission !== 'denied') {
		Notification.requestPermission();
	}
};

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

var scrollToBottom = function() {

	setTimeout(function() {

		document.body.scrollTop = 9999999999;
	});
};

var appendMessage = function(message) {

	var list = document.getElementById('list');
	var item = document.createElement('li');
	item.setAttribute('class', 'item');
	item.innerText = message;
	list.append(item);
	scrollToBottom();
};

var sendMessage = function() {

	var inputBox = document.getElementById('send-text');
	var text = inputBox.value;
	if (ws.readyState === 1) {
		if (text !== '') {
			ws.send(text);
			inputBox.value = '';
		}
	}
	else {
		alert('与服务器的连接发生错误，请刷新页面后重试')
	}
	inputBox.blur();
	scrollToBottom();
};

document.getElementById('send-btn').onclick = function() {

	sendMessage();
};

document.getElementById('send-form').onsubmit = function() {

	sendMessage();
	return false;
};