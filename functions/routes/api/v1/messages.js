const express = require('express');
const messagesRoute = express.Router();
const config = require('../../../config.js');
// const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
// const { getGmailAccessToken } = require('../../../auth/gmailApi.js');

//POST - /messages
//Access - Private
messagesRoute.post('/', (req, res) => {
	//TODO: This a LESS Secure Config. DO NOT USED for Production
	console.log(req.body);
	const data = req.body;
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: config.gmail.user,
			pass: config.gmail.pass,
		},
	});

	const mailOptions = {
		from: `CvCodePro <${config.gmail.user}>`,
		to: data.to,
		subject: data.subject,
		text: `Sender Information:
            Name: ${data.name}
            Company: ${data.company}
            Email: ${data.from}
            Messages:
            ${data.content}`,
	};
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			res.send({ messages: 'Failed', error });
		} else {
			res.send({ messages: 'Success', info: info.response });
		}
	});
});

module.exports = messagesRoute;

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
