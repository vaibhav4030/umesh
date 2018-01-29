var http = require('http');

module.exports = {
  getReturns200(routeName) {
    QUnit.test(`/${routeName} works`, function(assert) {
      assert.expect(1);
      var done = assert.async();

      http.get(`http://localhost:5000/${routeName}`, function(res) {
        assert.equal(200, res.statusCode);
        done();
      });
    });
  }
}
