'use strict';

module.exports = class HttpResponse {
	
	static send(data, res) {
		res.status(200).send({
			"data": data
		});
	}
}