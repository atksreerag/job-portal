const winston =require('winston');


/**
 * 
 * @param {String} response 
 * @param {Number} total_count 
 * @param {Number} page_limit 
 * @param {Number} current_page 
 * @returns 
 */
module.exports = (response, total_count, page_limit, current_page = 1 ) => {
	try {

		let total_pages = total_count <= page_limit ? 1 : Math.ceil(total_count/page_limit);
		response.data.pages = total_pages;
		response.data.total_count = total_count;

		//Calculating Next page Number
		if (current_page < total_pages) {
			response.data.next = current_page + 1;
		} else {
			response.data.next = null;
		}

		//Calculatiing Prevoius Page
		if (current_page > 1) {
			if (current_page <= total_pages) {
				response.data.previous = current_page - 1;
			} else {
				response.data.previous = total_pages;
			}
		} else {
			response.data.previous = null;
		}

		return response;
	} catch (error) {
		winston.error(`Pagination function error ${error}`);
		return null;
	}
};