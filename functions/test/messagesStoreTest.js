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

describe('CvCodePro Messages Collection', () => {
	it('Only Auth user can Read a message from messages collection', async () => {
		const db = getFirestore(myAuth);
		const testDoc = db.collection('messages').doc(successID);
		await firebase.assertSucceeds(testDoc.get());
	});

	it('Any one can write a message on messages collection', async () => {
		const db = getFirestore(null);
		const testDoc = db.collection('messages').doc(successID);
		await firebase.assertSucceeds(
			testDoc.set({ content: 'test messages', id: successID })
		);
	});
});
