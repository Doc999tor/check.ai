const VastsModel = require('../Models/VastsModel');
const VastViewXML = require('../Views/VastViewXML');

class VastsCtrl {
	static getAll (req, res, next) {
		console.log('getAll')
		var model = new VastsModel();
		model.getAll()
		.then(rows => {
			res.set('Content-Type', 'application/xml');
			res.send(VastViewXML.createVastXML(rows[0]));
		})
		.catch(error => {
			next(error);
		})
	}
	/**
	 * gets one vast row
	 * returns a vast xml by VastViewXML class
	 * @param {Request}   req
	 * @param {Response}   res
	 * @param {NextFunction} next middleware
	 */
	static getOne (req, res, next) {
		var model = new VastsModel();
		model.getOne(req.params.vast_id)
		.then(rows => {
			res.set('Content-Type', 'application/xml');
			res.send(VastViewXML.createVastXML(rows[0]));
		})
		.catch(error => {
			next(error);
		})
	}
	/**
	 * Gets parsed body from bodyParserUrlencoded
	 * The body is fully validated by VastValidator.validateVastMiddleware
	 * Sets default values
	 * @param {Request}   req
	 * @param {Response}   res
	 * @param {NextFunction} next middleware
	 */
	static addOne (req, res, next) {
		let {vast_url, position, hide_ui} = req.body;

		// default value for position - bottom_left
		if (!position) { position = VastsModel.defaultValues.position; }

		// default value for hide_ui - false
		if (!hide_ui) { hide_ui = VastsModel.defaultValues.hide_ui; }

		// hide_ui is boolean
		hide_ui = hide_ui === 'true';

		var model = new VastsModel();
		model.addOne(vast_url, position, hide_ui)
		.then(result => {
			res.status(201);
			res.json(result[0].insertId);
		})
		.catch(error => {
			next(error);
		})
	}
}

module.exports = VastsCtrl