QUnit.config.testTimeout = 300000;

var http = require('http');

QUnit.test('requesting 1 campaign should work', function(assert) {
  assert.expect(4);
  var done = assert.async();
  urlShouldRespondFilledCorrectly(`http://localhost:5000/coordinates?ids=campaign-2963`, assert, done);
});

QUnit.test('requesting 2 campaigns should work', function(assert) {
  assert.expect(4);
  var done = assert.async();
  urlShouldRespondFilledCorrectly(`http://localhost:5000/coordinates?ids=campaign-4411,campaign-5997`, assert, done);
});

QUnit.test('requesting 1 segment should work', function(assert) {
  assert.expect(4);
  var done = assert.async();
  urlShouldRespondFilledCorrectly(`http://localhost:5000/coordinates?ids=segment-52`, assert, done);
});

QUnit.test('requesting more than 1 segment will return an empty data array', function(assert) {
  assert.expect(2);
  var done = assert.async();
  urlShouldRespondEmptyArray(`http://localhost:5000/coordinates?ids=segment-123,segment-456`, assert, done);
});

QUnit.test('requesting more than 2 segments will return an empty data array', function(assert) {
  assert.expect(2);
  var done = assert.async();
  urlShouldRespondEmptyArray(`http://localhost:5000/coordinates?ids=segment-123,segment-456,segment-789`, assert, done);
});

QUnit.test('requesting 1 segment and 1 taxonomy should work', function(assert) {
  assert.expect(4);
  var done = assert.async();
  urlShouldRespondFilledCorrectly(`http://localhost:5000/coordinates?ids=segment-97,taxonomy-904000`, assert, done);
});

QUnit.test('requesting 1 segment and 2 taxonomies should work', function(assert) {
  assert.expect(4);
  var done = assert.async();
  urlShouldRespondFilledCorrectly(`http://localhost:5000/coordinates?ids=segment-97,taxonomy-904000,taxonomy-904001`, assert, done);
});

QUnit.test('requesting 1 segment and 1 taxonomy that do not belong should return empty array', function(assert) {
  assert.expect(2);
  var done = assert.async();
  urlShouldRespondEmptyArray(`http://localhost:5000/coordinates?ids=segment-100,taxonomy-904006`, assert, done);
});

QUnit.test('requesting 1 segment and 2 taxonomies that do not belong should return empty array', function(assert) {
  assert.expect(2);
  var done = assert.async();
  urlShouldRespondEmptyArray(`http://localhost:5000/coordinates?ids=segment-100,taxonomy-904006,taxonomy-904010`, assert, done);
});

QUnit.test('requesting 1 taxonomy should work', function(assert) {
  assert.expect(4);
  var done = assert.async();
  urlShouldRespondFilledCorrectly(`http://localhost:5000/coordinates?ids=taxonomy-904001`, assert, done);
});

QUnit.test('requesting 2 taxonomies should work', function(assert) {
  assert.expect(4);
  var done = assert.async();
  urlShouldRespondFilledCorrectly(`http://localhost:5000/coordinates?ids=taxonomy-904001,taxonomy-904005`, assert, done);
});

QUnit.test('requesting 2 taxonomies that have no intersect should return empty', function(assert) {
  assert.expect(2);
  var done = assert.async();
  urlShouldRespondEmptyArray(`http://localhost:5000/coordinates?ids=taxonomy-904000,taxonomy-904015`, assert, done);
});

QUnit.test('requesting 1 campaign and 1 segment should work', function(assert) {
  assert.expect(4);
  var done = assert.async();
  urlShouldRespondFilledCorrectly(`http://localhost:5000/coordinates?ids=campaign-4487,segment-14`, assert, done);
});

QUnit.test('requesting 1 campaign and 1 segment with no intersect should return empty', function(assert) {
  assert.expect(2);
  var done = assert.async();
  urlShouldRespondEmptyArray(`http://localhost:5000/coordinates?ids=campaign-8931,segment-58`, assert, done);
});

