'use strict';

class HttpError {
	
	static errorCodes = {
		"200": "OK",
		"400": "INVALID_ARGUMENT",
		"401": "UNAUTHENTICATED",
		"403": "PERMISSION_DENIED",
		"404": "NOT_FOUND",
		"409": "ABORTED",
		"429": "RESOURCE_EXHAUSTED",
		"499": "CANCELLED",
		"500": "INTERNAL",
		"501": "NOT_IMPLEMENTED",
		"503": "UNAVAILABLE",
		"504": "DEADLINE_EXCEEDED"
	};
	
	static send(statusCode, message, res) {
		res.status(statusCode).send({
			"error": {
				"code": statusCode,
				"message": message,
				"status": HttpError.getStatus(statusCode)
			}
		});
	}
	
	static sendError(error, res) {
		HttpError.send(500, error.sqlMessage, res);
	}
	
	static getStatus(statusCode) {
		if (isNaN(statusCode)) {
			throw new Error("`statusCode` must be a number.");
		}
		
		if (!HttpError.errorCodes[statusCode]) {
			return "Unknown status code."
		}
		
		return HttpError.errorCodes[statusCode];
	}
}

module.exports = HttpError;