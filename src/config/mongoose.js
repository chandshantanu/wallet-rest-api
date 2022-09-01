const mongoose = require('mongoose');
const { mongo, env } = require('./vars');

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;
var dbURI = `${process.env.APP_DB_PROTOCOL}://${process.env.APP_DB_USER?process.env.APP_DB_USER+":"+process.env.APP_DB_PASS+"@":""}${process.env.APP_DB_URL}${process.env.APP_DB_PORT?':'+process.env.APP_DB_PORT:''}/${process.env.APP_DB_NAME}`

// print mongoose logs in dev env
if (env === 'development') {
  mongoose.set('debug', true);
}

/**
* Connect to mongo db
*
* @returns {object} Mongoose connection
* @public
*/
exports.connect = () => {
 
console.log(dbURI)
  mongoose.connect(dbURI, { auto_reconnect: true, useNewUrlParser: true });
  mongoose.connection.setMaxListeners(0);
  mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
  });
  
  mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
  });
  
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
    // mongoose.connect(dbURI, {auto_reconnect:true, useNewUrlParser: true });
  });
 return mongoose.connection;
};
