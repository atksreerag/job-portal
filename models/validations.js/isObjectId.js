const ObjectId = require('mongoose').Types.ObjectId


module.exports = (value, helpers) => {
	if (!ObjectId.isValid(value)) {
		return helpers.message('Invalide' +helpers.state.path);
	}
	return value;
};