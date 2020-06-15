// const admin = require('firebase-admin');
// const functions = require('firebase-functions');
// const { DB } = require('../../../admin/init.js');
const express = require('express');
const usersRoute = express.Router();
const config = require('../../../config.js');
const serviceAccount = require('../../../admin/serviceAccount.json');

//Initializing Database
// admin.initializeApp(config);
// const db = admin.firestore();

//GET - /users?cvid=usersId
//Access - Private
usersRoute.get('/', (req, res) => {
	console.log('calling /users');
	// const userRef = db.collection('users').doc('vnuDGVvKrkdMlFi5uc5C');
	// console.log('db connected');
	// const getUserDoc = userRef
	// 	.get()
	// 	.then((doc) => {
	// 		console.log('document', doc);
	// 		if (!doc.exists) {
	// 			res.send({ status: 404, payload: 'User Do Not Exist' });
	// 		} else {
	// 			res.send({ status: 200, payload: doc.data });
	// 		}
	// 	})
	// 	.catch((err) => {
	// 		res.send({ status: 500, payload: 'Error Fetching Data from Database' });
	// 	});
	res.send('From Users');
});

module.exports = usersRoute;
