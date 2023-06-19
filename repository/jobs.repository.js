const asyncMiddleware = require('../middlewares/asyncMiddleware');
const Response = require('../middlewares/response');
const { Job, validateCreateJobs } = require('../models/jobs');


exports.createJobs = asyncMiddleware(async(req, res, next) => {
	const { error } = validateCreateJobs(req.body);
	if (error) {
		let response = Response('error', error.details[0].message);
		return res.status(response.statusCode).send(response);
	}

	let data = req.body;

	try {
		let schema = new Job(data);
		await schema.save();
	} catch (error) {
		let response = Response('error', 'Error in creating jobs', error.message);
		return res.status(response.statusCode).send(response);
	}

	let response = Response('success');
	return res.status(response.statusCode).send(response);
});
