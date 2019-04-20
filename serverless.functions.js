/* eslint-disable import/no-extraneous-dependencies */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { get, has, mapKeys, mapValues, merge, update } = require('lodash');

const { IS_OFFLINE, MODULE } = process.env;

const paths = {
  functions: path.join(__dirname, 'src', 'functions'),
};

const authorizers = {};

/**
 * Compose helper - runs a list of the provided functions across the provided arguments.
 *
 * @example
 * compose(console.log, console.error)('value to print');
 *
 * @param functions
 * @returns {function(*=): (*)}
 */
const compose = (...functions) => args => functions.reduceRight((arg, fn) => fn(arg), args);

/**
 * Runs lodash update function only if given object contains provided path. Otherwise returns
 * original object.
 *
 * @param object
 * @param key
 * @param cb
 * @returns {*}
 */
const updateIfHas = (object, key, cb) => (has(object, key) ? update(object, key, cb) : object);

/**
 * List of the fixes helpers functions that adjust functions events.
 *
 * `authorizer` provides http.authorizer complex information basing on the predefined keyword
 * `path`       updates the http.path in local environment - adds function name prefix in front
 *              of the API path - i.e. `POST /{id}` for `users` will become `POST /users/{id}`
 * `offline`    checks if http.offline is set - if so, it's removed during the deployment
 *
 * @type {{
 *  authorizer: (function(*=): *),
 *  path: (function(*=): function(*=): *),
 *  offline: (function(*): *)
 * }}
 */
const fixes = {
  authorizer: ev => updateIfHas(ev, 'http.authorizer', value => authorizers[value] || value),
  path: fn => ev => updateIfHas(ev, 'http.path', value => (IS_OFFLINE ? `${fn}${value}` : value)),
  offline: events => events.filter(ev => !get(ev, 'http.offline') || IS_OFFLINE),
};

/**
 * Function scans all available functions located in src/functions and searches for .functions.yml
 * files that contain endpoints definitions. Because we'll end up with 100+ endpoints, they are
 * split into smaller pieces that contain an array of single function definitions as described in
 * https://serverless.com/framework/docs/providers/aws/guide/functions
 *
 * `handler` and `name` keys are optional and generated automatically using the endpoint's key but
 * can be overwritten if needed.
 *
 * @returns {*}
 */
const loadFunctions = name => {
  const file = path.join(paths.functions, name, '.functions.yml');

  return fs.existsSync(file)
    ? mapKeys(
      mapValues(yaml.safeLoad(fs.readFileSync(file, 'utf8')), ({ events = [], ...fn }, key) => ({
        ...fn,
        name: ['interbus-api', name, key].join('-'),
        handler: path.join('src', 'functions', name, `${key}.default`),
        events: compose(fixes.offline)(events).map(
          compose(
            fixes.authorizer,
            fixes.path(name.toLowerCase()),
          ),
        ),
      })),
      fn => fn.name,
    )
    : {};
};

module.exports = merge(
  {},
  ...(MODULE ? [MODULE] : fs.readdirSync(paths.functions)).map(loadFunctions),
);
