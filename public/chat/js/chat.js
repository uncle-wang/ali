var ws = new WebSocket('ws://' + window.location.hostname + ':3031');

ws.onopen = function (e) {

	console.log('Connection to server opened');
};

ws.onmessage = function(message) {

	appendMessage(message.data);
};

var appendMessage = function(message) {

	var list = document.getElementById('list');
	var item = document.createElement('li');
	item.setAttribute('class', 'item');
	item.innerText = message;
	list.append(item);
};

document.getElementById('send-submit').onclick = function() {

	var inputBox = document.getElementById('send-text');
	var text = inputBox.value;
	inputBox.value = '';
	ws.send(text);
};