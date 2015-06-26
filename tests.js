require('es6-promise').polyfill();
var timeoutAfter = require('./index');
var assert = require('assert');


function delay(ms) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, ms);
  });
}

function getTrue() {
  return delay(20).then(function() {
    return true;
  });
}

it('returns a rejected promise if the function takes too long', function() {
  return timeoutAfter(10, getTrue)()
    .then(assert.fail)
    .catch(function(err) { assert(/timed out after 10ms/.test(err.message)); });
});

it('returns a correctly resolved promise if the function completes in time', function() {
  return timeoutAfter(30, getTrue)()
    .then(function(result) { assert.strictEqual(result, true); })
    .catch(assert.fail);
});

it('works with synchronous functions', function() {
  return timeoutAfter(30, function() { return true; })()
    .then(function(result) { assert.strictEqual(result, true); })
    .catch(assert.fail);
});
