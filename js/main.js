const UIkit = require('uikit');
const Icons = require('uikit/dist/js/uikit-icons');


UIkit.use(Icons);

let update = document.getElementById('update');

update.addEventListener('click', function () {
	let key = document.getElementById('key').value;
	let record_name = document.getElementById('name').value;
	let record_quote = document.getElementById('quote').value;

	console.log(key +
		record_name +
		record_quote);
	fetch('quotes', {
		method: 'put',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			'name': record_name,
			'quote': record_quote,
			'key': key
		})
	}).then(res => {
		if (res.ok) return res.json();
	}).then(data => {
		console.log(data);
		window.location.reload(true);
	})
});