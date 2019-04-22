// import config from 'config';
// import moment from 'moment';
import shortid from 'shortid';
import errors from 'http-errors';
import { isEmpty } from 'lodash';

// const {
//   app: { dateFormat },
// } = config;

export { errors };
export const generateId = type => `${type}_${shortid.generate()}`;

/**
 * Creates a verifier that throws given error if condition is met.
 *
 * @example
 * const verifier = verifier({
 *   error = errors.NotFound,
 *   message = errors.NotFound.message,
 *   condition = item => !item,
 * })
 *
 * @param error
 * @param message
 * @param condition
 * @returns {function(*=): *}
 */
export const verifier = ({ error, message, condition }) => item => {
  if (condition(item)) {
    throw error(message);
  }
  return item;
};

/**
 * Common verifiers - checks initialized using {@link verifier}.
 *
 * @type {{presence: (function(*=): *), conflict: (function(*=): *)}}
 */
export const verify = {
  presence: verifier({
    error: errors.NotFound,
    message: errors.NotFound.message,
    condition: item => isEmpty(item),
  }),
  conflict: verifier({
    error: errors.Conflict,
    message: errors.Conflict.message,
    condition: item => item,
  }),
};
