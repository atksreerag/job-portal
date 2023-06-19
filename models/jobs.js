const mongoose = require('mongoose');
const Joi = require('joi');

const jobSchema = new mongoose.Schema({
	post: {
		type: String,
		required: true,
		min: 4
	},
	nameOfCompany: {
		type: String,
		required: true,
		min: 3
	},
	location: {
		type: String,
		required: true,
		min: 3
	},
	salary: {
		type: Number,
	},
	type: {
		type: String,
		required: true,
		enum: ['Regular', 'Intern']
	},
	qualification: {
		type: String,
	},
	jobDescription: {
		type: String,
		required: true,
		min: 10
	},
	schedule: {
		type: String,
		required: true,
		enum: ['Fulltime', 'Partime']
	},
	education: {
		type: String,
	},
	experience: {
		type: String,
		required: true,
	},
	createdBy: {
		type: String,
		//required: true,
	},
	
},
{
	timestamps: true
}
);

exports.Job = mongoose.model('Job', jobSchema); 

exports.validateCreateJobs = (data) => {
	const schema = Joi.object({
		post: Joi.string().min(4).required(),
		nameOfCompany: Joi.string().min(4).required(),
		location: Joi.string().min(4).required(),
		salary: Joi.number().min(4).required(),
		type: Joi.string().valid('Regular', 'Intern').required(),
		qualification: Joi.string().min(4).required(),
		jobDescription: Joi.string().min(4).required(),
		schedule: Joi.string().valid('Fulltime', 'Partime').required(),
		education: Joi.string().required(),
		experience: Joi.number().required(),

	});
	return schema.validate(data);
};