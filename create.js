// module imports
const fs = require('fs');
const { series } = require('async');
const { exec } = require('child_process');

// get the service name from args
const args = process.argv.slice(2);

const capitalize = (s) => {
  if (typeof s !== 'string') throw new Error('name error');
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// writeFile function with filename, content and callback function
try {
  // create controller
  const controllerContent = `
/**
 * @param {function} ${args[0]}Service
 * @param {object} ${args[0]}Schema
 * @param {object} statusCodes
 * @param {object} logger
 * @return {function}
 */
export default function make${capitalize(args[0])}Controller(
  ${args[0]}Service,
  ${args[0]}Schema,
  statusCodes,
  logger,
) {
  /**
   * @param {object} req
   * @param {object} res
   * @return {object}
   */
  return async function ${args[0]}Controller(req, res) {
    // log end point execution
    logger.info()

    try {

    } catch (err) {

    }
  };
}`;

  // create service
  const serviceContent = `
/**
 * @param {object} logger
 * @return {function}
 */
export default function make${capitalize(args[0])}Service(logger) {
  /**
   * @param {object} example
   * @return {object}
   */
  return async function ${args[0]}Service() {
    try {

    } catch (err) {

    }
  };
}`;

  // create test
  const testContent = `
import sinon from 'sinon';
import { afterEach } from 'mocha';
import chai, { expect } from 'chai';
import make${capitalize(args[0])}Service from '../services/${args[0]}Service';
import ${args[0]}Response from '../responses/${args[0]}.response';

chai.expect();

// test #${args[0]}Service()
describe('#${args[0]}Service()', () => {
  afterEach(() => {
    // restore the default sandbox here
    sinon.restore();
  });

  it('should pass', async () => {

    // execute service

    // sinon - assert stubs expectation

    // chai - assert service expectation
  });
});`;

  // create response
  const responseContent = `
import statusCodes from 'http-status-codes';

/*
 * NOT_FOUND
 */

/*
 * INTERNAL_SERVER_ERROR
 */

const [SERVICE_NAME]_ERROR = {
  error: true,
  message: '[SERVICE_NAME]_ERROR',
  code: statusCodes.INTERNAL_SERVER_ERROR,
};

/*
 * OK
 */

const OK = {
  error: false,
  message: 'OK',
  code: statusCodes.OK,
};

export default Object.freeze({
  [SERVICE_NAME]_ERROR,
  OK,
});

export {
  [SERVICE_NAME]_ERROR,
  OK,
};`;

  series([
    (cb) => {
      // create controller
      fs.writeFile(
        `./src/controllers/${args[0]}.controller.js`,
        controllerContent,
        (err) => {
          if (err) throw err;
        },
      );
      cb();
    },
    (cb) => {
      // create service
      fs.writeFile(
        `./src/services/${args[0]}.service.js`,
        serviceContent,
        (err) => {
          if (err) throw err;
        },
      );
      cb();
    },
    (cb) => {
      // create test
      fs.writeFile(`./src/tests/${args[0]}.test.js`, testContent, (err) => {
        if (err) throw err;
      });
      cb();
    },
    (cb) => {
      // create response
      fs.writeFile(
        `./src/responses/${args[0]}.response.js`,
        responseContent,
        (err) => {
          if (err) throw err;
        },
      );
      cb();
    },
    () => exec('npm run pretty_write'),
  ]);
} catch (error) {
  console.log(error);
}
