const sinon = require('sinon');
const setSingleTimeout = require('../index');

describe('set-single-timeout', () => {
  describe('no config', () => {
    let timeoutId, callback, timeouter;

    beforeEach((done) => {
      timeouter = setSingleTimeout();
      callback = () => {
        expect(true).toBe(true);
        done();
      };
      timeoutId = timeouter(callback, 0);
    });

    afterEach(() => {
      clearTimeout(timeoutId);
    });

    it('timeoutId is generated', () => {
      expect(timeoutId).not.toBe(undefined);
    });
  });

  describe('with empty config', () => {
    let timeoutId, callback, timeouter;

    beforeEach((done) => {
      timeouter = setSingleTimeout({});
      callback = () => {
        expect(true).toBe(true);
        done();
      };
      timeoutId = timeouter(callback, 0);
    });

    afterEach(() => {
      clearTimeout(timeoutId);
    });

    it('timeoutId is generated', () => {
      expect(timeoutId).not.toBe(undefined);
    });
  });

  describe('with eventName', () => {
    let timeoutId, callback, timeouter;

    beforeEach((done) => {
      timeouter = setSingleTimeout({ eventName: 'test' });
      callback = () => {
        expect(true).toBe(true);
        done();
      };
      timeoutId = timeouter(callback, 0);
    });

    afterEach(() => {
      clearTimeout(timeoutId);
    });

    it('timeoutId is generated', () => {
      expect(timeoutId).not.toBe(undefined);
    });
  });

  describe('with logger', () => {
    let timeoutId, callback, timeouter;

    beforeEach((done) => {
      timeouter = setSingleTimeout({ logger() {} });
      callback = () => {
        expect(true).toBe(true);
        done();
      };
      timeoutId = timeouter(callback, 0);
    });

    afterEach(() => {
      clearTimeout(timeoutId);
    });

    it('timeoutId is generated', () => {
      expect(timeoutId).not.toBe(undefined);
    });
  });

  describe('full config', () => {
    let timeoutId, callback, timeouter, logger;

    beforeEach((done) => {
      logger = sinon.stub();
      timeouter = setSingleTimeout({
        logger,
        eventName: 'test'
      });
      callback = () => {
        expect(true).toBe(true);
        done();
      };
      timeoutId = timeouter(callback, 0);
    });

    afterEach(() => {
      clearTimeout(timeoutId);
    });

    it('timeoutId is generated', () => {
      expect(timeoutId).not.toBe(undefined);
    });

    it('logger is called', () => {
      expect(logger.called).toBe(true);
    });

    it('logger is called with eventName', () => {
      expect(logger.calledWith('[test] setSingleTimeout init')).toBe(true);
    });
  });
});
