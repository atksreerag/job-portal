const multer = require('multer');


exports.storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './resumes');
	},
	fileName: function (req, file, callback) {
		callback(null, file.orginalName);
	}
}); 

exports.upload = multer({ storage: this.storage }).single('resume');