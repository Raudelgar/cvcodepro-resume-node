const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const cvrApp = express();
const messagesRoute = require('./routes/api/v1/messages.js');

//MIddlewares
cvrApp.use(express.json({ limit: '50mb' }));
cvrApp.use(cors());

//Routes
cvrApp.use('/messages', messagesRoute);

cvrApp.get('/hello', (req, res) => {
	res.send('Hello World!');
});

exports.cvrApp = functions.https.onRequest(cvrApp);