QUnit.test('requesting 1 campaign and 1 taxonomy should work', function(assert) {
  assert.expect(4);
  var done = assert.async();
  urlShouldRespondFilledCorrectly(`http://localhost:5000/coordinates?ids=campaign-4657,taxonomy-904005`, assert, done);
});

QUnit.test('requesting 1 campaign and 1 taxonomy with no intersect should return empty', function(assert) {
  assert.expect(2);
  var done = assert.async();
  urlShouldRespondEmptyArray(`http://localhost:5000/coordinates?ids=campaign-11940,segment-904000`, assert, done);
});

QUnit.test('requesting 1 campaign, 1 segment, and 1 taxonomy should work', function(assert) {
  assert.expect(4);
  var done = assert.async();
  urlShouldRespondFilledCorrectly(`http://localhost:5000/coordinates?ids=campaign-4055,segment-65,taxonomy-904030`, assert, done);
});

QUnit.test('requesting 1 campaign, 1 segment, and 1 taxonomy with no intersect should return empty', function(assert) {
  assert.expect(2);
  var done = assert.async();
  urlShouldRespondEmptyArray(`http://localhost:5000/coordinates?ids=campaign-9585,segment-52,taxonomy-904000`, assert, done);
});

QUnit.test('requesting 2 campaigns, 1 segment, and 1 taxonomy should work', function(assert) {
  assert.expect(4);
  var done = assert.async();
  urlShouldRespondFilledCorrectly(`http://localhost:5000/coordinates?ids=campaign-3999,campaign-3613,segment-117,taxonomy-904081`, assert, done);
});

QUnit.test('requesting 2 campaigns, 1 segment, and 1 taxonomy with no intersect should return empty', function(assert) {
  assert.expect(2);
  var done = assert.async();
  urlShouldRespondEmptyArray(`http://localhost:5000/coordinates?ids=campaign-10312,campaign-9299,segment-38,taxonomy-904050`, assert, done);
});

QUnit.test('requesting 2 campaigns, 1 segment, and 2 taxonomies should work', function(assert) {
  assert.expect(4);
  var done = assert.async();
  urlShouldRespondFilledCorrectly(`http://localhost:5000/coordinates?ids=campaign-5882,campaign-4490,segment-10,taxonomy-904091,taxonomy-904093`, assert, done);
});

QUnit.test('requesting 2 campaigns, 1 segment, and 2 taxonomies with no intersect should return empty', function(assert) {
  assert.expect(2);
  var done = assert.async();
  urlShouldRespondEmptyArray(`http://localhost:5000/coordinates?ids=campaign-8936,campaign-12936,segment-136,taxonomy-904091,taxonomy-904093`, assert, done);
});

function urlShouldRespondFilledCorrectly(url, assert, done) {
  http.get(url, function(res) {
    let chunks = [];
    res.on('data', function(data) {
      chunks.push(data);
    }).on('end', function() {
      var data = Buffer.concat(chunks);
      var body = JSON.parse(data);
      assert.equal(Array.isArray(body.data), true);
      assert.equal(body.data.length > 0, true, 'Array should be filled.');
      var datum = body.data[0];
      assert.equal(datum.hasOwnProperty('LAT'), true, 'each datum has required attribute');
      assert.equal(datum.hasOwnProperty('LONG'), true, 'each datum has required attribute');
      done();
    });
  });
}

function urlShouldRespondEmptyArray(url, assert, done) {
  http.get(url, function(res) {
    let chunks = [];
    res.on('data', function(data) {
      chunks.push(data);
    }).on('end', function() {
      var data = Buffer.concat(chunks);
      var body = JSON.parse(data);
      assert.equal(Array.isArray(body.data), true);
      assert.equal(body.data.length, 0, 'Array should be empty.');
      done();
    });
  });
}
