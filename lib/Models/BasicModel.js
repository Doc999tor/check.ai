const DB = new (require('../db'));

class BasicModel {
	getTime () {
		return DB.then(conn => {
			return conn.query('select now() as time');
		})
	}
	setTime(time) {
		return DB.then(conn => {
			return conn.execute('insert into test values (:time)', {time});
		});
	}
}

module.exports = BasicModel
