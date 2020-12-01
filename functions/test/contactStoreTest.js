const assert = require('assert');
const firebase = require('@firebase/testing');
const PROYECT_ID = require('../utils/env.js').PROYECT_ID;

const successID = '123';
const failedID = 'xyz';
const myAuth = {
	uid: successID,
	email: 'abc@gmail.com',
};

function getFirestore(auth) {
	return firebase
		.initializeTestApp({ projectId: PROYECT_ID, auth })
		.firestore();
}

beforeEach(async () => {
	await firebase.clearFirestoreData({ projectId: PROYECT_ID });
});

describe('CvCodePro Contact Collection', () => {
	it('Only Admin user can Read from contact collection', async () => {
		const db = getFirestore(myAuth);
		const testDoc = db.collection('contact').doc('contactList');
		await firebase.assertFails(testDoc.get());
	});

	it('Any one can write on contact collection', async () => {
		const db = getFirestore(null);
		const testDoc = db.collection('contact').doc('contactList');
		await firebase.assertSucceeds(
			testDoc.set({ name: 'Jonh Doe', email: 'jonh@gmail.com' })
		);
	});
});
