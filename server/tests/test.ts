var assert = require('assert');

const helloWorld = () => {
  return "hello world";
}

describe('Test Hello World', function() {
  describe('#helloWorld', function() {
    it('should return "hello world"', function() {
      assert.equal(helloWorld(), "hello world");
    });
  });
});
