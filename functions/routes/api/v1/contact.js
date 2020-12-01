const express = require('express');
const contactRoute = express.Router();
const init = require('../../../admin/init.js');

//POST - /contact
//Access - Private
contactRoute.post('/', async (req, res) => {
	const { db } = init();
	const data = req.body;
	try {
		const contactRef = await db.collection('contact');
		const docRef = await contactRef.doc('contactList');

		const message = {
			name: data.name,
			email: data.email,
		};
		const listCollection = await docRef.get();
		if (!listCollection.exists) {
			const response = await docRef.set({ collect: [message] });
			res.send({ status: 200, messages: 'Success' });
		} else {
			let current = await listCollection.data();
			let tmp = [...current.collect];
			tmp = tmp.concat([message]);
			const response = await docRef.set({ collect: tmp });
			res.send({ status: 200, messages: 'Success' });
		}
	} catch (error) {
		res.send({ status: 500, payload: error });
	}
});

module.exports = contactRoute;
