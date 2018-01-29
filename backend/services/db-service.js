var config = require('../config');
var mysql = require('mysql');
var connection = false;

function dbConnect(callback) {
  return new Promise(function(resolve, reject) {
    connection = mysql.createConnection({
      host: config.mysql.host,
      user: config.mysql.username,
      password: config.mysql.password,
      database: config.mysql.database,
    });
    connection.connect(function(err, conn) {
      if (err) {
        console.error('Unable to connect: ' + err.message);
        resolve(false);
      } else {
        resolve(connection);
      }
    });
  });
}

function dbExecute(query) {
  return new Promise(function(resolve, reject) {
    dbConnect().then(function(_conn) {
      if (!_conn) {
        resolve({
          "http_status": 500,
          "status": false,
          "message": "Could not connect with database. Please try again later!"
        });
      } else {
        _conn.query(query, function(err, result) {
          if (err) {
            console.error('Failed to execute statement due to the following error: ' + err.message);
            resolve({
              "http_status": 404,
              "status": false,
              "message": err.message
            });
          } else {
            resolve({
              "http_status": 200,
              "status": true,
              "data": result
            });
          }
        });
      }
    });
  });
}

module.exports = {
  _dbConnect: dbConnect,
  _dbExecute: dbExecute
};