const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const jobs = require('../routes/jobs.router');


module.exports = function (app) {
	app.use(helmet());
	app.use(cors());
	app.use(express.json({ limit: '2mb'} ));
	app.use(express.urlencoded({ limit: '2mb', extended: true }));
	app.enable('trust proxy');
	app.use(express.static(__dirname + '/public'));
	app.use('/uploads', express.static('uploads'));
	app.use('/jobs', jobs);
};