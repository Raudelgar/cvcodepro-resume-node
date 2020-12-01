const axios = require('axios');
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const { getTime } = require('../utils/helper.js');

const privateKey = config.firebase.privateKey;

const getGmailAccessToken = async (user) => {
	const { issueTime, expireTime } = getTime();
	const jwtToken = jwt.sign(
		{
			iss: 'cvcodepro-resume-node-9432d@appspot.gserviceaccount.com',
			sub: user,
			scope: 'https://www.googleapis.com/auth/gmail.send',
			aud: 'https://oauth2.googleapis.com/token',
			exp: expireTime,
			iat: issueTime,
		},
		privateKey,
		{ algorithm: 'RS256' }
	);
	console.log('TOKEN: ', jwtToken);
	try {
		const response = await axios.post('https://oauth2.googleapis.com/token', {
			grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
			assertion: jwtToken,
		});
		console.log(response.data);
		return await response.data;
	} catch (error) {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log(error.request);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error', error.message);
		}
		console.log(error.config);
	}
};

// getGmailAccessToken('messages.cvcodepro@gmail.com');
module.exports = { getGmailAccessToken };
