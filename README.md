Add a timeout to an existing function.

`timeout-after` uses the global `Promise` so you might have to polyfill for
node.


Installation
------------

`npm install timeout-after`


Usage
-----

Create a new function from an existing one:

```javascript
import timeoutAfter from 'timeout-after';

const fetchWithTimeout = timeoutAfter(5000, fetch);

// The new function will return a promise, which gets rejected if it takes too
// long.
(async function() {
  try {
    await fetchWithTimeout(...);
  } catch (err) {
    if (err.name === 'Timeout') console.error('Uh oh! Timed out!');
    throw err;
  }
}());
```

It curries too:

```javascript
import timeoutAfter from 'timeout-after';

const withTimeout = timeoutAfter(5000);
const fetchWithTimeout = withTimeout(fetch);
```
