const asyncMiddleware = require('../middlewares/asyncMiddleware');
const Response = require('../middlewares/response');
const { Job, validateCreateJobs, validateFilterGetJobs } = require('../models/jobs');
const pagination = require('../utilities/pagination');


/**
 * Create Jobs
 * @param {String} post
 * @param {String} nameOfCompany
 * @param {String} location
 * @param {Number} salary
 * @param {String} type
 * @param {String} qualification
 * @param {String} jobDescription
 * @param {String} schedule
 * @param {String} education
 * @param {String} experience
 */
exports.createJobs = asyncMiddleware(async (req, res, next) => {
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
		let response = Response('error', 'Error in creating jobs');
		return res.status(response.statusCode).send(response);
	}

	let response = Response('success');
	return res.status(response.statusCode).send(response);
});


/**
 * Get Jobs
 * @param {String} post
 * @param {String} location
 * @returns
  */
exports.getJobs = asyncMiddleware(async (req, res, next) => {

	const {error} = validateFilterGetJobs(req.query);
	if (error) {
		let response = Response('error', error.details[0].message);
		return res.status(response.statusCode).send(response);
	}

	const page_limit = 2;
	const page_number = Number(req.query.page) > 0 ? Number(req.query.page) : 1;

	let query = {};
	if (req.query.post) query.post = new RegExp(req.query.post, 'i');
	if (req.query.location) query.location = new RegExp(req.query.location, 'i');

	const count = await Job.count();

	const jobs = await Job.find(query)
		.sort({_id: -1})
		.skip(page_limit * (page_number - 1))
		.limit(page_limit)
		.lean();

	let response = Response('success', '', jobs);
	response = pagination(response, count, page_limit, page_number);
	return res.status(response.statusCode).send(response);
});
