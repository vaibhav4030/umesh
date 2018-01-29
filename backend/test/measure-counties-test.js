var fs = require('fs');
var request = require('request');
var http = require('http');
var helpers = require('./helpers');

helpers.getReturns200('measure-counties?ids=945');

QUnit.test('missing ids return 404, status false, and error message.', function(assert) {
  assert.expect(3);
  var done = assert.async();

  http.get(`http://localhost:5000/measure-counties`, function(res) {
    let chunks = [];
    res.on('data', function(data) {
      chunks.push(data);
    }).on('end', function() {
      var data = Buffer.concat(chunks);
      var body = JSON.parse(data);
      assert.equal(404, res.statusCode);
      assert.equal(body.status, false);
      assert.equal(typeof body.message, 'string');
      done();
    });
  });
});

QUnit.test('/measure-counties?ids=945 returns the correct structure', function(assert) {
  assert.expect(4);
  var done = assert.async();

  http.get(`http://localhost:5000/measure-counties?ids=945`, function(res) {
    let chunks = [];
    res.on('data', function(data) {
      chunks.push(data);
    }).on('end', function() {
      var data = Buffer.concat(chunks);
      var body = JSON.parse(data);
      assert.equal(body.status, true);
      assert.equal(Array.isArray(body.data), true);
      var datum = body.data[0];
      assert.equal(datum.hasOwnProperty('FIPS_ID'), true);
      assert.equal(datum.hasOwnProperty('VALUE'), true);
      done();
    });
  });
});
