const express = require('express');
const router = express.Router();
const repository = require('../repository/jobs.repository');

router.post('/', (req, res, next) => {
	repository.createJobs(req, res, next);
});

router.get('/', (req, res, next) => {
	repository.getJobs(req, res, next);
});


module.exports = router;
