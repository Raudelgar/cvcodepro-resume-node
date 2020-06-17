const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const cvrApp = express();
const messagesRoute = require('./routes/api/v1/messages.js');
const usersRoute = require('./routes/api/v1/users.js');
const pdfRoute = require('./routes/api/v1/generatePdf.js');

//MIddlewares
cvrApp.use(express.json({ limit: '50mb' }));
cvrApp.use(cors());

//Routes
cvrApp.use('/messages', messagesRoute);
cvrApp.use('/users', usersRoute);
cvrApp.use('/create-new-user', usersRoute);
cvrApp.use('/pdf', pdfRoute);

exports.cvrApp = functions.https.onRequest(cvrApp);
