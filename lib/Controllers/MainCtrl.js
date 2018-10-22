const BasicModel = require('../Models/BasicModel');

class MainCtrl {
	static getBasic (req, res, next) {
		var time = new BasicModel();
		time.getTime()
		.then(rows => {
			res.send(rows[0][0].time);
		})
		.catch(error => {
			next(error);
		})
	}
	static postBasic (req, res, next) {
		var time = new BasicModel();
		time.setTime(req.body.a)
		.then(result => {
			res.status(201);
			res.json(result[0].affectedRows);
		})
		.catch(error => {
			next(error);
		})
	}
}

module.exports = MainCtrl