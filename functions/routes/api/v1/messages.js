const express = require('express');
const messagesRoute = express.Router();
const init = require('../../../admin/init.js');

//POST - /new-messages
//Access - Private
messagesRoute.post('/', async (req, res) => {
	const { db } = init();
	const { cvid } = req.query;
	const data = req.body;
	try {
		const messagesRef = await db.collection('messages');
		// const docRef = await messagesRef.doc('7my5lav6xcfjuy0jsm2ih');
		const docRef = await messagesRef.doc(cvid);

		const timestamp = Date.now();
		const message = {
			date: timestamp,
			name: data.name,
			company: data.company,
			email: data.from,
			subject: data.subject,
			content: data.content,
		};
		const msgCollection = await docRef.get();

		if (!msgCollection.exists) {
			const response = await docRef.set({ collect: [message] });
			res.send({ status: 200, messages: 'Success' });
		} else {
			let userMsg = await msgCollection.data();
			let tmp = [...userMsg.collect];

			let len = tmp.unshift({
				date: timestamp,
				name: data.name,
				company: data.company,
				email: data.from,
				subject: data.subject,
				content: data.content,
			});
			if (len > 10) {
				tmp.pop();
			}

			const response = await docRef.set({ collect: tmp });
			res.send({ status: 200, messages: 'Success' });
		}
	} catch (error) {
		res.send({ status: 500, payload: error });
	}
});

module.exports = messagesRoute;

//This method it's block by Gmail
// messagesRoute.post('/', (req, res) => {
// 	//TODO: This a LESS Secure Config. DO NOT USED for Production
// 	console.log(req.body);
// 	const data = req.body;
// 	const transporter = nodemailer.createTransport({
// 		service: 'gmail',
// 		auth: {
// 			user: config.gmail.user,
// 			pass: config.gmail.pass,
// 		},
// 	});

// 	const mailOptions = {
// 		from: `CvCodePro <${config.gmail.user}>`,
// 		to: data.to,
// 		subject: data.subject,
// 		text: `Sender Information:
//             Name: ${data.name}
//             Company: ${data.company}
//             Email: ${data.from}
//             Messages:
//             ${data.content}`,
// 	};
// 	transporter.sendMail(mailOptions, (error, info) => {
// 		if (error) {
// 			res.send({ messages: 'Failed', error });
// 		} else {
// 			res.send({ messages: 'Success', info: info.response });
// 		}
// 	});
// });

//SENDGRID
// messagesRoute.post('/', (req, res) => {
// 	console.log(req.body);
// 	const data = req.body;
// 	sgMail.setApiKey(config.sendgrid.key);
// 	const msg = {
// 		to: 'test@example.com',
// 		from: 'test@example.com',
// 		subject: 'Sending with Twilio SendGrid is Fun',
// 		text: 'and easy to do anywhere, even with Node.js',
// 		html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// 	};
// 	try {
// 		sgMail.send(msg);
// 	} catch (error) {
// 		console.log(error);
// 	}

// 	res.send({ messages: 'Success' });
// });

//GMAIL API
// messagesRoute.post('/', (req, res) => {
// const transporter = nodemailer.createTransport({
//	// service: 'gmail',
// 	host: 'smtp.gmail.com',
// 	port: 465,
// 	secure: true,
// 	auth: {
// 		type: 'OAuth2',
// 		user: SENDER,
// 		accessToken: getGmailAccessToken(SENDER),
// 	},
// });

// 	const mailOptions = {
// 		from: `CvCodePro <${SENDER}>`,
// 		to: data.to,
// 		subject: data.subject,
// 		text: `Sender Information:
//             Name: ${data.name}
//             Company: ${data.company}
//             Email: ${data.from}
//             Messages:
//             ${data.content}`,
// 	};
// 	transporter.sendMail(mailOptions, (error, info) => {
// 		if (error) {
// 			res.send({ messages: 'Failed', error });
// 		} else {
// 			res.send({ messages: 'Success', info: info.response });
// 		}
// 	});
// });
