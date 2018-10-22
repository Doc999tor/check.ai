const path = require('path');

const db_env = require('dotenv').config({path: path.join(__dirname, '../db.env')});
if (db_env.error) { throw new Error (db_env.error); }

const mysql = require('mysql2/promise');

let instance = null;

class DB {
	/**
	 * Simple singleton, retuns the same db connection/pool
	 * @return {DB connection}
	 */
	constructor () {
		if (!instance) { instance = this.getConnection(); }
		return instance;
	}
	/**
	 * returns MySQL connection (in this case)
	 * Gets connection credentials from db.env file (the twelve-factor app methodology)
	 * @return {connection promise}
	 */
	getConnection () {
		return mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			database: process.env.DB_NAME,
			namedPlaceholders: true,
		});
	}
}

module.exports = DB;