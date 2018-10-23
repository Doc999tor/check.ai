const diff = require('lodash/difference')

/**
 * abstract base class holds generic methods
 */
class AbstractValidator {
	constructor (body) {
		this.body = body;

		this.validationResponse = {
			isCorrect: true,
			errorMsg: ''
		};
	}

	isBodyEmptyAction () {
		if (!Array.isArray(Object.keys(this.body))) { this.invalidateErrorMsg('body supposed to be an array'); }

		if (!Object.keys(this.body).length) { this.invalidateErrorMsg('body supposed to be a non-empty array'); }
	}

	checkUnexpectedFields (possibleFields) {
		const diffFields = diff(Object.keys(possibleFields), Object.keys(this.body));
		if (diff.length) { this.invalidateErrorMsg(diff.join(', ') + ' should not exist'); }
	}

	invalidateErrorMsg (msg) {
		this.validationResponse.isCorrect = false;
		this.validationResponse.errorMsg += ` ${msg} <br/>`;
	}

	getValidationResponse () { return this.validationResponse; }
}

module.exports = AbstractValidator;