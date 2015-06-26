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
    console.error('Uh oh!')
  }
}());
```

Curries, so it can be used as a method decorator:

```javascript
class MyClass {
  @timeoutAfter(5000)
  async getData() {
    let response = await fetch(...);
    return response.body;
  }
}
```
