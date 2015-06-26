
module.exports = function timeoutAfter(ms, fn) {
  function decorator(fn) {
    return function() {
      // Convert the arguments object to an array.
      for (var len = arguments.length, args = Array(len), i = 0; i < len; i++) {
        args[i] = arguments[i];
      }

      var timeoutId;

      function cleanup() {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      function wrapped() {
        return Promise.resolve(fn.apply(null, args))
          .then(
            function(result) { cleanup(); return result; },
            function(error) { cleanup(); throw error; }
          );
      }

      function timeout() {
        return new Promise(function(resolve, reject) {
          timeoutId = setTimeout(function() {
            if (timeoutId == null) return;
            reject(new Error('The function ' + fn.name + ' timed out after ' + ms + 'ms.'));
          }, ms);
        });
      }

      return Promise.race([wrapped(), timeout()]);
    };
  }

  if (fn) return decorator(fn);
  return decorator;
}
