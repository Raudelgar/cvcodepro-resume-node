const express = require('express');
const pdfRoute = express.Router();

//POST - /pdf
//Access - Private
pdfRoute.post('/', (req, res) => {
	console.log(req.body);
	const data = req.body;
	res.send(`Hello User ${data.userId}`);
});

module.exports = pdfRoute;
