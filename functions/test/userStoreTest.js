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
		.initializeTestApp({ projectId: PROYECT_ID, auth: auth })
		.firestore();
}

beforeEach(async () => {
	await firebase.clearFirestoreData({ projectId: PROYECT_ID });
});

describe('CvCodePro Users Collection', () => {
	it('Everyone can Read users from users collection', async () => {
		const db = getFirestore(null);
		const testDoc = db.collection('users').doc('fake_id');
		await firebase.assertSucceeds(testDoc.get());
	});

	it('Only Auth can create on users collection', async () => {
		const db = getFirestore(myAuth);
		const testDoc = db.collection('users').doc(successID);
		await firebase.assertSucceeds(testDoc.set({ foo: 'bar' }));
	});

	it('Only Auth can update on users collection', async () => {
		const db = getFirestore(myAuth);
		const testDoc = db.collection('users').doc(failedID);
		await firebase.assertFails(testDoc.update({ foo: 'foo' }));
	});
});
