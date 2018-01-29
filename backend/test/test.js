var http = require('http');

QUnit.test('/measures returns the correct structure', function(assert) {
  var requiredAttributes = ['mid', 'name', 'units', 'units_notes', 'source', 'granularity', 'nid', 'is_normalized_index', 'aggregation_eq', 'aggregation_logic_missing_value'];
  assert.expect(1 + requiredAttributes.length);
  var done = assert.async();

  http.get(`http://localhost:5000/measures`, function(res) {
    let chunks = [];
    res.on('data', function(data) {
      chunks.push(data);
    }).on('end', function() {
      var data = Buffer.concat(chunks);
      var body = JSON.parse(data);
      assert.equal(Array.isArray(body), true);
      for (var i = 0; i < requiredAttributes.length; i += 1) {
        var attributeName = requiredAttributes[i];
        assert.equal(body[0].hasOwnProperty(attributeName), true);
      }
      done();
    });
  });
});

QUnit.test('/impressions returns the correct structure', function(assert) {
  var requiredAttributes = ['g', 'g', 'a', 'FIPS'];
  assert.expect(1 + requiredAttributes.length);
  var done = assert.async();

  http.get(`http://localhost:5000/impressions`, function(res) {
    let chunks = [];
    res.on('data', function(data) {
      chunks.push(data);
    }).on('end', function() {
      var data = Buffer.concat(chunks);
      var body = JSON.parse(data);
      assert.equal(Array.isArray(body), true);
      for (var i = 0; i < requiredAttributes.length; i += 1) {
        var attributeName = requiredAttributes[i];
        assert.equal(body[0].hasOwnProperty(attributeName), true);
      }
      done();
    });
  });
});

QUnit.test('/populations returns the correct structure', function(assert) {
  var requiredAttributes = ['c', 'g', 'a', 'FIPS'];
  assert.expect(1 + requiredAttributes.length);
  var done = assert.async();

  http.get(`http://localhost:5000/populations`, function(res) {
    let chunks = [];
    res.on('data', function(data) {
      chunks.push(data);
    }).on('end', function() {
      var data = Buffer.concat(chunks);
      var body = JSON.parse(data);
      assert.equal(Array.isArray(body), true);
      for (var i = 0; i < requiredAttributes.length; i += 1) {
        var attributeName = requiredAttributes[i];
        assert.equal(body[0].hasOwnProperty(attributeName), true);
      }
      done();
    });
  });
});
