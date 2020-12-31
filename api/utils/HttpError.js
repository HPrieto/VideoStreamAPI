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
	
	static databaseErrorCodes = {
		"1062": "ER_DUP_ENTRY"
	}
	
	static send(statusCode, message, res) {
		res.status(statusCode).send({
			"error": {
				"statusCode": statusCode,
				"message": message,
				"status": HttpError.getStatus(statusCode)
			}
		});
	}
	
	static sendError(error, res) {
		console.log(error);
		HttpError.send(500, HttpError.getDatabaseErrorStatus(error.errno), res);
	}
	
	static getStatus(statusCode) {
		if (isNaN(statusCode)) {
			return "INTERNAL";
		}
		
		if (!HttpError.errorCodes[statusCode]) {
			return "Unknown status code."
		}
		
		return HttpError.errorCodes[statusCode];
	}
	
	static getDatabaseErrorStatus(databaseErrorCode) {
		if (isNaN(databaseErrorCode)) {
			return "INTERNAL";
		}
		
		if (!HttpError.databaseErrorCodes[databaseErrorCode]) {
			return HttpError.getStatus(500);
		}
		
		return HttpError.databaseErrorCodes[databaseErrorCode];
	}
}

module.exports = HttpError;