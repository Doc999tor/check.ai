# Node-starter

Simple but functional skeleton of Node-Express project

What included?
* Database (MySQL) connection. You can easily switch it to another database by changing the required db package in [db.js line 6](https://github.com/Doc999tor/Node-Starter/blob/e17cef9dacc3f864af20c70d1d59eb784b2e5788/db.js#6) and DB.getConnection method implementation in [db.js line 24](https://github.com/Doc999tor/Node-Starter/blob/e17cef9dacc3f864af20c70d1d59eb784b2e5788/db.js#24)

---
How to start:
1. Open Git terminal and run
2. `git clone https://github.com/Doc999tor/Node-Starter.git node-starter`
3. `cd node-starter`
4. `npm install -g nodemon && npm install`
5. Create `run.env` with `PORT=3000` or whatever proxied port from nginx and `db.env` with `DB_HOST=localhost \ DB_USER=root \ DB_NAME=db_test` with your db credentials
6. `npm start`
7. Open your browser and type `localhost:3000`
