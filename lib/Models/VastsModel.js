const DB = new (require('../db'));

class VastsModel {
	getAll () {
		return DB.then(conn => {
			return conn.query('SELECT * FROM vasts');
		})
	}
	getOne(vast_id) {
		return DB.then(conn => {
			return conn.execute('SELECT * FROM vasts WHERE id = :vast_id', {vast_id});
		});
	}
	addOne(vast_url, position, hide_ui) {
		return DB.then(conn => {
			return conn.execute(
				`
					INSERT INTO vasts (vast_url, position, hide_ui)
					VALUES (:vast_url, :position, :hide_ui)
				`,
				{vast_url, position, hide_ui}
			);
		});
	}
}

/**
 * Object with fields and possible values as a hash map. Access O(1)
 * @type {Object}
 */
VastsModel.possibleValues = {
	position: { top_left: true, top_middle: true, top_right: true, middle_left: true, middle_right: true, bottom_left: true, bottom_middle: true, bottom_right: true },
	hide_ui: {true: true, false: true },
}
/**
 * default values map
 * @type {Object}
 */
VastsModel.defaultValues = {
	position: 'bottom_right',
	hide_ui: false
}

module.exports = VastsModel
