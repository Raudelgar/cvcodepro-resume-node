const express = require('express');
const usersRoute = express.Router();
const init = require('../../../admin/init.js');
const mockUser = require('../../../utils/_data.js');
const { generateUID } = require('../../../utils/helper.js');

//GET - /users?cvid=usersId
//Access - Private
usersRoute.get('/', async (req, res) => {
	const { cvid } = req.query;
	const initApp = init();
	const { db } = initApp;
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

//POST - /create-new-user
//Access - Private
usersRoute.post('/', async (req, res) => {
	const initApp = init();
	const { db } = initApp;
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

module.exports = usersRoute;
