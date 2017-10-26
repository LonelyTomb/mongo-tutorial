var update = document.getElementById('update')
var record_name = document.querySelector('.record-name').innerHTML;
var record_quote = document.querySelector('.record-quote').innerHTML;

update.addEventListener('click', function() {
    fetch('quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'name': record_name,
            'quote': record_quote
        })
    }).then(res => {
        if (res.ok) return res.json()
    }).then(data => {
        console.log(data);
        window.reload(true);
    })
})