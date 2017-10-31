const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb');

const path = require('path');

const port = process.env.PORT || 3000;

const app = express();

let db;
let uri = "mongodb://root:password@ds229435.mlab.com:29435/mlabs-test";

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


MongoClient.MongoClient.connect(uri, (err, database) => {
	if (err) return console.log(err);
	db = database;
	app.listen(port, () => {
		console.log('database connected')
	})
});

app.get('/', (req, res) => {
	db.collection('quotes').find().toArray((err, result) => {
		if (err) return console.log(err);
		res.render('index.ejs', {quotes: result})
	})
});

app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) return console.log(err);
		console.log('saved to database');
		res.redirect('/')
	})
});

app.put('/quotes', (req, res) => {
	db.collection('quotes').findOneAndUpdate({"key": req.body.key}, {
			$set: {
				name: req.body.name,
				quote: req.body.quote
			}
		}, {
			// sort: {_id: -1},
			upsert: false
		},
		(err, result) => {
			if (err) return res.send(err);
			res.send(result)
		}
	)
});