[![NPM version](https://badge.fury.io/js/set-single-timeout.svg)](http://badge.fury.io/js/set-single-timeout)

# set-single-timeout

This pattern is used for preventing concurrent scheduling of a task when multiple events fire in a short interval.
This effectively acts as a debounce for the task, except that the task will continue to delay as more requests come in.

## Why? Why not use `lodash.debouce` or something similar?

I looked at both [lodash](https://lodash.com/docs/4.17.15#debounce) debounce and other [setTimeout libraries](https://www.npmjs.com/search?q=setTimeout) that were available, and I couldn't find one that did exactly what I wanted. My use case is around having an idempotent instance of a setTimeout call, no matter how many instances of a particular object were held in memory by the application.

Example: You have five instances of the same object listening to the same event, and they all have a method wrapped in a debounce. If you fire that event multiple times, even if you debounce, you'll still get five event fires.

I was looking for something that would only fire once, even if it was used in multiple instances. Hence this little library.

## Will this solve the issue with [node leaking memory](https://lucumr.pocoo.org/2024/6/5/node-timeout/) on `setTimeout` usage?

Yes. This library effectively manages the memory of these tasks, and will wipe out the reference to the object when the timeout completes.
However, the more durable fix (converted the timeout object into a primative) only [just landed](https://github.com/nodejs/node/pull/53337), so this library will continue to manage the object state until that patch rolls out to the wider world.

## Install

```shell
npm install set-single-timeout
```

## Use

```javascript
const setSingleTimeout = require('set-single-timeout');

// config is optional.
const config = {
  eventName: 'sendWindowsSoftwareUpdateReport', // if set & logger is set, used in debugging
  logger: console.log,  // if set, debug information is output on progress
}

// Timeout key. Will
const singleTimeoutWithConfig = setSingleTimeout(config);
const singleTimeoutWithoutConfig = setSingleTimeout();

singleTimeoutWithConfig(() => timeoutWillFireWithLogging(), 5 * 60 * 1000);
singleTimeoutWithoutConfig(() => timeoutWillFireQuietly(), 5 * 60 * 1000);
```

## License

MIT
