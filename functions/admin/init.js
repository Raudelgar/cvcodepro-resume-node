const admin = require('firebase-admin');
const config = require('../config.js');

// Initializing Firebase Admin SDK
admin.initializeApp(config);

const init = () => {
	return {
		db: admin.firestore(),
	};
};

module.exports = init;
