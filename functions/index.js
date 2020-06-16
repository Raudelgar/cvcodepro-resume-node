const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const cvrApp = express();
const config = require('./config.js');
const serviceAccount = require('./admin/serviceAccount.json');
const messagesRoute = require('./routes/api/v1/messages.js');
// const usersRoute = require('./routes/api/v1/users.js');
const mockUser = require('./utils/_data.js');
const { generateUID } = require('./utils/helper.js');

//Initializing Firebase Admin SDK
admin.initializeApp(config);
const db = admin.firestore();

//MIddlewares
cvrApp.use(express.json({ limit: '50mb' }));
cvrApp.use(cors());

//Routes
cvrApp.use('/messages', messagesRoute);
// cvrApp.use('/users', usersRoute);

//TODO: Temp solution until tsconfig error s fixed on release
//GET - /users?cvid=usersId
//Access - Private
cvrApp.get('/users', async (req, res) => {
	const { cvid } = req.query;
	try {
		const usersRef = await db.collection('users');
		const userRef = await usersRef.doc(cvid);
		const user = await userRef.get();

		if (!user.exists) {
			res.send({ status: 404, payload: 'User Do Not Exist' });
		} else {
			res.send({ status: 200, payload: { user: user.data() } });
		}
	} catch (error) {
		res.send({ status: 500, payload: error });
	}
});

//TODO: Mock New User
cvrApp.post('/create', async (req, res) => {
	const id = generateUID();
	const user = mockUser();
	user.userInfo.id = id;
	user.userSkills.id = id;
	user.userExperience.id = id;
	user.userEduction.id = id;

	try {
		const usersRef = await db.collection('users');
		const userRef = await usersRef.doc(id).set(user);

		res.send({ status: 200, payload: id });
	} catch (error) {
		res.send({ status: 500, payload: error });
	}
});

exports.cvrApp = functions.https.onRequest(cvrApp);
