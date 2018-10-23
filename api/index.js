const path = require('path');

const run_env = require('dotenv').config({path: path.join(__dirname, './run.env')});
if (run_env.error) { throw new Error (run_env.error); }

const express = require('express');
const app = express();
app.disable('x-powered-by'); // small security improvement
app.disable('etag'); // performance improvement - desabled by default

const port = process.env.PORT || '3000';

const logger = require('morgan')('dev'); // :method :url :status :response-time ms - :res[content-length]
app.use(logger);

// db connection
const connection = require('./lib/db.js');

app.use(require('cors')());

const vastsRouter = require('./lib/routes/vastsRoutes.js');
app.get('/', (req, res) => { console.log('/'); res.redirect('/vasts'); })
app.use('/vasts', vastsRouter);

app.use((error, req, res, next) => {
	console.log(error)
  res.sendStatus(error.status || 500);
});

app .listen(port, () => console.log('listening on port ' + port))
	.on('error', errorHandler)

process.on("uncaughtException", error => {
	console.error(error)
});

function errorHandler (error) {
	if (error.syscall !== 'listen') { throw error; }

	switch (error.code) {
	  case 'EACCES':
	    console.error(port + ' requires a permission');
	    process.exit(1);
	    break;
	  case 'EADDRINUSE':
	    console.error(port + ' is already in use');
	    process.exit(1);
	    break;
	  default:
	    throw error;
	}
}