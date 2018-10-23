const Model = require('../Models/VastsModel')
const AbstractValidator = require('./AbstractValidator')

class VastValidator extends AbstractValidator {
	constructor (body) { super(body); }

	/**
	 * simple middleware calls internal VastValidator.validateVast method
	 * Returns 400 and error message
	 * @param {Request}   req
	 * @param {Response}   res
	 * @param {NextFunction} next middleware
	 */
	static validateVastMiddleware (req, res, next) {
		const validator = new VastValidator(req.body);
		validator.validateVast();
		const validationResponse = validator.getValidationResponse();

		if (validationResponse.isCorrect) {
			next();
		} else {
			res.status(400);
			res.send(validationResponse.errorMsg);
		}
	}

	/**
	 * custom validations
	 * getting from VastsModel possibleValues for ENUM fields
	 */
	validateVast () {
		this.isBodyEmptyAction();
		this.checkUnexpectedFields(Object.keys(Model.possibleValues));

		// TODO: replace the regex with sofisticated url validation library
		if (!/.+:\/\/.+/.test(this.body.vast_url)) { this.invalidateErrorMsg('vast_url has to be a valid url'); }

		// hash map has access O(1)
		if (this.body.position && !Model.possibleValues.position[this.body.position]) { this.invalidateErrorMsg('position has to be one of: top_left|top_middle|top_right|middle_left|middle_right|bottom_left|bottom_middle|bottom_right'); }

		// urlencoded body parsed as strings
		if (this.body.hide_ui && !Model.possibleValues.hide_ui[this.body.hide_ui]) { this.invalidateErrorMsg('hide_ui has to be boolean'); }
	}
}

module.exports = VastValidator;