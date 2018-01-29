var fs = require('fs');
var request = require('request');
var http = require('http');
var helpers = require('./helpers');

QUnit.test('/filters: cached returns 200 and the right structure', function(assert) {
  assert.expect(9);
  var done = assert.async();

  http.get('http://localhost:5000/filters', function(res) {
    let chunks = [];
    res.on('data', function(data) {
      chunks.push(data);
    }).on('end', function() {
      testFiltersPayload(assert, chunks, res);
      done();
    });
  });
});

// TODO: Fix this test that breaks the test suite, by changing caching to structure of:
// Always return cache, but reloadFromDb in background if sufficient time has passed.
// QUnit.test('/filters?reloadFromDatabase=true: non-cached returns 200 and the right structure', function(assert) {
//   assert.expect(5);
//   var done = assert.async();

//   http.get('http://localhost:5000/filters?reloadFromDatabase=true', function(res) {
//     let chunks = [];
//     res.on('data', function(data) {
//       chunks.push(data);
//     }).on('end', function() {
//       testFiltersPayload(assert, chunks, res);
//       done();
//     });
//   });
// });

function testFiltersPayload(assert, chunks, res) {
  var data = Buffer.concat(chunks);
  var body = JSON.parse(data);
  assert.equal(200, res.statusCode, 'returns 200');
  assert.equal(Array.isArray(body.data), true, 'body.data is an array');
  var datum = body.data[0];
  assert.equal(datum.hasOwnProperty('id'), true, 'each datum has and id');
  assert.equal(datum.hasOwnProperty('attributes'), true, 'each datum has a attributes');
  assert.equal(datum.attributes.hasOwnProperty('name'), true, 'each datum has required attribute');
  assert.equal(datum.attributes.hasOwnProperty('lower-case-name'), true, 'each datum has required attribute');
  assert.equal(datum.attributes.hasOwnProperty('start-timestamp'), true, 'each datum has required attribute');
  assert.equal(datum.attributes.hasOwnProperty('end-timestamp'), true, 'each datum has required attribute');
  assert.equal(datum.attributes.hasOwnProperty('filter-type'), true, 'each datum has required attribute');
}
