const winston = require('winston');

module.exports = () => {
	try {
		process.on('uncaughtException', (e) => {
			winston.error(e.message, e);
		});

		process.on('unhandledRejection', (e) => {
			winston.error(e.meesage, e);
		});

		winston.add(
			new winston.transports.Console({ format: winston.format.combine(
				winston.format.prettyPrint()
			)})
		);

	} catch (error) {
		winston.error(error.message);
	}
	
};