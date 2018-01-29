var express = require('express');
var config = require('../config');
var dbService = require('../services/db-service');
var _ = require('lodash');
var router = express.Router();

// Add New User
router.get('/:username/:password', function(req, res, next) {
  var username = req.params.username;
  var password = req.params.password;
  var query = `SELECT * FROM ${config.tables.users} WHERE email = '${username}' and password = '${password}' and status = 1 `;
  var dbQuery = dbService._dbExecute(query);
  dbQuery.then(function(callback) {
    if (!callback.status) {
      res.status(callback.http_status);
      res.json({
        "status": false,
        "message": callback.message
      });
    } else {
      if (_.size(callback.data) == 0) {
        res.json({
          "status": false,
          "message": "Invalid Email & Address"
        });
      } else {
        res.json(callback);
      }
    }
  });
});


module.exports = router;