/* eslint-disable max-len */
// This pattern is used for preventing concurrent scheduling of a task when multiple events fire in a short interval.
// This effectively acts as a debounce for the task, except that the task will continue to delay as more requests come in.
// Example usage:
// const sendWindowsSoftwareUpdateTimeout = setTimeoutThenClear('sendWindowsSoftwareUpdateReport');
// sendWindowsSoftwareUpdateTimeout(() => sendWindowsSoftwareUpdateReport(event), 5 * 60 * 1000);

function noop() {}

function getLogger(config) {
  if (!config) {
    return noop;
  }

  const { eventName, logger } = config;

  if (!logger) {
    return noop;
  }

  if (eventName) {
    return function innerLogger(arg) {
      logger(`[${eventName}] ${arg}`);
    };
  }

  return logger;
}

function setSingleTimeout(config) {
  let timeoutID = null;
  const logger = getLogger(config);

  logger('setSingleTimeout init');
  return function innerSetTimeoutThenClear(lambda, timeout) {
    if (timeoutID) {
      logger(`clear timeout for ID:${timeoutID}`);
      clearTimeout(timeoutID);
      timeoutID = null;
    }
    timeoutID = setTimeout(lambda, timeout);
    logger(`set ${timeout}ms timeout for ID:${timeoutID}`);
    return timeoutID;
  };
}

module.exports = setSingleTimeout;
