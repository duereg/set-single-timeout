[![Build Status](https://travis-ci.org/duereg/too-wordy.svg?branch=master)](https://travis-ci.org/duereg/too-wordy)
[![NPM version](https://badge.fury.io/js/too-wordy.svg)](http://badge.fury.io/js/too-wordy)

# Word Complexity

// This pattern is used for preventing concurrent scheduling of a task when multiple events fire in a short interval.
// This effectively acts as a debounce for the task, except that the task will continue to delay as more requests come in.


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
  logger: console.log,  // if set, debug information is outut of loop progress
}

// Timeout key. Will
const singleTimeoutWithConfig = setSingleTimeout(config);
const singleTimeoutWithoutConfig = setSingleTimeout();

singleTimeoutWithConfig(() => timeoutWillFireWithLogging(), 5 * 60 * 1000);
singleTimeoutWithoutConfig(() => timeoutWillFireQuietly(), 5 * 60 * 1000);
```

## License

MIT
